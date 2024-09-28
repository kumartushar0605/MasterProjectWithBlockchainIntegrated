const hre= require("hardhat");

const tokens = async(n) => {
    return hre.ethers.parseUnits(n.toString(), 'ether')
  }

async function main() {
    console.log('Ethers version:', ethers.version);

    const collegeConnect = await hre.ethers.deployContract("CollegeConnect");
    await collegeConnect.waitForDeployment();

    console.log("CollegeConnect deployed to:", collegeConnect.target);
}

// Run the script using the Hardhat runtime environment
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
