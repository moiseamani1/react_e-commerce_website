import dotenv from 'dotenv';

dotenv.config();
export default{

    MONGODB_URL:process.env.MONGODB_URL,
    JWT_SECRET:process.env.JWT_SECRET ,
    GOOGLE_API_KEY:process.env.GOOGLE_API_KEY,
    NODEMAILER_EMAIL:process.env.NODEMAILER_EMAIL,
    NODEMAILER_PASSWORD:process.env.NODEMAILER_PASSWORD,

    PAYPAL_CLIENT_ID:process.env.PAYPAL_CLIENT_ID,

    API_KEY:process.env.API_KEY,
    AUTH_DOMAIN:process.env.AUTH_DOMAIN,
    DATABASE_URL:process.env.DATABASE_URL,
    PROJECT_ID:process.env.PROJECT_ID,
    STORAGE_BUCKET:process.env.STORAGE_BUCKET,
    MESSAGING_SENDER_ID:process.env.MESSAGING_SENDER_ID,
    APP_ID:process.env.APP_ID,
    MEASUREMENT_ID:process.env.MEASUREMENT_ID
}