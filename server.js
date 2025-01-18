const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const xlsx = require("xlsx");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());  // Enable CORS for frontend-backend communication
app.use(bodyParser.urlencoded({ extended: true }));  // Middleware to parse form data
app.use(bodyParser.json());  // Middleware to parse JSON data
app.use(express.static('public'));  // Serve static files (e.g., HTML, CSS)

// Route to handle form submission
app.post('/register', (req, res) => {
  const { managerName, numberOfPlayers, numberOfStaff, headCoachName, headCoachContact, terms } = req.body;

  // Log the form data to the console
  console.log('Manager Name:', managerName);
  console.log('Number of Players:', numberOfPlayers);
  console.log('Number of Technical Staff:', numberOfStaff);
  console.log('Head Coach Name:', headCoachName);
  console.log('Head Coach Contact:', headCoachContact);
  console.log('Terms Accepted:', terms);

  const filePath = './registrations.xlsx';
  let workbook;
  let worksheet;

  // Check if the file exists
  if (fs.existsSync(filePath)) {
    // Read the existing workbook
    workbook = xlsx.readFile(filePath);
    worksheet = workbook.Sheets['Registrations'];
    // Convert the worksheet to JSON
    const jsonData = xlsx.utils.sheet_to_json(worksheet, { header: 1 });
    // Append the new data
    jsonData.push([managerName, numberOfPlayers, numberOfStaff, headCoachName, headCoachContact, terms]);
    // Convert the JSON back to a worksheet
    worksheet = xlsx.utils.aoa_to_sheet(jsonData);
    // Update the existing worksheet
    workbook.Sheets['Registrations'] = worksheet;
  } else {
    // Create a new workbook and worksheet
    workbook = xlsx.utils.book_new();
    const worksheetData = [
      ['Manager Name', 'Number of Players', 'Number of Technical Staff', 'Head Coach Name', 'Head Coach Contact', 'Terms Accepted'],
      [managerName, numberOfPlayers, numberOfStaff, headCoachName, headCoachContact, terms]
    ];
    worksheet = xlsx.utils.aoa_to_sheet(worksheetData);
    // Append the worksheet to the workbook
    xlsx.utils.book_append_sheet(workbook, worksheet, 'Registrations');
  }

  // Write the workbook to a file
  xlsx.writeFile(workbook, filePath);

  // Send a response back to the client
  res.send('Registration successful!');
});

// Route to download the Excel file
app.get('/download', (req, res) => {
  const filePath = path.join(__dirname, 'registrations.xlsx');
  if (fs.existsSync(filePath)) {
    res.download(filePath, 'registrations.xlsx', (err) => {
      if (err) {
        console.error('Error downloading the file:', err);
        res.status(500).send('Error downloading the file');
      }
    });
  } else {
    res.status(404).send('File not found');
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
