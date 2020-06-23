const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var {Employee} = require('../models/employee');

router.get('/', (req,res) => {
    Employee.find((err,docs) => {
            if (!err){ res.send(docs);}
            else{console.log('Error in Retriving Employees');}
    });
});

router.get('/:id', (req,res) => {
    if(!ObjectId.isValid(req.params.id)) return res.status(400).send('No record with given id');

    Employee.findById(req.params.id, (err,doc) => {
        if (!err) {res.send(doc);}
        else{console.log('Error in retrieving Employee');}
    });
});

router.put('/:id', (req,res) => {
    if(!ObjectId.isValid(req.params.id)) return res.status(400).send('No record with given id');

    var emp = {
        name: req.body.name,
        position: req.body.position,
        office: req.body.office,
        salary: req.body.salary,
    };

    Employee.findByIdAndUpdate(req.params.id, {$set: emp},{new:true}, (err,doc) => {
        if (!err) {res.send(doc);}
        else{console.log('Error in updatinging Employee');}
    });
});

router.delete('/:id', (req,res) => {
    if(!ObjectId.isValid(req.params.id)) return res.status(400).send('No record with given id');

    Employee.findByIdAndRemove(req.params.id,(err,doc) => {
        if (!err) {res.send(doc);}
        else{console.log('Error in deleting Employee');}
    });
});

router.post('/', (req, res) => {
    var emp = new Employee({
        name: req.body.name,
        position: req.body.position,
        office: req.body.office,
        salary: req.body.salary,
    });
    emp.save((err, doc) => {
        if (!err){res.send(doc);}
        else{console.log('Error in employee save');}
    });
});

module.exports = router;