require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require("@nomiclabs/hardhat-ethers");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

module.exports = {
  defaultNetwork: "rinkeby",
  networks : {
        hardhat: {
          chainId : 1337
        },
        ropsten: {
          url:"https://ropsten.infura.io/v3/1d38967181ec4df5b411b2e3c5c9b3b1",
          accounts: ["e2e4a076311751dd8afdfbb333a1b1d6006b0453f4362d1e324719ead5362a83"]
        },
        rinkeby: {
          url:"https://eth-rinkeby.alchemyapi.io/v2/CKc76ZQU7gXwFdxxoaqqevTsrczfDZz7",
          accounts: ["e2e4a076311751dd8afdfbb333a1b1d6006b0453f4362d1e324719ead5362a83"]          
        },
        mumbai: {
          url:"https://polygon-mumbai.g.alchemy.com/v2/qWSo_eEjCQ0EpIZyrCYrZHzJox4ihWMF",
          accounts: ["e2e4a076311751dd8afdfbb333a1b1d6006b0453f4362d1e324719ead5362a83"]
        }
    
    
  },

  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    // apiKey: "NZRXSTR9DI1SCAJG1SPWIQ4EDUJHVSGBDS"   // mumbai
    apiKey: "W8HMGVE6K8ZVWGXPTFJB49S4CSCWV3BUY8"      // rinkeby
  },

  solidity: {
    version: "0.8.4",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  paths: {
    sources: "./contracts",
    // tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
  mocha: {
    timeout: 40000
  }
}