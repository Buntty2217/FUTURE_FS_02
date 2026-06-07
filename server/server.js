
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();

app.use(cors());
app.use(express.json());

// Home Route
app.get("/", (req, res) => {
  res.send("CRM Backend Running");
});

// Temporary Lead Storage
let leads = [];

try {
  const data = fs.readFileSync(
    "leads.json",
    "utf8"
  );

  leads = JSON.parse(data);
} catch (error) {
  leads = [];
}

// Add New Lead
app.post("/api/leads", (req, res) => {
  const newLead = {
    id: Date.now(),
    ...req.body,
    status: "New",
    notes: "",
    createdAt: new Date().toLocaleDateString(),
  };

  leads.push(newLead);
  fs.writeFileSync(
  "leads.json",
  JSON.stringify(leads, null, 2)
);

  console.log("New Lead Added:", newLead);

  res.status(201).json({
    message: "Lead added successfully",
    data: newLead,
  });
});

// Get All Leads
app.get("/api/leads", (req, res) => {
  res.json(leads);
});

// Delete Lead
app.delete("/api/leads/:id", (req, res) => {
  const id = Number(req.params.id);

  leads = leads.filter((lead) => lead.id !== id);
  fs.writeFileSync(
  "leads.json",
  JSON.stringify(leads, null, 2)
);


  res.json({
    message: "Lead deleted successfully",
  });
});

// Update Lead Status
app.put("/api/leads/:id", (req, res) => {
  const id = Number(req.params.id);

  const lead = leads.find((lead) => lead.id === id);

  if (!lead) {
    return res.status(404).json({
      message: "Lead not found",
    });
  }

  lead.status = req.body.status;

  fs.writeFileSync(
  "leads.json",
  JSON.stringify(leads, null, 2)
);

  res.json({
    message: "Lead status updated",
    data: lead,
  });
});

// Update Lead Notes
app.put("/api/leads/:id/notes", (req, res) => {
  const id = Number(req.params.id);

  const lead = leads.find((lead) => lead.id === id);

  if (!lead) {
    return res.status(404).json({
      message: "Lead not found",
    });
  }

  lead.notes = req.body.notes;

  fs.writeFileSync(
  "leads.json",
  JSON.stringify(leads, null, 2)
);

  res.json({
    message: "Notes updated",
    data: lead,
  });
});

const PORT = process.env.PORT || 5000;
// Edit Lead
app.put("/api/leads/:id/edit", (req, res) => {
  const id = Number(req.params.id);

  const lead = leads.find((lead) => lead.id === id);

  if (!lead) {
    return res.status(404).json({
      message: "Lead not found",
    });
  }

  lead.name = req.body.name;
  lead.email = req.body.email;

  fs.writeFileSync(
    "leads.json",
    JSON.stringify(leads, null, 2)
  );

  res.json({
    message: "Lead updated successfully",
    data: lead,
  });
});


app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});