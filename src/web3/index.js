const Web3 = require('web3');
require('dotenv/config');
const { abi: gasGainTokenABI } = require('../abi/GasGainz');
const { abi: gasGainsDistributionABI } = require("../abi/GaasGainsDistribution");


const GasGainTokenAddress = '0xc58467b855401EF3FF8FdA9216F236e29f0d6277';
const GasGainsDistributionAddress = "0x0358531350B7e183080C9D713fc4475d835fC249";

let GasGainToken;
let GasGainsDistribution;

const connectWeb3 = async () => {
    const web3 = new Web3(`https://mainnet.infura.io/v3/${process.env.Api_Key}`);

    GasGainToken = new web3.eth.Contract(gasGainTokenABI, GasGainTokenAddress);
    GasGainsDistribution = new web3.eth.Contract(gasGainsDistributionABI, GasGainsDistributionAddress);
    return {
        web3,
        GasGainToken,
        GasGainsDistribution
    };
}

module.exports = {
    connectWeb3,
};