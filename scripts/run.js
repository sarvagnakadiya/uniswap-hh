const { network, ethers } = require("hardhat");

const fundErc20 = async (contract, sender, recipient, amount, decimals) => {
  // Fund ERC20 token to the contract
  const whale = await ethers.getSigner(sender);
  const contractSigner = contract.connect(whale);
  await contractSigner.transfer(recipient, amount);
};

const impersonateFundErc20 = async (
  contract,
  sender,
  recipient,
  amount,
  decimals
) => {
  await network.provider.request({
    method: "hardhat_impersonateAccount",
    params: [sender],
  });

  await fundErc20(contract, sender, recipient, amount, decimals);

  await network.provider.request({
    method: "hardhat_stopImpersonatingAccount",
    params: [sender],
  });
};

async function main() {
  const contract = await ethers.getContractAt(
    "WETH9",
    "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"
  );
  const sender = "0x267ed5f71EE47D3E45Bb1569Aa37889a2d10f91e";
  const recipient = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
  const amount = "100000000000000000000";
  const decimals = 18;

  // Get the balance of recipient before the transfer
  const balanceBefore = await contract.balanceOf(recipient);
  console.log(
    "Recipient balance before transfer:",
    ethers.formatUnits(balanceBefore, decimals)
  );
  const balanceBefore2 = await contract.balanceOf(sender);
  console.log(
    "sender balance before transfer:",
    ethers.formatUnits(balanceBefore2, decimals)
  );

  const tx = await impersonateFundErc20(
    contract,
    sender,
    recipient,
    amount,
    decimals
  );
  //   const [receipt] = await ethers.provider.getTransactionReceipt(tx.hash);
  //   console.log("Transaction Receipt:", receipt);

  const balanceAfter = await contract.balanceOf(recipient);
  console.log(
    "Recipient balance after transfer:",
    ethers.formatUnits(balanceAfter, decimals)
  );
  const balanceAfter2 = await contract.balanceOf(sender);
  console.log(
    "sender balance after transfer:",
    ethers.formatUnits(balanceAfter2, decimals)
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
