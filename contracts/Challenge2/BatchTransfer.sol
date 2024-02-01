// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title BatchTransfer
 * @author Nikhil Bajaj
 * @notice BatchTransfer of token into several accounts
 */
contract BatchTransfer is Ownable {

    ///@notice Address of the token to be transferred
    IERC20 public token;

    ///@notice Emits on batchTransfer success
    event BatchTransferSuccess(address[] _to, uint256[] _amounts);

    ///@notice NotAuthorized Thrown when msg.sender is not an owner
    error NotAuthorized();

    ///@notice When invalid to(addresses) or amounts are passeda sargs
    error InvalidArguments();

    ///@param _token Address of the token to be transferred
    constructor(address _token) Ownable(msg.sender){
        token = IERC20(_token);
    }

    ///@notice Transfer token to addresses
    ///@param _to Array of addresses to receive token
    ///@param _amounts Array of amount of token to transfer
    ///custom:events BatchTransferSuccess emits on batchTransfer success 
    function transferBatch(address[] calldata _to, uint256[] calldata _amounts) external onlyOwner {
        if(_to.length != _amounts.length) {
            revert InvalidArguments();
        }

        for (uint256 i = 0; i < _to.length; i++) {
            token.transfer(_to[i], _amounts[i]);
        }

        emit BatchTransferSuccess(_to, _amounts);
    }
}
