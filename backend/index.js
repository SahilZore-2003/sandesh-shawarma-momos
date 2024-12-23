import connectToMongo from './database/db.js';
import express from 'express';
import cors from 'cors';
import payment from './routes/payment.js'
import sms from './routes/sms.js'


connectToMongo();
const app = express()
const port = process.env.PORT || 4000

// middleware
app.use(express.json());
app.use(cors());
app.use('/api/payment', payment);
app.use('/api/sms', sms);







app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})