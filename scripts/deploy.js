
const hre = require("hardhat");

async function main() {

  const NFTCollection = await hre.ethers.getContractFactory("NFTCollection");
  const nftCollection = await NFTCollection.deploy();

  await nftCollection.deployed();

  console.log("nftCollection deployed to:", nftCollection.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
