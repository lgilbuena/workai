const express = require('express');
const { exec } = require('child_process');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Use the CORS middleware
app.use(cors());

// Use the body-parser middleware to parse JSON request bodies
app.use(bodyParser.json());

app.post('/generate', (req, res) => {
  const { goalValue, freqVal, hrPerDay, intensity, wants, exerciseValue } = req.body;

  // You can log the received values
//   console.log('Received values:', req.body);

  // Run your Node.js script with the received values
  exec(`node submit.js ${goalValue} ${freqVal} ${hrPerDay} ${intensity} "${wants}" ${exerciseValue}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      res.status(500).send(`Error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`Stderr: ${stderr}`);
      res.status(500).send(`Stderr: ${stderr}`);
      return;
    }
    res.send(`${stdout}`);
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
