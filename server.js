const express = require('express');
const path = require('path'); 
const fs = require('fs');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

// GET Route for homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET Route for notes page
app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// GET Route for notes api
app.get('/api/notes', (req, res) =>
    fs.readFile('./db/db.json', (err, data) => {
        res.json(JSON.parse(data));
    })
);

// POST Route for notes api
app.post('/api/notes', (req, res) => {
    const {title, text} = req.body;

    const newNote = {
        title, 
        text
    };

    fs.readFile('./db/db.json', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            const parsedData = JSON.parse(data);
            parsedData.push(newNote);
            fs.writeFile('./db/db.json', JSON.stringify(parsedData, null, 4), (err) => {
                if (err) {
                    console.error(err);
                } else {
                    res.json(parsedData);
                }
            });
        }
    })
});

// GET 

// GET Route for wildcard calls
app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);