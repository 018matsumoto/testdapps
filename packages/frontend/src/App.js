import { useState } from "react";
import WalletForm from "./components/WalletForm";
import WalletStatus from "./components/WalletStatus";

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

function App() {
  const [isConnect, setConnect] = useState(false)
  const [account, setAccount] = useState()
  const [balance, setBalance] = useState()

  const handleClick = async () => {
    const account = await getAccount();
    if (account) {
      setAccount(account);
      setBalance(9999);
      setConnect(true);
    } else {
      setAccount("???");
      setBalance(9876);
      setConnect(false);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4 w-full h-screen bg-slate-100">
      <WalletForm isConnect={isConnect} address={account} handleClick={handleClick} />
      <WalletStatus isConnect={isConnect} balance={balance} />
    </div>
  );
}

export default App;
