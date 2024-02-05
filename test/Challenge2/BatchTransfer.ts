import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("BatchTransfer", function () {
    // We define a fixture to reuse the same setup in every test.
    // We use loadFixture to run this setup once, snapshot that state,
    // and reset Hardhat Network to that snapshot in every test.
    async function deployOneYearLockFixture() {
        const [owner] = await ethers.getSigners();
        const TestToken = await ethers.getContractFactory("TestToken");
        const testToken = await TestToken.deploy("erc20", "TT", 1000);

        const BatchTransfer = await ethers.getContractFactory("BatchTransfer");
        const batchTransfer = await BatchTransfer.deploy(await testToken.getAddress());

        return { batchTransfer, testToken };
    }

    describe("Deployment", function () {
        it("Batch transfer of TT ERC20 token to multiple address", async function () {
            const [owner, account1, account2] = await ethers.getSigners();
            
            const { batchTransfer, testToken } = await loadFixture(deployOneYearLockFixture);

            //Check balances of the address before batch transfer
            expect(await testToken.balanceOf(owner.address)).to.equal(1000);
            expect(await testToken.balanceOf(account1.address)).to.equal(0);
            expect(await testToken.balanceOf(account2.address)).to.equal(0);

            //Approve batchTransfer contract to transfer the tokens to addresses
            await testToken.connect(owner).approve(await batchTransfer.getAddress(), 300);
            //Batch transfer of tokens from a addresss to multiple addresses
            await batchTransfer.connect(owner).transferBatch([account1.address, account2.address], [100, 200]);

            //Check balances of the address after batch transfer
            expect(await testToken.balanceOf(owner.address)).to.equal(700);
            expect(await testToken.balanceOf(account1.address)).to.equal(100);
            expect(await testToken.balanceOf(account2.address)).to.equal(200);
        });

    });
});
