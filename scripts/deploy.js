async function main() {
  const Vault = await ethers.getContractFactory("GloomryVault");
  const vault = await Vault.deploy();

  await vault.waitForDeployment();

  console.log("GloomryVault deployed to:", await vault.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
