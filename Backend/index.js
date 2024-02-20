const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs').promises;

const dataFile = path.join(__dirname, 'data.json');

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// // Serve static files
app.use(express.static('public'));

// GET route to fetch poll data
app.get('/poll', async (req, res) => {
    try {
        // Read data from the JSON file
        let data = JSON.parse(await fs.readFile(dataFile, 'utf-8'));

        // Calculate the total number of votes
        const totalVotes = Object.values(data).reduce((total, n) => total += n, 0);

        // Calculate the percentage of votes for each option
        const pollData = Object.entries(data).map(([label, votes]) => ({
            label,
            percentage: (((100 * votes) / totalVotes) || 0).toFixed(0)
        
        }));
    
    
        // Send the poll data as a JSON response
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.json(pollData);
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Enable CORS
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Headers", 'Content-Type');
    next();
})



// POST route to submit a vote
app.post('/poll', async (req, res) => {
    try {
        // Read data from the JSON file
        const data = JSON.parse(await fs.readFile(dataFile, 'utf-8'));

        // Increment the vote count for the selected option
        data[req.body.add]++;

        // Write the updated data back to the JSON file
        await fs.writeFile(dataFile, JSON.stringify(data));
        // Send a success response
        res.end();
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
    // console.log(req.body)
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running...');
});

