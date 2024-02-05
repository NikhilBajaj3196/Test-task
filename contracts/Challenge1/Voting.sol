//SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.20;

/**
 * @title Voting
 * @author Nikhil Bajaj
 * @notice Propose items for voting, and determine the ultimate winner when the voting concludes
 */
contract Voting {

    struct Item {
        string name;
        uint256 votes;
    }

    ///@notice Default voting period for which voting would be open
    uint256 immutable public DEFAULT_VOTING_PERIOD;

    ///@notice Mapping of items' id to Item struct
    mapping(uint256 => Item) public items;

    ///@notice Number of items appeared for voting
    uint256 public itemCount;

    ///@notice Mapping for voted users
    mapping(address => bool) public hasVoted;

    ///@notice Emitted when new item is proposed for voting
    event ItemProposed(uint256 indexed itemId, string itemName);

    uint256 public votingStartedAt;

    ///@notice Emitted when user votes for an item
    event Voted(uint256 indexed itemId);

    /// @notice Thrown when user votes for invalid item
    error InvalidItemID();

    /// @notice Thrown when user already voted for an item
    error AlreadyVoted();

    /// @notice Thrown when 0 items are proposed
    error VotingIsLive();

    /// @notice Thrown when voting period is invalid
    error InvalidVotingPeriod();

    /// @notice Thrown when voting is not active
    error VotingPeriodIsOver();

    ///@notice Thrown when no voting is going on
    error NoVotingIsLive();

    ///@param votingPeriod Voting period for which voting would be open
    ///@custom:error InvalidItemID Thrown voting period is invalid
    constructor(uint256 votingPeriod) {
        if(votingPeriod <= 0) {
            revert InvalidVotingPeriod();
        }
        DEFAULT_VOTING_PERIOD = votingPeriod;
    }

    ///@notice Propose item for voting
    ///@param _item Item to propose
    ///@custom:events ItemProposed emitted when item is proposed
    function proposeItem(string memory _item) external {
        if(itemCount == 0) {
            votingStartedAt = block.number;
        }

        _isVotingLive();

        itemCount++;
        items[itemCount] = Item(_item, 0);
        emit ItemProposed(itemCount, _item);
    }

    ///@notice Vote to listed item
    ///@param _itemId Id of item
    ///@custom:events Voted emitted when user votes item
    ///@custom:error InvalidItemID Thrown when user votes for invalid item
    ///@custom:error AlreadyVoted Thrown when user already voted for an item
    function voteForItem(uint256 _itemId) external {
        _isVotingLive();
        if(_itemId < 0 && _itemId <= itemCount) {
            revert InvalidItemID();
        }

        if(hasVoted[msg.sender]) {
            revert AlreadyVoted();
        }

        items[_itemId].votes++;
        hasVoted[msg.sender] = true;

        emit Voted(_itemId);
    }

    ///@notice Get the ultimate winner when the voting concludes
    ///@return itemId Id of the item
    ///@return itemName Item name
    ///@custom:error NoItemsProposed Thrown when 0 items are proposed
    function getWinner() external view returns (uint256 itemId, string memory itemName) {
        uint256 blocksPassed = block.number - votingStartedAt;

        if(votingStartedAt == 0) {
            revert NoVotingIsLive();
        }
        
        if(votingStartedAt > 0 && blocksPassed < DEFAULT_VOTING_PERIOD) {
            revert VotingIsLive();
        }

        uint256 maxVotes;
        for (uint256 i = 1; i <= itemCount; i++) {
            if (items[i].votes > maxVotes) {
                maxVotes = items[i].votes;
                itemId = i;
                itemName = items[i].name;
            }
        }
    }

    ///@notice Check for any ongoing voting
    ///@custom:error VotingPeriodIsOver No voting is going on
    function _isVotingLive() internal view {
        uint256 blocksPassed = block.number - votingStartedAt;

        if(votingStartedAt > 0 && blocksPassed > DEFAULT_VOTING_PERIOD) {
            revert VotingPeriodIsOver();
        }
    }
}
