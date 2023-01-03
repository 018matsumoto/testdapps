import { useEffect, useState } from "react";
import TokenContract from "token";
import tokenAbi from "./contracts/Token.json";
import contractAddress from "./contracts/contract-address.json";

const initState = {
  contractAddress: null,
  name: null,
  symbol: null,
  account: null,
  balance: null,
};

const useToken = () => {
  const [contract, setContract] = useState();
  const [state, setState] = useState(initState);

  useEffect(() => {
    setContract(new TokenContract(window.ethereum));
    setState((prev) => ({ ...prev, contractAddress: contractAddress.Token }));
  }, []);

  const connectWallet = async () => {
    try {
      if (!isMetaMask() || !isTestnetOrLocal()) {
        throw new Error("MetaMask Error!");
      }
      const [account] = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setState((prev) => ({ ...prev, account }));
    } catch (err) {
      if (err.code === 4001) {
        console.log("Please connect to MetaMask.");
      } else {
        console.error(err);
      }
    }
  };

  const loadContract = async (account) => {
    try {
      const [name, symbol] = await contract.initialize(
        contractAddress.Token,
        tokenAbi.abi
      );
      const balance = await contract.balanceOf(account);
      setState((prev) => ({
        ...prev,
        name,
        symbol,
        balance: balance.toString(),
      }));
    } catch (err) {
      if (err.code === 4001) {
        console.log("Please connect to MetaMask.");
      } else {
        console.error(err);
      }
    }
  };

  const updateBalance = async (account) => {
    try {
      const balance = await contract.balanceOf(account);
      setState((prev) => ({ ...prev, balance: balance.toString() }));
    } catch (err) {
      console.error(err);
    }
  };

  const isMetaMask = () => {
    if (!window.ethereum) {
      console.log("No MetaMask.");
      return false;
    }
    return true;
  };

  const isTestnetOrLocal = () => {
    if (window.ethereum.networkVersion === "undefined") {
      console.log("No network connection.");
      return false;
    }
    return true;
  };

  return { state, connectWallet, loadContract, updateBalance };
};

export default useToken;
