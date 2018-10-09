const express = require('express');

const db = require('./bearsModel.js');

const router = express.Router();

router.get('/', (req, res) => {
  db.find()
    .then(bears => {
      res.status(200).json(bears);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  db.findById(id)
    .then(bear => {
      if (bear) {
        res.status(200).json(bear);
      } else {
        res.status(404).json({ error: `No bear by that ID.` });
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
  const bear = req.body;
  db.add(bear)
    .then(ids => {
      if (ids > 0) {
        res.status(201).json(ids);
      } else {
        res
          .status(404)
          .json({ error: `Name is required, and must by unique.` });
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const bear = req.body;

  db.update(id, bear)
    .then(count => {
      if (count > 0) {
        res.status(200).json(count);
      } else {
        res.status(404).json({ error: `No bear with that ID.` });
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  db.remove(id)
    .then(count => {
      if (count) {
        res.status(201).json(count);
      } else {
        res.status(404).json({ error: `No bear with supplied ID.` });
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;
