require("dotenv").config();
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

mongoose.connect(process.env["MONGO_URI"], {
  useNewUrlParser: true,
});

const personSchema = new Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String],
});

let Person = mongoose.model("Person", personSchema);

const createAndSavePerson = (done) => {
  var aviGlazer = new Person({
    name: "Avi Glazer",
    age: 84,
    favoriteFoods: ["steak", "salmon", "milk"],
  });

  aviGlazer.save((err, data) => {
    if (err) return console.error(err);
    done(null, data);
  });
};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, function (err, data) {
    if (err) return handleError(err);
    console.log(data);
    done(null, data);
  });
};

const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, function (err, data) {
    if (err) return handleError(err);
    console.log(data);
    done(null, data);
  });
};

const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, function (err, data) {
    if (err) return handleError(err);
    console.log(data);
    done(null, data);
  });
};

const findPersonById = (personId, done) => {
  Person.findById(personId, function (err, data) {
    if (err) return handleError(err);
    console.log(data);
    done(null, data);
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "Burgers";
  Person.findById(personId, function (err, data) {
    if (err) return handleError(err);
    data.favoriteFoods.push(foodToAdd);
    data.save((err, data) => {
      if (err) return console.error(err);
      done(null, data);
    })
  });

};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  Person.findOneAndUpdate({ name: personName },{$set:{age:ageToSet}} ,{ new: true}, (err, data)=> {
    if (err) return console.log(err);
    done(null, data);
  });

};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId,(err, data)=> {
    if (err) return console.log(err);
    done(null, data);
  });
};

const removeManyPeople = (done) => {
  const nameToRemove = "Avi";

  Person.remove({name: nameToRemove},(err, data)=> {
    if (err) return console.log(err);
    done(null, data);
  });

};

const queryChain = (done) => {
  const foodToSearch = "Burgers";

  Person.find({favoriteFoods: foodToSearch})
  .sort({ name: 'asc'})
  .limit(2)
  .select(['name','favoriteFoods'])
  .exec((err, data)=> {
    if (err) return console.log(err);
    done(null, data);
  });

};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
