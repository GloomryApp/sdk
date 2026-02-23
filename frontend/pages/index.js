import { useState } from "react";
import { ethers } from "ethers";

const contractAddress = "YOUR_DEPLOYED_CONTRACT_ADDRESS";

const abi = [
  "function deposit() payable",
  "function withdraw(uint256 amount)",
  "function getBalance(address user) view returns (uint256)"
];

export default function Home() {
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(null);

  async function connectWallet() {
    if (!window.ethereum) return alert("Install MetaMask");

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const address = await signer.getAddress();

    setAccount(address);
  }

  async function deposit() {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);

    const tx = await contract.deposit({ value: ethers.parseEther("0.01") });
    await tx.wait();
    alert("Deposited 0.01 ETH");
  }

  async function checkBalance() {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const contract = new ethers.Contract(contractAddress, abi, provider);

    const bal = await contract.getBalance(account);
    setBalance(ethers.formatEther(bal));
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>🌑 Gloomry Vault</h1>

      {!account ? (
        <button onClick={connectWallet}>Connect Wallet</button>
      ) : (
        <>
          <p>Connected: {account}</p>
          <button onClick={deposit}>Deposit 0.01 ETH</button>
          <button onClick={checkBalance}>Check Balance</button>

          {balance && <p>Your Balance: {balance} ETH</p>}
        </>
      )}
    </div>
  );
}
