pragma solidity ^0.8.7;

//SPDX-License-Identifier: MIT
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
contract SmartBet is Ownable {
    using SafeERC20 for IERC20;

    IERC20 USDT;

    address companyAddress;

    struct Winners {
        address winnerAddress;
        uint256 amountWon;
    }

    constructor(
        address _companyAddress,
        address _usdtAddress
    ) payable Ownable(_companyAddress) {
        USDT = IERC20(_usdtAddress);
        companyAddress = _companyAddress;
    }

    receive() external payable {}

    event payoutMadeNativeToken(Winners[] winners);
    event payoutMadeUSDT(Winners[] winners);

    event SentProfitNativeToken(uint256 amount);
    event SentProfitUSDT(uint256 amount);

    // ################################################################################

    // NATIVE TOKEN

    function gamePayoutNativeToken(Winners[] memory _winners) public onlyOwner {
        require(_winners.length > 0, "Invalid Winners Length");

        uint256 totalAmount = 0;
        for (uint256 i = 0; i < _winners.length; i++) {
            totalAmount += _winners[i].amountWon;
        }

        require(
            address(this).balance >= totalAmount,
            "Insufficient Native Token balance in the contract"
        );

        for (uint256 i = 0; i < _winners.length; i++) {
            (bool success, ) = _winners[i].winnerAddress.call{
                value: _winners[i].amountWon
            }("");
            require(success, "Native Token transfer failed");
        }

        emit payoutMadeNativeToken(_winners);
    }

    function sendProfitNativeToken(uint256 _amount) public onlyOwner {
        require(
            address(this).balance >= _amount,
            "Insufficient Native Token balance in the contract"
        );

        // Transfer Native Token to the specified address
        (bool success, ) = companyAddress.call{value: _amount}("");
        require(success, "Native Token transfer failed");

        emit SentProfitNativeToken(_amount);
    }

    // ################################################################################

    // USDT

    function gamePayoutUSDT(Winners[] memory _winners) public onlyOwner {
        require(_winners.length > 0, "Invalid Winners Length");

        uint256 totalAmount = 0;
        for (uint256 i = 0; i < _winners.length; i++) {
            totalAmount += _winners[i].amountWon;
        }

        require(
            USDT.balanceOf(address(this)) >= totalAmount,
            "Insufficient USDT balance in the contract"
        );

        for (uint256 i = 0; i < _winners.length; i++) {
            USDT.safeTransfer(_winners[i].winnerAddress, _winners[i].amountWon);
        }

        emit payoutMadeUSDT(_winners);
    }

    function sendProfitUSDT(uint256 _amount) public onlyOwner {
        require(
            USDT.balanceOf(address(this)) >= _amount,
            "Insufficient BUSD balance in the contract"
        );

        // Transfer USDT to the specified address
        USDT.safeTransfer(companyAddress, _amount);

        emit SentProfitUSDT(_amount);
    }

    function peggedDollarTokenAddress() public view returns (address) {
        return address(USDT);
    }
}
