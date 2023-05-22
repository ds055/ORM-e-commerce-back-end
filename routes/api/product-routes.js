const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// get all products along with cateogries and tags, send back to requester
router.get('/', async (req, res) => {
  try {
    const allProducts = await Product.findAll(
      {
        // adds category data and tag data through the ProductTag model
        include: [{model: Category}, {model: Tag, through: ProductTag}]
      }
    );
    
    res.status(200).json(allProducts);
  } catch (err) {
      res.status(500).json(err);
    }
});

// get one product based on ID, including Category and Tag data, send back to requester
router.get('/:id', async (req, res) => {
  try {
    const productData = await Product.findByPk(req.params.id, {
      include: [{model: Category}, {model: Tag, through: ProductTag}]
    });

    // if no tag exists for that id, respond with error message
    if (!productData) {
      res.status(404).json({ message: 'No product with that id exists.'})
      return;
    }

    res.status(200).json(productData);
  } catch (err) {
      res.status(500).json(err);
    }
});

// create new product
router.post('/', (req, res) => {
  /* req.body should look like this...
    {
      product_name: "Basketball",
      price: 200.00,
      stock: 3,
      tagIds: [1, 2, 3, 4]
    }
  */
  Product.create(req.body)
    .then((product) => {
      // if there's product tags, we need to create pairings to bulk create in the ProductTag model
      if (req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr);
      }
      // if no product tags, just respond
      res.status(200).json(product);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// update product
router.put('/:id', (req, res) => {
  // update product data
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      // find all associated tags from ProductTag
      return ProductTag.findAll({ where: { product_id: req.params.id } });
    })
    .then((productTags) => {
      // get list of current tag_ids
      const productTagIds = productTags.map(({ tag_id }) => tag_id);
      // create filtered list of new tag_ids
      const newProductTags = req.body.tagIds
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            product_id: req.params.id,
            tag_id,
          };
        });
      // figure out which ones to remove
      const productTagsToRemove = productTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);

      // run both actions
      return Promise.all([
        ProductTag.destroy({ where: { id: productTagsToRemove } }),
        ProductTag.bulkCreate(newProductTags),
      ]);
    })
    .then((updatedProductTags) => res.json(updatedProductTags))
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err);
    });
});

// Deletes product with given id placed in url param, responds with message indicating success or failure
router.delete('/:id', async (req, res) => {
  try {



    const productdata = await Product.destroy({
      where: {
        id: req.params.id
      }
    });

    // If no product exists, inform user
    if (!productdata) {
      res.status(404).json({ message: 'No product found for this id.' });
      return;
    }

    // If product exists, respond that the product has been deleted
    res.status(200).json({ message: 'This product has been removed.' });
  } catch (err) {
    res.status(500).json(err)
  }
});

module.exports = router;
