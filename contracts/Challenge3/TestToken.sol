pragma solidity 0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/**
 * @title TestToken
 * @author Nikhil Bajaj
 * @notice ERC20 token to test integration between on-chain and off-chain
 */
contract TestToken is ERC20 {
    ///@param _name Name of the ERC20 token
    ///@param _symbol Symbol for the ERC20 token
    constructor(string memory _name, string memory _symbol) ERC20(_name, _symbol){}
}
