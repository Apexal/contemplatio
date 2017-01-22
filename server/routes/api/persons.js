var express = require('express');
var router = express.Router();

/* GET all persons */
router.get('/', (req, res, next) => {
    req.db.Person.find().then((persons) => {
        res.json(persons);
    }).catch(next);;
});

/* GET one person */
router.get('/:id', (req, res, next) => {
    req.db.Person.findOne({ _id: req.params.id }).then((person) => {
        if (!person) return next(new Error("No person found!"));
        res.json(person);
    }).catch(next);
});

/* ADD person */
router.put('/new', (req, res, next) => {
    // Collect data
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const gender = req.body.gender;
    const title = req.body.title;
    const relation = req.body.relation;
    const description = req.body.description;
    const tags = [];

    if (!firstName || !lastName || !gender || !title || !relation)
        return next(new Error("Missing data!"));
    
    if (!firstName.length > 50 || !lastName.length > 50)
        return next(new Error("Name(s) is too long."));

    const newPerson = new req.db.Person({
        firstName: firstName,
        lastName: lastName,
        gender: gender,
        title: title,
        relation: relation,
        description: (!description ? "No description given." : description),
        tags: tags
    });

    newPerson.save((err) => {
        if (err) return next(err);
        console.log("Saving new person...");
        res.json(newPerson);
    });
});

/* DELETE person */
router.delete('/:id', (req, res, next) => {
    const personId = req.params.id;

    req.db.Person.findOne({ _id: personId }).remove().exec().then((status) => {
        if (status.n == 0) return next(new Error("No person found!"));

        res.json(status);
    }).catch(next);;
});

/* UPDATE person */
router.post('/:id', (req, res, next) => {
    const personId = req.params.id;
    const updated = req.body.updated;

    req.db.Person.findOneAndUpdate({ _id: personId }, updated).exec().then((person) => {
        if (!person) return next(new Error("No person found!"));
        res.json(person);
    }).catch(next);
});

module.exports = router;
