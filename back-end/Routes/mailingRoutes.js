import express from 'express';
import dotenv from 'dotenv';
import properties from '../properties';

const router = express.Router();


var nodemailer = require('nodemailer');
dotenv.config();
const email=properties.NODEMAILER_EMAIL;
const password=properties.NODEMAILER_PASSWORD;
// var cors = require('cors');


// var transport =nodemailer.createTransport({
//   service:'gmail',
//     host: "smtp.gmail.com", //replace with your email provider
//     secure: false,
//     auth: {
//       user: "", //replace with the email address
//       pass: "" //replace with the password
//     },
    
//     port: 587,
//   });

  // var transporter = nodemailer.createTransport(transport)
  //Less secure app access google 
  var transporter=nodemailer.createTransport("smtps://"+email+":"+password+"@smtp.gmail.com/?pool=false")

  transporter.verify(function(error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log("Server is ready to take our messages");
    }
  });
 

  router.post('/send', (req, res, next) => {
    var name = req.body.name
    var email = req.body.email
    // var subject = req.body.subject
    var phone = req.body.phone
    var orderId = req.body.orderId
    var message = req.body.message
    var content = ` name: ${name} \n email: ${email} \n phone: ${phone} \n orderId: ${orderId} \n message: ${message} `
    var mail = {
      from: name,
      to: 'moise.amani@gmail.com',
      subject: 'Pupson bay enquiry',
      text: content
    }
    transporter.sendMail(mail, (err, data) => {
      if (err) {
        res.json({
          status: 'fail'
        })
      } else {
        res.json({
         status: 'success'
        })
      }
    })
  })

  export default router;