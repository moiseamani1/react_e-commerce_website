
import express from 'express';
import Faq from '../Models/Faq';

const router = express.Router();


router.get(
    '/',
    async (req, res) => {

        const faqList = await Faq.find();
        res.send(faqList);
        console.log('I am at the faq'+faqList)

    });

export default router;