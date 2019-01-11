const express = require("express");
const router = express.Router();

const db = require("../models");

router.get("/", (req, res) => {
  console.log("on the root path");
  db.Record.find()
    .then(Records => res.json(Records))
    .catch(err => res.send(err));
});

router.post("/", (req, res) => {
  console.log(req.body);
  db.Record.create(req.body)
    .then(newRecord => res.status(201).json(newRecord)) //status 201 something is created
    .catch(err => res.send(err));
});

router.put("/:recordId", (req, res) => {
  db.Record.findByIdAndUpdate(req.params.recordId, req.body, { new: true })
    .then(Record => res.json(Record))
    .catch(err => res.send(err));
});

router.put("/", (req, res) => {
  
  //the object has to be parsed into an array, for bulkwrite method to work properly
  const dataArray = [];
  Object.entries(req.body).forEach(([key, record]) => dataArray.push(record));
//   console.log(dataArray);
  db.Record.bulkWrite(
    dataArray.map(record => ({
      updateOne: {
        filter: { _id: record._id },
        update: { $set: { percentage: record.percentage } }
      }
    }))
  )
  .then(() =>  res.json({message: "bulk update successful"}))
  .catch(err => res.send(err));

});

router.delete("/:recordId", (req, res) => {
  // db.Record.remove({ _id: req.params.recordId })
  db.Record.findByIdAndRemove(req.params.recordId, req.body)
    .then(() => res.json({ message: "Record deleted" }))
    .catch(err => res.send(err));
});

module.exports = router;
