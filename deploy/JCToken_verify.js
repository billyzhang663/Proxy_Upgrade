const { ethers, run } = require("hardhat");

module.exports = async ({ deployments }) => {
    const implementation = await ethers.getContract("JCToken");
    try {
        await run("verify:verify", {
            address: implementation.address,
            contract: "contracts/JCToken.sol:JCToken",
        });
    } catch (e) {
        console.log(0, e);
    }

    const upgradeTokenArtifact = await deployments.getArtifact("JCToken");
    const iface = new ethers.utils.Interface(JSON.stringify(upgradeTokenArtifact.abi));
    const data = iface.encodeFunctionData("initialize", [
        "JCToken", "JCT"
    ]);
    const proxy = await ethers.getContract("JCProxy");
    try {

        await run("verify:verify", {
            address: proxy.address,
            constructorArguments: [
                implementation.address,
                process.env.PROXY_ADMIN_ADDRESS,
                data,
            ],
            contract: "contracts/JCProxy.sol:JCProxy",
        });
    } catch (e) {
        console.log(1, e);
    }
};
module.exports.tags = ["JCToken_verify"];