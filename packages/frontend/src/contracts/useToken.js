import { useEffect, useState } from "react";
import TokenContract from "./TokenContract";
import tokenAbi from "./token.json";
import tokenAddress from "./token-address.json";

// Contract Address
const CONTRACT_ADDRESS = tokenAddress[process.env.REACT_APP_NETWORK_TYPE]?.address;
const CONTRACT_CHAIN_Id = tokenAddress[process.env.REACT_APP_NETWORK_TYPE]?.chainId;
console.log("NETWORK_TYPE:", process.env.REACT_APP_NETWORK_TYPE);

// MetaMask Error Code
const ERROR_CODE_NO_METAMASK = 4001;

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
    setState((prev) => ({ ...prev, contractAddress: CONTRACT_ADDRESS }));
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
      if (err.code === ERROR_CODE_NO_METAMASK) {
        console.log("Please connect to MetaMask.");
      } else {
        console.error(err);
      }
    }
  };

  const loadContract = async (account) => {
    try {
      const { name, symbol } = await contract.initialize(
        CONTRACT_ADDRESS,
        tokenAbi.abi
      );
      const balance = await contract.balanceOf(account);
      setState((prev) => ({
        ...prev,
        name,
        symbol,
        balance,
      }));
    } catch (err) {
      if (err.code === ERROR_CODE_NO_METAMASK) {
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
    console.log("chainId", Number(window.ethereum.chainId));
    if (Number(window.ethereum.chainId) !== CONTRACT_CHAIN_Id) {
      console.log("No network connection.");
      return false;
    }
    return true;
  };

  return [ state, connectWallet, loadContract, updateBalance ];
};

export default useToken;
