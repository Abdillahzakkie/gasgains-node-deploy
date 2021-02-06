const express = require('express');
const cors = require('cors');
require('dotenv/config');

const connectDB = require('./DB/index');
const { connectWeb3 } = require('./web3');
const { saveDepositEvents } = require('./helpers/index');
const depositRouter = require('./routes/deposit.route');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/v1/deposit', depositRouter);

const port = process.env.PORT || 8080;

app.listen(port, async () => {
    console.log(`Server listening on port: ${port}`);
    await connectDB();
    await connectWeb3();

    setInterval(async () => {
        await saveDepositEvents();
    }, 150000);

})