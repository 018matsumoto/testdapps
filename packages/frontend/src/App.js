import { useState } from "react";
import Header from "./components/Header";
import Layout from "./components/Layout";
import TransferForm from "./components/TransferForm";
import WalletForm from "./components/WalletForm";
import WalletStatus from "./components/WalletStatus";
import useToken from "./contracts/useToken";

function App() {
  const [token, connectWallet, loadContract] = useToken();
  const [isConnect, setConnect] = useState(false);

  const handleClickConnect = async () => {
    await connectWallet();
    await loadContract(token.account);
    setConnect(token.account ? true : false);
  };

  const handleClickTransfer = async () => {
  };

  return (
    <Layout>
      <Header contractAddress={token.contractAddress} />
      <WalletForm
        isConnect={isConnect}
        address={token.account}
        handleClickConnect={handleClickConnect}
      />
      <WalletStatus
        isConnect={isConnect}
        balance={token.balance}
        symbol={token.symbol}
      />
      <TransferForm isConnect={isConnect} address={token.account} handleClickTransfer={handleClickTransfer} />
    </Layout>
  );
}

export default App;
