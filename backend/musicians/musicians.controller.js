const mongoose = require('mongoose')
const Musician = mongoose.model('Musician')

exports.findAll = (req, res) => {
    Musician.find({}, (err, results) => {
      if(err)
          return console.log(err)
      return res.send(results)
  })
}

exports.findById = (req, res) => {
  const id = req.params.id;
  Musician.findOne({'_id':id}, (err, result) => res.send(result))
}

exports.add = (req, res) => {
    Musician.create(req.body, (err, musician) => {
      if (err)
          return console.log(err)
      console.log(req.body)
      return res.send(musician)
    })
}

exports.update = (req, res) => {
  const id = req.params.id;
  const update = {
      "$set": req.body
  }

  // Musician.update({"_id":id}, update, (err, numberAffected) => {
  //     if (err)
  //       return console.log(err)
  //     console.log('Updated %d musicians', numberAffected)
  //     return res.send(numberAffected)
  // })
  //Below updates and returns the list
  Musician.findByIdAndUpdate(id, update, { "new": true}, (err, list) => {
      if (err)
          return console.log(err)
      return res.send(list)
  });
  //or
  // Musician.findOneAndUpdate({"_id": id}, update, { "new": true},  function(err, list) {
  //     if (err)
  //         return console.log(err)
  //     return res.send(list)
  // });
}
exports.delete = (req, res) => {
  const id = req.params.id;
  //collection.remove is deprecated. Use deleteOne, deleteMany, or bulkWrite instead.
  Musician.deleteOne({'_id':id}, (result) => res.send(result))
}

exports.import = (req, res) => {
  Musician.create(
    { "name": "Ben", "band": "DJ Code Red", "instrument": "Reason" },
    { "name": "Mike D.","band": "Kingston Kats", "instrument": "drums" },
    { "name": "Eric", "band": "Eric", "instrument": "piano" },
    { "name": "Paul", "band": "The Eyeliner", "instrument": "guitar" },
    (err) => {
    if (err)
        return console.log(err)
    return res.sendStatus(202)
  })
}
