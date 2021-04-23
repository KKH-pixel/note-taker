const http = require('http')
const express = require('express');
const path = require('path');
let data = require('./db/db.json');
const shortid = require('shortid');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// body parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// delivery of user side info
app.use(express.static('public'))

// Basic route that sends the user first to the AJAX Page
app.get('/', (req, res) => res.sendFile(path.join(__dirname, './public/index.html')));
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, './public/notes.html')));


app.get('/api/notes', (req, res) => res.json(data));
app.post('/api/notes', (req, res) => {
    console.log(req.body);
    console.log(shortid.generate());
    const note = {
        title: req.body.title,
        text: req.body.text,
        id: shortid.generate()
    } 
    data.push(note)
    fs.writeFile('./db/db.json', JSON.stringify(data), (err) => {
  err ? console.error(err) : console.log('Success!');
  res.json(data)
    });
});

// GET * should return the index.html file. place last
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));