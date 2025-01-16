const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const xlsx = require("xlsx");
const fs = require("fs");

const app = express();
const PORT = 3000;


const fixtures = [
    { id: 1, home: "Team A", away: "Team B", date: "2025-01-20", score: "1-2" },
    { id: 2, home: "Team C", away: "Team D", date: "2025-01-22", score: "3-1" },
];


let registrations = [];


app.use(cors());  // Enable CORS for frontend-backend communication
app.use(bodyParser.json());  // To parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true }));  // To parse form data

// Routes

app.get("/", (req, res) => {
    res.send("Hello, Soccer Site!");
});

// API route to fetch fixtures
app.get("/api/fixtures", (req, res) => {
    res.json(fixtures);
});

// Registration endpoint
app.post("/api/register", (req, res) => {
    const { name, email, team, position } = req.body;

    if (!name || !email || !team || !position) {
        return res.status(400).json({ message: "All fields are required." });
    }

    // Save registration to the in-memory storage
    const registration = { name, email, team, position };
    registrations.push(registration);

    // Define the path for the Excel file
    const filePath = "registrations.xlsx";

    // Create or open the existing Excel workbook
    let workbook;
    if (fs.existsSync(filePath)) {
        workbook = xlsx.readFile(filePath);  // Read the existing file
    } else {
        workbook = xlsx.utils.book_new(); // Create a new workbook if file doesn't exist
    }

    // Convert the registrations array to a worksheet format
    const sheet = xlsx.utils.json_to_sheet(registrations);

    // Add the new sheet or update the existing sheet with the registration data
    xlsx.utils.book_append_sheet(workbook, sheet, "Registrations");

    // Write to Excel file
    xlsx.writeFile(workbook, filePath);

    // Respond with a success message
    res.status(201).json({ message: "Registration successful!", registration });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
