import { ethers } from "ethers";

const createAccount = (): ethers.Wallet => {
  let wallet = ethers.Wallet.createRandom();

  return wallet;
}

export default createAccount;