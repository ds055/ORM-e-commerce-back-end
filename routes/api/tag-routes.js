const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// gets all tags with associated products
router.get('/', async (req, res) => {
  try {
    const allTags = await Tag.findAll(
      {
        // adds product data through the ProductTag model
        include: [{model: Product, through: ProductTag}]
      }
    );
    
    // Send data to user
    res.status(200).json(allTags);
  } catch (err) {
      res.status(500).json(err);
    }
});

// uses tag id to send requested tag and related products to user
router.get('/:id', async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      // adds product data through the ProductTag model
      include: [{model: Product, through: ProductTag}]
    });

    // if no tag exists for that id, respond with error message
    if (!tagData) {
      res.status(404).json({ message: 'No tag with that id exists.'})
      return;
    }
    // send data to user
    res.status(200).json(tagData);
  } catch (err) {
      res.status(500).json(err);
    }
});

// creates a new tag
router.post('/', async (req, res) => {
  try{
    // create new tag from request body
    const newTag = await Tag.create(req.body);
    // send new tag back to the user
    res.status(200).json(newTag);
  } catch (err) {
    // send error data back to user if add fails
    res.status(500).json(err)
  }
});

router.put('/:id', async (req, res) => {
  try{
    // update a tag's name by its `id` value
    const updatedTag = await Tag.update(req.body, {
      where: {
        id: req.params.id
      }
    });
    
    // if no updated tag exists for that id, respond with error message.
    if (!updatedTag) {
      res.status(404).json({ message: 'No tag with that id exists.'})
      return;
    }

    // if successful, send updated tag back to user 
    res.status(200).json(updatedTag);
  } catch (err) {
    res.status(500).json(err)
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try{
    const idDeleted = await Tag.destroy({
      where: {
        id: req.params.id
      }
    })

  // if no updated tag exists for that id, respond with error message.
  if (!idDeleted) {
    res.status(404).json({ message: 'No tag with that id exists.'})
    return;
  }

  // if tag exists, inform user of successful deletion
  res.status(200).json({ message: 'Tag successfully deleted!' })

  } catch (err) {
    res.status(500).json(err)
  }
});

module.exports = router;
