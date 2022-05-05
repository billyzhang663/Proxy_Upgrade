pragma solidity >=0.6.0;
import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";

contract JCToken is ERC20Upgradeable {

    function initialize(string memory _name, string memory _symbol) initializer public {
        __ERC20_init(_name, _symbol);
    }

    function mint(address _account, uint _amount) external payable {
        _mint(_account, _amount);
    }

    function burn(address _account, uint _amount) external {
        _burn(_account, _amount);
    }    
}