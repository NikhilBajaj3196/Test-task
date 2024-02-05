const {Web3}  = require('web3');

// ERC20 token contract ABI
const contractABI = require("./TokenABI.json");

// Set up BSC Testnet endpoint
const bscTestnetEndpoint = 'https://data-seed-prebsc-1-s1.binance.org:8545';
const web3 = new Web3(new Web3.providers.HttpProvider(bscTestnetEndpoint));

// Contract deployed at bsc testnet
const contractAddress = '0x9592C6C52A0db42374493869BFeE56DCe2893179';

// Set up the contract instance
const token = new web3.eth.Contract(contractABI, contractAddress);

// Function to query total supply
async function getTotalSupply() {
  try {
    const totalSupply = await token.methods.totalSupply().call();
    console.log('Total Supply:', totalSupply);
  } catch (error) {
    console.error('Error querying total supply:', error);
  }
}

// Function to mint tokens to a specific address
async function mintTokens(toAddress, amount) {
  try {
    const accounts = await web3.eth.getAccounts();
    const result = await token.methods.mint(toAddress, amount).send({ from: accounts[0] });
    console.log('Minting successful. Transaction Hash:', result.transactionHash);
  } catch (error) {
    console.error('Error minting tokens:', error);
  }
}

// Example usage
getTotalSupply();
mintTokens('0xReceiverAddress', '1000'); // Replace '0xReceiverAddress' with the actual BSC testnet address
