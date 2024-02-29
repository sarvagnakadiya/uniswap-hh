const { ethers } = require("hardhat");
require("dotenv").config({ path: __dirname + "/.env" });

async function main() {
  // --------------------------------------------------------------------------------- UniswapV2Factory
  console.log("Deploying UniswapV2Factory contract...");

  const CoreV2Deploy = await ethers.getContractFactory("UniswapV2Factory");
  const coreV2Deploy = await CoreV2Deploy.deploy(process.env.OWNER);

  //   0xd8da8c3d1014f59d60e90c01239371a35ad61da21d5373dcbc31b9a131351205 - INIT_CODE_PAIR_HASH
  //   const initCode = await coreV2Deploy.INIT_CODE_PAIR_HASH();
  //   console.log("INIT_CODE:", initCode);

  console.log("UniswapV2Factory deployed to:", coreV2Deploy.target);
  // --------------------------------------------------------------------------------- UniswapV2Router02
  console.log("Deploying UniswapV2Factory contract...");

  const PeripheryV2Deploy = await ethers.getContractFactory(
    "UniswapV2Router02"
  );
  const peripheryV2Deploy = await PeripheryV2Deploy.deploy(
    coreV2Deploy.target,
    process.env.WETH
  );

  console.log("UniswapV2Router02 deployed to:", peripheryV2Deploy.target);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
