import express from 'express';
import Order from '../Models/Order.js';
import { isAuth, isContentManager } from '../util.js';


const router = express.Router();




router.get(
  '/',
  isAuth,
  isContentManager,async (req, res) => {
    const orders = await Order.find({});
    res.send(orders);
  }
);


router.delete("/:id",isAuth,isContentManager,async(req,res)=>{
  const deletedProduct=await Order.findById(req.params.id);
  if(deletedProduct){
      await deletedProduct.remove();
      res.status(200).send({message:'Order Deleted'})
  }else{
      res.status(500).send('Error occured whilst deleting.')
  }
  
})

router.put('/:id',isAuth,isContentManager, async (req, res) => {
  // const productId = req.params.id;
  // const product = await Product.findOne({ _id: productId });
  // if (product) {
  //     product.name = req.body.name
  //     product.price = req.body.price
  //     product.image = req.body.image
  //     product.brand = req.body.brand
  //     product.color= req.body.color
  //     product.category = req.body.category
  //     product.inventory = req.body.inventory
  //     product.description = req.body.description
  //     product.featured= req.body.featured
      
  //     const editedProduct = await product.save();
  //     if (editedProduct) {
  //         return res.status(200).send({ message: 'Product successfully edited.', data: editedProduct })
  //     }
  //     return res.status(500).send({ message: 'Error occured whilst editing product.' })
  //}
})











router.post(
  '/',
  isAuth,
  async (req, res) => {
    if (req.body.orderItems.length === 0) {
      res.status(400).send({ message: 'Cart is empty' });
    } else {

      
      const order = new Order({
        orderItems: req.body.orderItems,
        shippingAddress: req.body.shippingAddress,
        paymentMethod: req.body.paymentMethod,
        itemsPrice: req.body.itemsPrice,
        shippingPrice: req.body.shippingPrice,
        taxPrice: req.body.taxPrice,
        totalPrice: req.body.totalPrice,
        user: req.user._id,
      });
      const createdOrder = await order.save();
      res
        .status(201)
        .send({ message: 'New Order Created', order: createdOrder });
    }
  }
);

router.get(
  '/myOrders',
  isAuth,
  async (req, res) => {
    console.log(req.user)
    const orders = await Order.find({ user: req.user._id });
   
    res.send(orders);
  }
);


router.get(
  '/:id',
  isAuth,
  async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      res.send(order);
    } else {
      res.status(404).send({ message: 'Order Not Found' });
    }
  }
);


router.put(
  '/:id/pay',
  isAuth,
  async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.email_address,
      };
      const updatedOrder = await order.save();
      res.send({ message: 'Order Paid', order: updatedOrder });
    } else {
      res.status(404).send({ message: 'Order Not Found' });
    }
  }
);




export default router;