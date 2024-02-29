/* const helpers = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { ethers } = require("hardhat");

async function main() {
  const destinationAddress = "0x97861976283e6901b407D1e217B72c4007D9F64D";
  const url = "http://127.0.0.1:8545/";
  const provider = new ethers.JsonRpcProvider(url, undefined, {
    staticNetwork: true,
  });
  const vitalikAddress = "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045"; // vitalik.eth

  const impersonatedSigner = await ethers.getImpersonatedSigner(vitalikAddress);
  await impersonatedSigner.sendTransaction({
    to: destinationAddress,
    value: "1000000000000000000",
  });

  //   const impersonate = await helpers.impersonateAccount(vitalikAddress);
  //   const impersonatedSigner = await ethers.getSigner(vitalikAddress);
  //   //   console.log(impersonatedSigner);
  //   const balanceBefore = await provider.getBalance(vitalikAddress);
  //   console.log("balance before of vitalik: ", balanceBefore);

  //   const transfer = await impersonatedSigner.sendTransaction({
  //     to: destinationAddress,
  //     value: "10000000000000000000",
  //   });
  //   console.log(transfer);
  const balanceAfter = await provider.getBalance(
    "0x97861976283e6901b407D1e217B72c4007D9F64D"
  );
  console.log("my balance now: ", balanceAfter);
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); */

/* const { ethers, network } = require("hardhat");

async function send() {
  const vitalik_address = "0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B";
  const addressTo = "0x97861976283e6901b407D1e217B72c4007D9F64D";

  const url =
    "https://eth-mainnet.g.alchemy.com/v2/40NCT0StPsfEZkWeZu8-E4ByKln3pSCW";
  //  impersonating vitalik's account
  const provider = new ethers.JsonRpcProvider(url, undefined, {
    staticNetwork: true,
  });

  //   make vitalik the signer
  const signer = await ethers.getSigner(vitalik_address);

  console.log(
    "Vitalik account before transaction",
    await provider.getBalance(vitalik_address)
  );

  //   create  transaction
  const tx = {
    to: addressTo,
    value: "10000000000000000000",
  };

  const recieptTx = await signer.sendTransaction(tx);

  await recieptTx.wait();

  console.log(`Transaction successful with hash: ${recieptTx.hash}`);
  console.log(
    "Vitalik account after transaction",
    provider.getBalance(vitalik_address)
  );
}

send()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
 */

const { ethers } = require("hardhat");

async function main() {
  const impersonatedAddress = "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045";
  const recipientAddress = "0x97861976283e6901b407D1e217B72c4007D9F64D";
  const amountToSend = ethers.parseEther("0.1"); // Amount in ether

  // Impersonating the desired address
  await hre.network.provider.request({
    method: "hardhat_impersonateAccount",
    params: [impersonatedAddress],
  });

  // Getting the signer object for the impersonated address
  const impersonatedSigner = await ethers.provider.getSigner(
    impersonatedAddress
  );

  // Retrieving the balance of the impersonated address
  const balanceBefore = await impersonatedSigner.getBalance();
  console.log(
    "Balance before sending:",
    ethers.utils.formatEther(balanceBefore)
  );

  // Sending funds from the impersonated address to the recipient address
  const tx = await impersonatedSigner.sendTransaction({
    to: recipientAddress,
    value: amountToSend,
  });
  await tx.wait();
  console.log("Transaction hash:", tx.hash);

  // Retrieving the updated balance of the impersonated address
  const balanceAfter = await impersonatedSigner.getBalance();
  console.log("Balance after sending:", ethers.utils.formatEther(balanceAfter));

  // Stop impersonating the address
  await hre.network.provider.request({
    method: "hardhat_stopImpersonatingAccount",
    params: [impersonatedAddress],
  });
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
