const {expect, assert} = require("chai")
const { mnemonicToEntropy } = require("ethers/lib/utils")

// const Sharksocialclub = artifacts.require("./Sharksocialclub.sol")

describe("Sharksocialclub", function() {




  it("is a test", async function () {

    const MyContract = await hre.ethers.getContractFactory("Sharksocialclub")
    const myContract = await MyContract.deploy()
    await myContract.deployed()
    expect(await myContract.name()).to.equal("Sharksocialclub")

  })

  it("is a test2", async function () {

    const MyContract = await hre.ethers.getContractFactory("Sharksocialclub")
    const myContract = await MyContract.deploy()
    await myContract.deployed()

    tokenuri = await myContract.mintSharks(1)


    console.log(tokenuri)


  })

})
