const https = require('https');
const { connectWeb3 } = require('../web3/index');
const Deposit = require('../models/deposit');


const getPastDepositEvents = async () => {
    try {
        const { GasGainToken, GasGainsDistribution, web3 } = await connectWeb3();
        const latestBlockNumber = await web3.eth.getBlockNumber();
        let result = await GasGainToken.getPastEvents("Deposit", { fromBlock: "0", toBlock: latestBlockNumber });
        result = await formatEvents(result);
        return result;
    } catch (error) {
        console.log(error);
        return error
    }
}

const formatEvents = async _data => {
    try {
        const { web3 } = await connectWeb3();
       const returnValues = _data.map(item => {
            const _values = item.returnValues;
            const blockNumber = item.blockNumber;
            return {
                depositor: _values.depositor,
                depositAmount: web3.utils.fromWei(_values.depositAmount, "ether"),
                timestamp: _values.timestamp,
                unlockTimestamp: _values.unlockTimestamp,
                blockNumber
            }
       })
        return returnValues;
    } catch (error) { console.log(error) }
}

const saveDepositEvents = async () => {
    try {
        console.log("testing");
        const _data = await getPastDepositEvents();
        const _depositData = await Deposit.find({});

        const _dataLength = _data.length;
        const _depositDataLength = _depositData.length;

        if(_dataLength > _depositDataLength) {
            for(let i = _depositDataLength; i < _dataLength; i++) {
                const { depositor, depositAmount, timestamp, unlockTimestamp, blockNumber } = _data[i];
                const result = await Deposit({
                    depositor,
                    depositAmount,
                    timestamp,
                    unlockTimestamp,
                    blockNumber
                });
                await result.save();
            }
        }
    } catch (error) {
        console.log(error);
        return error;
    }
}

const getStakesByAddress = async _address => {
    try {
        const result = await Deposit.find({ depositor: _address });
        return result;
    } catch (error) {
        console.log(error);
        return error;
    }
}


const getAllDepositEvents = async () => {
    try {
        const result = await Deposit.find({  });
        return result;
    } catch (error) {
        console.log(error);
        return error;
    }
}



module.exports = {
    getPastDepositEvents,
    saveDepositEvents,
    getStakesByAddress,
    getAllDepositEvents
}