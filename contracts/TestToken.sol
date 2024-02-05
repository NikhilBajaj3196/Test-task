//SPDX-License-Identifier: UNLICENSED
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
    ///@param _value Intial minted tokens to msg.sender
    constructor(string memory _name, string memory _symbol, uint256 _value) ERC20(_name, _symbol) {
        _mint(msg.sender, _value);
    }

    function mint(address _address, uint256 _value) external {
        _mint(_address, _value);
    }
}
