# Client Lead Management System

## Overview

Client Lead Management System is a full-stack web application that helps businesses manage potential clients (leads) efficiently. The system allows users to add, update, track, search, filter, edit, and delete leads through a simple and user-friendly interface.

The project follows a client-server architecture:

* Frontend: React.js
* Backend: Node.js + Express.js
* Data Storage: JSON File Storage
* Deployment:

  * Frontend: Render Static Site
  * Backend: Render Web Service

---

## Features

### Lead Management

* Add new leads
* Edit existing lead details
* Delete leads
* View all leads

### Lead Tracking

Each lead contains:

* Name
* Email
* Status
* Notes
* Created Date

### Status Management

Users can update lead status to:

* New
* Contacted
* Interested
* Converted
* Not Interested

### Search and Filter

* Search leads by name
* Filter leads by status

### Notes Management

* Add notes for each lead
* Update notes anytime

### Analytics Dashboard

Displays:

* Total Leads
* Contacted Leads
* Interested Leads
* Converted Leads
* Not Interested Leads

### Export Functionality

* Export all lead data to CSV format

---

# Frontend Architecture

## Technology Stack

* React.js
* Axios
* CSS

## Responsibilities

The frontend is responsible for:

* Displaying lead information
* Sending API requests to the backend
* Managing user interactions
* Showing dashboard statistics
* Searching and filtering leads
* Exporting CSV reports

## Main Functionalities

### Fetch Leads

Retrieves all leads from the backend.

### Add Lead

Creates a new lead using a form.

### Edit Lead

Updates lead name and email.

### Delete Lead

Removes a lead from the system.

### Update Status

Changes lead status using a dropdown.

### Update Notes

Stores notes for each lead.

### Export CSV

Downloads all lead records as a CSV file.

---

# Backend Architecture

## Technology Stack

* Node.js
* Express.js
* CORS
* File System (fs)

## Responsibilities

The backend is responsible for:

* Handling API requests
* Managing lead data
* Updating lead status
* Updating notes
* Editing lead information
* Deleting leads
* Persisting data in a JSON file

## REST API Endpoints

### Get All Leads

GET /api/leads

Returns all leads.

### Add Lead

POST /api/leads

Creates a new lead.

### Update Status

PUT /api/leads/:id

Updates lead status.

### Update Notes

PUT /api/leads/:id/notes

Updates notes for a lead.

### Edit Lead

PUT /api/leads/:id/edit

Updates lead name and email.

### Delete Lead

DELETE /api/leads/:id

Deletes a lead.

---

# Project Structure

FUTURE_FS_02

├── client

│   ├── src

│   ├── public

│   ├── package.json

│

├── server

│   ├── server.js

│   ├── leads.json

│   ├── package.json

│

└── README.md

---

# Deployment

## Frontend

Hosted on Render Static Site.

## Backend

Hosted on Render Web Service.

---

# Installation

## Clone Repository

git clone https://github.com/Buntty2217/FUTURE_FS_02.git

## Frontend Setup

cd client

npm install

npm run dev

## Backend Setup

cd server

npm install

node server.js

---

# Future Improvements

* MongoDB Database Integration
* User Authentication
* Role-Based Access Control
* Lead Assignment System
* Follow-up Reminders
* Email Notifications
* Advanced Analytics Dashboard
* Cloud Database Deployment

---

# Learning Outcomes

This project demonstrates practical knowledge of:

* React.js
* Node.js
* Express.js
* REST APIs
* CRUD Operations
* State Management
* JSON Data Handling
* Git & GitHub
* Frontend Deployment
* Backend Deployment
* Full-Stack Application Development

---

# Author

Sravan Gorantla

B.Tech Student | Aspiring Data Engineer & Software Developer
