// Import sigUtil for signing data 
var sigUtil = require('eth-sig-util')

let address = "0xd7C9bab7b63304E793Ae6e508954AAe023df1735";
let privateKey = "";
let txParams = {
    "from": address,
    "gasLimit": web3.utils.toHex(210000),
    "to": contractAddress,
    "value": "0x0",
    "data": contract.methods.addRating(1, 5).encodeABI()
};

const signedTx = await web3.eth.accounts.signTransaction(txParams, `0x${privateKey}`);
const dataToSign = await biconomy.getUserMessageToSign(signedTx.rawTransaction);
const signature = sigUtil.signTypedMessage(new Buffer.from(privateKey, 'hex'), 
{data: dataToSign}, 'V3');

let rawTransaction = signedTx.rawTransaction;

let data = {
    signature: signature,
    rawTransaction: rawTransaction
};

// Use any one of the methods below to check for transaction confirmation
// USING PROMISE
let receipt = await web3.eth.sendSignedTransaction(data, (error, txHash)=>{
    if(error) {
        return console.error(error);
    }
    console.log(txHash);
});

/********* OR *********/

// Get the transaction Hash using the Event Emitter returned
web3.eth.sendSignedTransaction(data)
.on('transactionHash', (hash)=> {
    console.log(`Transaction hash is ${hash}`)
})
.once('confirmation', (confirmation, receipt)=> {
    console.log(`Transaction Confirmed.`);
    console.log(receipt);
});
