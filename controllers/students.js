const express = require('express');
const STUDENTS = express.Router();
const Student = require('../models/students')

// Index
STUDENTS.get('/', (req, res) => {
    Student.find({}, (err, foundStudents) => {
        if (err) {
            res.status(400).json({ error: err.message });
        }
        res.status(200).json(foundStudents)
    })
})

//curl -X POST -H "Content-Type: application/json" -d '{"firstName":"Margarita", "lastName": "Dallatorre"}' 'http://localhost:3003/students'


// Post
STUDENTS.post('/', (req, res) => {
    Student.create(req.body, (err, createdStudent) => {
        if (err) {
            res.status(400).json({ error: err.message });
        }
        res.status(200).send(createdStudent);
    });

})
// curl -X PUT -H "Content-Type: application/json" -d '{"firstName":"I updated this", "lastName": "dallatorre"}' 'http://localhost:3003/students/604fb91a6a38ddb24102a502'


// curl -X DELETE 'http://localhost:3003/students/604fbaa2f60d3cb2f955b5ce'
// Delete 
STUDENTS.delete('/:id', (req, res) => {
    Student.findByIdAndRemove(req.params.id, (err, deletedStudent) => {
        if (err) {
            res.status(400).json({ error: err.message });
        }

        res.status(200).json(deletedStudent);
    });
});

module.exports = STUDENTS