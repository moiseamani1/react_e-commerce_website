import express from 'express';
import Product from '../Models/Product';
import { getToken,isAuth,isContentManager } from '../util'

const router = express.Router();

router.get(
  '/categories',async (req, res) => {
    const categories = await Product.find().distinct('category');
  
    res.send(categories);
   
  })
;
router.get(
  '/colors',async (req, res) => {
    const colors = await Product.find().distinct('color');
  
    res.send(colors);
    console.log("I am here"+colors)
    
  })
;

router.get(
  '/brands',async (req, res) => {
    const brands = await Product.find().distinct('brand');
  
    res.send(brands);
    console.log("I am here"+brands)
    
  })
;


router.get(
  '/featured',async (req, res) => {
    const featured = await Product.find({featured:true});
  
    res.send(featured);
  })
;




router.get(
    '/',
    async (req, res) => {
      const category = req.query.category ? { category: req.query.category } : {};
      const color = req.query.color ? { color: req.query.color } : {};
      const brand = req.query.brand ? { brand: req.query.brand } : {};
      const page = req.query.page?  req.query.page : 1;
      const limit=page*4

      const keyword = req.query.keyword
        ? {
            name: {
              $regex: req.query.keyword,
              $options: 'i',
            },
          }
        : {};

      let sortOrder={ _id: -1 };      
      if(req.query.order === 'lowest'){
          sortOrder={ price: 1 }
      }else if(req.query.order === 'highest'){
        sortOrder={ price: -1 }
      }

      const numProducts = await Product.find({
        ...category,
        ...color,
        ...brand,
        ...keyword,
        price :{$gt: req.query.min, $lte: req.query.max},      
      
      })
        .sort(sortOrder)
        .count();
      const products = await Product.find({
        ...category,
        ...color,
        ...brand,
        ...keyword,
        price :{$gt: req.query.min, $lte: req.query.max},      
      
      })
        .sort(sortOrder)
        .limit(limit);

        


      res.send({products,numProducts});

      
    })
  ;


  






router.get('/:id', async (req, res) => {
    const products = await Product.findOne({_id:req.params.id});
    if(products){
        res.send(products);
    }else{
        res.status(404).send({message:"Product not found"})
    }
    

})

router.put('/:id',isAuth,isContentManager, async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findOne({ _id: productId });
    if (product) {
        product.name = req.body.name
        product.price = req.body.price
        product.image = req.body.image
        product.brand = req.body.brand
        product.color= req.body.color
        product.category = req.body.category
        product.inventory = req.body.inventory
        product.description = req.body.description
        product.featured= req.body.featured
        
        const editedProduct = await product.save();
        if (editedProduct) {
            return res.status(200).send({ message: 'Product successfully edited.', data: editedProduct })
        }
        return res.status(500).send({ message: 'Error occured whilst editing product.' })
    }



})
router.delete("/:id",isAuth,isContentManager,async(req,res)=>{
    const deletedProduct=await Product.findById(req.params.id);
    if(deletedProduct){
        await deletedProduct.remove();
        res.send({message:'Product Deleted'})
    }else{
        res.send('Error occured whilst deleting.')
    }
    
})

router.post('/',isAuth,isContentManager, async (req, res) => {
    const product = new Product({
        name: req.body.name,
        price: req.body.price,
        image: req.body.image,
        brand: req.body.brand,
        color: req.body.color,
        category: req.body.category,
        inventory: req.body.inventory,
        description: req.body.description,
        rating: req.body.rating,
        numReviews: req.body.numReviews,
        featured: req.body.featured,
        
    });
    const newProduct = await product.save();
    if (newProduct) {
        return res.status(201).send({ message: 'New product successfully created.', data: newProduct })
    }
    return res.status(500).send({ message: 'Error occured whilst creating product.' })
})

export default router;