const {expect, assert} = require("chai")
const { mnemonicToEntropy } = require("ethers/lib/utils")
const { ethers, waffle } = require("hardhat")

// const NFTCollection = artifacts.require("./NFTCollection.sol")


describe("NFTCollection", function() {

  
  it("should deploy the contract", async function () {
    const NFTCollection = await ethers.getContractFactory("NFTCollection")
    const nftcollection = await NFTCollection.deploy()
    await nftcollection.deployed()
    expect(await nftcollection.name()).to.equal("NFTCollection")
    expect(await nftcollection.symbol()).to.equal("NFT")
  })


  it("should mint an NFT to the contract owner", async function () {
    const NFTCollection = await ethers.getContractFactory("NFTCollection")
    const nftcollection = await NFTCollection.deploy()
    await nftcollection.deployed()

    const  ownerAddress = "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266"

    await nftcollection.setBaseURI("testuri.com/")
    await nftcollection.startSale()

    // owner
    const token = await nftcollection.mintNFTsOwner(5);
    let balanceAfterBuy = await nftcollection.balanceOf(ownerAddress);
    expect(balanceAfterBuy).to.equal(5);


    // user
    const token2 = await nftcollection.mintNFTs(2, {value: ethers.utils.parseEther("0.002")});
    let balanceAfterBuy2= await nftcollection.balanceOf(ownerAddress);
    expect(balanceAfterBuy2).to.equal(7);


  })


  it("should withdraw funds to owner wallet", async function () {
    const NFTCollection = await ethers.getContractFactory("NFTCollection")
    const nftcollection = await NFTCollection.deploy()
    await nftcollection.deployed()
    provider = waffle.provider;


    const  ownerAddress = "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266"
    await nftcollection.setBaseURI("testuri.com/")
    await nftcollection.startSale()


    let balanceInEth = await provider.getBalance(ownerAddress)
    balanceInEth = Number(ethers.utils.formatEther(balanceInEth))
    // console.log(balanceInEth)

    // owner
    const token = await nftcollection.mintNFTs(10, {value: ethers.utils.parseEther("0.01")})

    let balanceInEth2 = await provider.getBalance(ownerAddress)
    balanceInEth2 = Number(ethers.utils.formatEther(balanceInEth2))
    // console.log(balanceInEth2)

    expect(balanceInEth2).to.lessThan(balanceInEth)


    const funds = await nftcollection.withdrawFunds()


    let balanceInEth3 = await provider.getBalance(ownerAddress)
    balanceInEth3 = Number(ethers.utils.formatEther(balanceInEth3))
    // console.log(balanceInEth3)

    expect(balanceInEth3).to.greaterThan(balanceInEth2)
    expect(balanceInEth3).to.lessThan(balanceInEth)  // gas cost



  })

  it("list nfts of owner wallet", async function () {
    const NFTCollection = await ethers.getContractFactory("NFTCollection")
    const nftcollection = await NFTCollection.deploy()
    await nftcollection.deployed()
    provider = waffle.provider;


    const  ownerAddress = "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266"
    await nftcollection.setBaseURI("testuri.com/")
    await nftcollection.startSale()


    const token = await nftcollection.mintNFTsOwner(100)

    let tokens = await nftcollection.listNFTsOfOwner(ownerAddress)


  })

  it("check token uri", async function () {
    const NFTCollection = await ethers.getContractFactory("NFTCollection")
    const nftcollection = await NFTCollection.deploy()
    await nftcollection.deployed()
    provider = waffle.provider;


    const  ownerAddress = "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266"
    await nftcollection.setBaseURI("testuri.com/")
    await nftcollection.startSale()


    const token = await nftcollection.mintNFTsOwner(100)

    let tokens = await nftcollection.listNFTsOfOwner(ownerAddress)
    

    let uri = await nftcollection.tokenURI(10)


    expect(uri).to.equal("testuri.com/10")

  })

})
