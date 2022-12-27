import { useState } from "react";
import { ethers } from 'ethers';
import WalletForm from "./components/WalletForm";
import WalletStatus from "./components/WalletStatus";
import tokenAbi from './contracts/Token.json';
import contractAddress from "./contracts/contract-address.json";

const getAccount = async () => {
  try {
    if (typeof window.ethereum === 'undefined') {
      console.log('MetaMask がありません！');
      return "";
    }
    const account = await window.ethereum.request({ method: 'eth_requestAccounts' });
    if (account.length > 0) {
      return account[0];
    } else {
      return "";
    }
  } catch (err) {
    if (err.code === 4001) {
      console.log('Please connect to MetaMask.');
    } else {
      console.error(err);
    }
    return "";
  }
}

const getBalance = async (account) => {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(contractAddress.Token, tokenAbi.abi, provider.getSigner(0));
    
    console.log(account, contract);
    const name = await contract.name();
    const symbol = await contract.symbol();
    const balance = await contract.balanceOf(account);
    return { name, symbol, balance: balance.toString() };
  } catch (err) {
    if (err.code === 4001) {
      console.log('Please connect to MetaMask.');
    } else {
      console.error(err);
    }
    return 0;
  }
}

function App() {
  const [isConnect, setConnect] = useState(false)
  const [account, setAccount] = useState()
  const [balance, setBalance] = useState()

  const handleClick = async () => {
    const account = await getAccount();
    if (account) {
      const { symbol, balance } = await getBalance(account);
      setAccount(account);
      setBalance(`${balance} ${symbol}`);
      setConnect(true);
    } else {
      setAccount("???");
      setBalance(9876);
      setConnect(false);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4 p-4 w-full h-screen bg-slate-100">
      <WalletForm isConnect={isConnect} address={account} handleClick={handleClick} />
      <WalletStatus isConnect={isConnect} balance={balance} />
    </div>
  );
}

export default App;
