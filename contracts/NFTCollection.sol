// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFTCollection is ERC721, ERC721URIStorage, ERC721Enumerable, Ownable {

    uint public constant MAX_SUPPLY = 100;
    uint256 public constant MINT_PRICE = 1000000000000000; // 0.001 ETH
    string baseURI = "";

    // address payable public ownerAddress = payable(0xa95EA4CEf177f3aCc2d4545E6D2D8919887AA874);
    address payable ownerAddress = payable(msg.sender);
    bool public hasSaleStarted = false;
    bool internal URISet = false;
    uint[MAX_SUPPLY] private indices;



    constructor() ERC721("NFTCollection", "NFT") {    }

    // function to get a random id for minting (by DerpyBirbs)
    function randomIndex() internal returns (uint) {
        uint totalSize = MAX_SUPPLY - totalSupply();
        uint index = uint(keccak256(abi.encodePacked(totalSupply(), msg.sender, block.difficulty, block.timestamp))) % totalSize;
        uint value = 0;

        if (indices[index] != 0) {
            value = indices[index];
        } else {
            value = index;
        }

        // Move last value to selected position
        if (indices[totalSize - 1] == 0) {
            // Array position not initialized, so use position
            indices[index] = totalSize - 1;
        } else {
            // Array position holds a value so use that
            indices[index] = indices[totalSize - 1];
        }
        return value;
    }


    function listNFTsOfOwner(address _owner) external view returns(uint256[] memory ) {
        uint256 tokenCount = balanceOf(_owner);
        if (tokenCount == 0) {
            // Return an empty array
            return new uint256[](0);
        }
        else {
            uint256[] memory result = new uint256[](tokenCount);
            uint256 index;
            for (index = 0; index < tokenCount; index++) {
                result[index] = tokenOfOwnerByIndex(_owner, index);
            }
        return result;
        }
     }

    // mint
    function mintNFTs(uint256 numNFTs) external payable {
        require(hasSaleStarted == true, "Sale has not started yet");
        require(numNFTs > 0 && numNFTs <= 10, "You can only buy 1 to 10 nfts at a time");
        require(totalSupply() + numNFTs <= MAX_SUPPLY, "There aren't enough nfts left");
        uint256 totalPrice = MINT_PRICE * numNFTs;
        require(msg.value >= totalPrice, "Ether value sent is below the mint price");

        uint id;
        for (uint i = 0; i < numNFTs; i++) {
            id = randomIndex();
            _safeMint(msg.sender, id);
        }
    }


    function withdrawFunds() external {
        uint256 amount = address(this).balance;
        ownerAddress.transfer(amount);

    }

  
    // OWNER ONLY

    // owner can mint for free
    function mintNFTsOwner(uint256 numNFTs) external {
        require(hasSaleStarted == true, "Sale has not started yet");
        require(numNFTs > 0 , "Mint at least 1 nft");
        require(totalSupply() + numNFTs <= MAX_SUPPLY, "There aren't enough nfts left");

        uint id;
        for (uint i = 0; i < numNFTs; i++) {
            id = randomIndex();
            _safeMint(ownerAddress, id);
        }
    }

    // Start the sale
    function startSale() external onlyOwner {
        require(hasSaleStarted == false, "Sale has already started");
        require(URISet == true, "URI not set");
        hasSaleStarted = true;
    }



    // Change metadata
    function _baseURI() internal view virtual override returns(string memory) {

        return baseURI;
    }

    function setBaseURI(string memory newURI) external onlyOwner {
        require(hasSaleStarted == false, "Can't change metadata after the sale has started");
        URISet = true;
        baseURI = newURI;
    }




  // The following functions are overrides required by Solidity.

    function _beforeTokenTransfer(address from, address to, uint256 tokenId)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }



    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
            super._burn(tokenId);
        }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
        {
            return super.tokenURI(tokenId);
        }

}


