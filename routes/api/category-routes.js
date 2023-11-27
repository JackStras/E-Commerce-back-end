const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  Category.findAll({
    include: {
      model: Product,
      attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
    }
  })
    .then(data => {
      if(!data) {
        res.status(404).json({message: 'No categories'});
        return;
      }
      res.json(data)
    })
    .catch(error => {
      console.log(error)
      res.status(500).json(error)
    })
  // find all categories
  // be sure to include its associated Products
});

router.get('/:id', (req, res) => {
  Category.findOne({
    where: {
      id: req.params.id
    },
    include: {
      model: Product,
      attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
    }
  })
    .then(data => {
      if(!data) {
        res.status(404).json({message: 'No categories'});
        return;
      }
      res.json(data)
    })
    .catch(error => {
      console.log(error)
      res.status(500).json(error)
    })
  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post('/', (req, res) => {
  Category.create({
    category_name: req.body.category_name
  })
    .then(data => res.json(data))
    .catch(error => {
      console.log(error)
      res.status(500).json(error)
    })
  // create a new category
});

router.put('/:id', (req, res) => {
  Category.update(req.body, {
    where: {
      id: req.params.id
    }
  })
    .then(data => {
      if (!data) {
        res.status(404).json({message:'id does not match category'})
        return
      }
      res.json(data)
    })
    .catch(error => {
      console.log(error)
      res.status(500).json(error)
    })
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(data => {
      if (!data){
        res.status(404).json({message: 'id does not match category'});
        return;
      }
      res.json(data)
    })
    .catch(error => {
      console.log(error)
      res.status(500).json(error)
    })
  // delete a category by its `id` value
});

module.exports = router;
