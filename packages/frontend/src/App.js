import { useState } from "react";
import Header from "./components/Header";
import Layout from "./components/Layout";
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
      {/* <TransferForm isConnect={isConnect} address={account} handleClickTransfer={handleTransfer} /> */}
    </Layout>
  );
}

export default App;
