module.exports = async ({ deployments }) => {
  const { deploy } = deployments;
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const implementation = await deploy("JCToken", {
      from: deployer.address,
  });
  console.log("JCToken Implementation address:", implementation.address);

  const upgradeTokenArtifact = await deployments.getArtifact("JCToken");
  const iface = new ethers.utils.Interface(JSON.stringify(upgradeTokenArtifact.abi));
  const data = iface.encodeFunctionData("initialize", [
      "JCToken", "JCT"
  ]);

  const proxy = await deploy("JCProxy", {
      from: deployer.address,
      args: [
          implementation.address,
          process.env.PROXY_ADMIN_ADDRESS,
          data,
      ],
  });
  console.log("JCProxy address: ", proxy.address);
};
module.exports.tags = ["JCToken_deploy"];