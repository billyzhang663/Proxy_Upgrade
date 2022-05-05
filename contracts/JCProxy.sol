pragma solidity >=0.6.0;

import "@openzeppelin/contracts/proxy/TransparentUpgradeableProxy.sol";

///  0xd58d50188e0a14ABAC0D3DDa5325564c276F1f1E

contract JCProxy is TransparentUpgradeableProxy {
    bool isKillUpdate = false;

    constructor(address logic, address admin, bytes memory data) TransparentUpgradeableProxy(logic, admin, data) public {

    }

    function killUpdate() external ifAdmin {
        isKillUpdate = true;
    }

    function upgradeTo(address newImplementation) external virtual override ifAdmin {
        if (!isKillUpdate) {
            _upgradeTo(newImplementation);
        }            
    }


}