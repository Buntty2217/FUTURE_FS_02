import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [leads, setLeads] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");


  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/leads");
      setLeads(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/leads", {
        name,
        email,
      });

      setName("");
      setEmail("");

      fetchLeads();
    } catch (error) {
      console.error(error);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`http://localhost:5000/api/leads/${id}`, {
        status,
      });

      fetchLeads();
    } catch (error) {
      console.error(error);
    }
  };

const deleteLead = async (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this lead?"
  );

  if (!confirmDelete) return;

  try {
    await axios.delete(
      `http://localhost:5000/api/leads/${id}`
    );

    fetchLeads();
  } catch (error) {
    console.error(error);
  }
};
  const totalLeads = leads.length;

const contactedLeads = leads.filter(
  (lead) => lead.status === "Contacted"
).length;

const interestedLeads = leads.filter(
  (lead) => lead.status === "Interested"
).length;

const convertedLeads = leads.filter(
  (lead) => lead.status === "Converted"
).length;

const notInterestedLeads = leads.filter(
  (lead) => lead.status === "Not Interested"
).length;

const getStatusClass = (status) => {
  switch (status) {
    case "New":
      return "status-new";
    case "Contacted":
      return "status-contacted";
    case "Interested":
      return "status-interested";
    case "Converted":
      return "status-converted";
    case "Not Interested":
      return "status-not-interested";
    default:
      return "";
  }
};

const exportToCSV = () => {
  const headers = [
    "ID",
    "Name",
    "Email",
    "Status",
    "Created Date",
  ];

  const rows = leads.map((lead) => [
    lead.id,
    lead.name,
    lead.email,
    lead.status,
    lead.createdAt,
  ]);

  const csvContent = [
    headers.join(","),
    ...rows.map((row) => row.join(",")),
  ].join("\n");

  const blob = new Blob([csvContent], {
    type: "text/csv",
  });

  const url = window.URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "leads.csv";
  a.click();

  window.URL.revokeObjectURL(url);
};


const updateNotes = async (id, notes) => {
  try {
    await axios.put(
      `http://localhost:5000/api/leads/${id}/notes`,
      { notes }
    );

    fetchLeads();
  } catch (error) {
    console.error(error);
  }
};

const editLead = async (lead) => {
  const newName = prompt(
    "Enter new name:",
    lead.name
  );

  const newEmail = prompt(
    "Enter new email:",
    lead.email
  );

  if (!newName || !newEmail) return;

  try {
    await axios.put(
      `http://localhost:5000/api/leads/${lead.id}/edit`,
      {
        name: newName,
        email: newEmail,
      }
    );

    fetchLeads();
  } catch (error) {
    console.error(error);
  }
};

  return (
    <div className="container">
      <h1>Client Lead Management System</h1>
        <div className="stats-container">
        <div className="card">
          <h3>Total Leads</h3>
          <p>{totalLeads}</p>
        </div>

        <div className="card">
          <h3>Contacted</h3>
          <p>{contactedLeads}</p>
        </div>

        <div className="card">
          <h3>Interested</h3>
          <p>{interestedLeads}</p>
        </div>

        <div className="card">
          <h3>Converted</h3>
          <p>{convertedLeads}</p>
        </div>
          <div className="card">
          <h3>Not Interested</h3>
          <p>{notInterestedLeads}</p>
        </div>
        </div>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button type="submit">Add Lead</button>
        <button  type="button" onClick={exportToCSV}>
                      Export CSV
        </button>

        
      </form>

      <br />

      <input
        type="text"
        placeholder="Search Lead..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All">All</option>
          <option value="New">New</option>
          <option value="Contacted">Contacted</option>
          <option value="Interested">Interested</option>
          <option value="Converted">Converted</option>
          <option value="Not Interested">Not Interested</option>
</select>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Created Date</th>
            <th>Notes</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {leads
            .filter((lead) =>
              lead.name
                .toLowerCase()
                .includes(search.toLowerCase())
            )
            .filter((lead) =>
            statusFilter === "All"
              ? true
              : lead.status === statusFilter
            )
            
            .map((lead) => (
              <tr key={lead.id}>
                <td>{lead.id}</td>
                <td>{lead.name}</td>
                <td>{lead.email}</td>
                <td>{lead.createdAt}</td>
                  <td>
                    <textarea
                        rows="2"
                        defaultValue={lead.notes || ""}
                        onBlur={(e) =>
                          updateNotes(
                            lead.id,
                            e.target.value
                          )
                        }
                        placeholder="Add notes..."  
                    />
                  </td>
                <td>
                <select
                  className={getStatusClass(lead.status)}
                  value={lead.status}
                  onChange={(e) =>
                    updateStatus(
                      lead.id,
                      e.target.value
                    )
                  }
                >
                  <option value="New">New</option>
                  <option value="Contacted">
                    Contacted
                  </option>
                  <option value="Interested">
                    Interested
                  </option>
                  <option value="Converted">
                    Converted
                  </option>
                  <option value="Not Interested">
                    Not Interested
                  </option>
                </select>
                </td> 

                <td>
                    <button
                      onClick={() => editLead(lead)}
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        deleteLead(lead.id)
                      }
                    >
                      Delete
                    </button>
                    </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;