const Web3 = require('web3');

// Set up BSC Testnet endpoint
const bscTestnetEndpoint = 'https://data-seed-prebsc-1-s1.binance.org:8545';
const web3 = new Web3(new Web3.providers.HttpProvider(bscTestnetEndpoint));

// Replace the following with the actual contract address and ABI
const contractAddress = '0x0000000000000000000000000000000000000000';
const contractABI = [
  // Replace with the actual ABI
  {
    "constant": true,
    "inputs": [],
    "name": "totalSupply",
    "outputs": [{"name": "", "type": "uint256"}],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [{"name": "_to", "type": "address"}, {"name": "_amount", "type": "uint256"}],
    "name": "mint",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

// Set up the contract instance
const contract = new web3.eth.Contract(contractABI, contractAddress);

// Function to query total supply
async function getTotalSupply() {
  try {
    const totalSupply = await contract.methods.totalSupply().call();
    console.log('Total Supply:', totalSupply);
  } catch (error) {
    console.error('Error querying total supply:', error);
  }
}

// Function to mint tokens to a specific address
async function mintTokens(toAddress, amount) {
  try {
    const accounts = await web3.eth.getAccounts();
    const result = await contract.methods.mint(toAddress, amount).send({ from: accounts[0] });
    console.log('Minting successful. Transaction Hash:', result.transactionHash);
  } catch (error) {
    console.error('Error minting tokens:', error);
  }
}

// Example usage
getTotalSupply();
mintTokens('0xReceiverAddress', '1000'); // Replace '0xReceiverAddress' with the actual BSC address
