const router = require('express').Router();
const { getStakesByAddress, getAllDepositEvents } = require('../helpers/index');

router.get('/getStakesByAddress', async (req, res) => {
    try {
        const { user } = req.query;
        const result = await getStakesByAddress(user);
        if(result.length === 0) throw new Error({ error: "404: address not found" });
        res.status(200).json(result);
    } catch (error) {
        res.status(401).json(error);
        return error;
    }
});


router.get('/all', async (req, res) => {
    try {
        const result = await getAllDepositEvents();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json(error);
    }
})

module.exports = router;