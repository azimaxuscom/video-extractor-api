const express = require('express');
const cors = require('cors');
const extractRoute = require('./routes/extract');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Main Extraction Route
app.use('/api/extract', extractRoute);

app.get('/', (req, res) => {
    res.send({ message: 'Video Extractor Engine API is running.' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
