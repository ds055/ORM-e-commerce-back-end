const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// get all categories with associated products
router.get('/', async (req, res) => {
  try {
    const allCategories = await Category.findAll(
      {
        include: [{model: Product}]
      }
    );
    // Send categories back to user
    res.status(200).json(allCategories);
  } catch (err) {
    // Inform user of error
      res.status(500).json(err);
  }
});

// get category by id value--includes associated products
router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      // adds product info to response
      include: [{model: Product}]
    });

    // if no category exists for that id, respond with error message
    if (!categoryData) {
      res.status(404).json({ message: 'No tag with that id exists.'})
      return;
    }

    // send data back to user
    res.status(200).json(categoryData);
  } catch (err) {
      // inform user of error
      res.status(500).json(err);
  }
});

// Creates a new category from JSON sent by user
router.post('/', async (req, res) => {
  try {
    const newCategory = await Category.create(req.body);
    // if success, send new category data back to user
    res.status(200).json(newCategory);
  } catch (err) {
    // send error data back to user if add fails
    res.status(500).json(err);
  }
});

// Update category name based on id number
router.put('/:id', async (req, res) => {
  try {
    // writes over old category with new one where ids match
    const updatedCategory = await Category.update(req.body, {
      where: {
        id: req.params.id
      }
    });

    // if successful, returns 1; if not, returns 0
    res.status(200).json(updatedCategory);
  } catch (err) {
    // inform user of failure
    res.status(500).json(err);
  }
});

// deletes category based on id passed in url
router.delete('/:id', async (req, res) => {
  try {

    await Product.update(
      {category_id: null},
      {where: {
        category_id: req.params.id
      }}
    );

    const categoryDeleted = await Category.destroy({
      where: {
        id: req.params.id
      }
    });

    // if no category exists for that id, respond with error message
    if (!categoryDeleted) {
      res.status(404).json({ message: 'No category with that id exists.'})
      return;
    }

    // if category exists, inform user of its deletion
    res.status(200).json({ message: 'Category successfully deleted!'});
  } catch (err) {
    // inform user of error
    res.status(500).json(err);
  }
});

module.exports = router;
