const fs = require("fs");
const path = require("path");

async function main() {
  console.warn("Network:", network.name);
  console.warn("NetworkType:", network.config.networkType);
  console.warn("ChainId:", network.config.chainId);

  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  const Token = await ethers.getContractFactory("Token");
  const token = await Token.deploy();
  await token.deployed();

  console.log("Token address:", token.address);
  saveFrontendFiles(token, network.config);
}

function saveFrontendFiles(token, config) {
  // create directory
  const contractsDir = path.join(__dirname, "..", "..", "frontend", "src", "contracts");
  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }

  // create(update) token-address.json
  let tokenAddressData = {};
  const tokenAddressFile = path.join(contractsDir, "token-address.json");
  if (fs.existsSync(tokenAddressFile)) {
    tokenAddressData = JSON.parse(fs.readFileSync(tokenAddressFile, "utf8"));
  }
  fs.writeFileSync(
    tokenAddressFile,
    JSON.stringify(
      {
        ...tokenAddressData,
        [config.networkType]: {
          address: token.address,
          chainId: config.chainId,
        },
      },
      undefined,
      2
    )
  );

  // create Token.json
  const TokenArtifact = artifacts.readArtifactSync("Token");
  fs.writeFileSync(
    path.join(contractsDir, "token.json"),
    JSON.stringify(TokenArtifact, null, 2)
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
