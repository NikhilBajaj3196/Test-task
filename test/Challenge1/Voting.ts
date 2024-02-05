import { mine } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Voting", function () {
    // We define a fixture to reuse the same setup in every test.
    // We use loadFixture to run this setup once, snapshot that state,
    // and reset Hardhat Network to that snapshot in every test.
    async function deployOneYearLockFixture() {
        const voters = await ethers.getSigners();

        const Voting = await ethers.getContractFactory("Voting");
        const voting = await Voting.deploy(100);

        return { voting, voters };
    }

    describe("Deployment", function () {
        it("Propose few items for voting and get winner in the last", async function () {
            const { voting, voters } = await loadFixture(deployOneYearLockFixture);

            // checking for the default voting period
            expect(await voting.DEFAULT_VOTING_PERIOD()).to.equal(100);

            // checking for the voting started prior to its starting
            expect(await voting.votingStartedAt()).to.equal(0);

            //Propose items
            await voting.proposeItem("Item1");
            await voting.proposeItem("Item2");
            await voting.proposeItem("Item3");

            //checking, has voting started as first item is proposed
            expect(await voting.votingStartedAt()).to.equal(2);

            //voting for items
            await voting.connect(voters[0]).voteForItem(2)
            await voting.connect(voters[1]).voteForItem(1)
            await voting.connect(voters[2]).voteForItem(2)
            await voting.connect(voters[3]).voteForItem(1)
            await voting.connect(voters[4]).voteForItem(3)
            await voting.connect(voters[5]).voteForItem(2)

            await mine(100);
            const winner = await voting.getWinner()
            expect(winner[0]).to.equal(2);
            expect(winner[1]).to.equal("Item2");

        });

    });
});
