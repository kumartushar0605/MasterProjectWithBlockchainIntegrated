const { expect } = require('chai');
const { ethers } = require('hardhat');

const tokens = (n) => {
    return ethers.parseUnits(n.toString(), 'ether');
}

describe('CollegeConnect', function () {
    let collegeConnect;
    let student;
    let teacher;

    beforeEach(async function () {
        [student, teacher] = await ethers.getSigners();
        collegeConnect = await ethers.deployContract("CollegeConnect");
        await collegeConnect.waitForDeployment();
        console.log("contract Address: " + collegeConnect.target);
    });

    it('Should transfer Ether from student to teacher', async function () {
        // Sending Ether from student to teacher using the CollegeConnect contract
        const transaction = await collegeConnect.connect(student).sendEther(teacher.address, { value: tokens(1) });
        await transaction.wait();

        // Check balances after the transfer
        // await expect(() => transaction).to.changeEtherBalances([student, teacher], [-tokens(1), tokens(1)]);
    });
});
