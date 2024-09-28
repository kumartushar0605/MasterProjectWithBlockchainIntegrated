// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

contract CollegeConnect {
    
    // Event to log the transaction
    event Transfer(address indexed from, address indexed to, uint256 amount);

    // Function to send Ether from msg.sender to a specified address
    function sendEther(address payable _to) external payable {
        require(msg.value > 0, "Send some Ether");

        // Transfer the Ether to the specified address
        _to.transfer(msg.value);

        // Emit the transfer event
        emit Transfer(msg.sender, _to, msg.value);
    }
}
