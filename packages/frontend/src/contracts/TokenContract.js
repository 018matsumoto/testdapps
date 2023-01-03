import { ethers } from "ethers";

class TokenContract {
  constructor(connecter) {
    this.provider = new ethers.providers.Web3Provider(connecter);
    this.contract = null;
    this.name = "";
    this.symbol = "";
  }

  async initialize(address, abi) {
    this.contract = new ethers.Contract(
      address,
      abi,
      this.provider.getSigner(0)
    );
    this.name = await this.contract.name();
    this.symbol = await this.contract.symbol();
    // this.contract.on("Transfer", (_from, _to, _value)=>{
    // });
    return { name: this.name, symbol: this.symbol };
  }

  async balanceOf(account) {
    const balance = await this.contract.balanceOf(account);
    return balance.toString();
  }

  async transfer(to, amount) {
    const transaction = await this.contract.transfer(to, amount);
    console.log("transaction hash", transaction.hash);

    const receipt = await transaction.wait();
    if (receipt.status === 0) {
      throw new Error("Transaction failed.");
    }

    return receipt;
  }
}

export default TokenContract;
