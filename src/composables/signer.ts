import { ethers } from "ethers";

// const provider = new ethers.providers.StaticJsonRpcProvider("dass")
export const getSigner = (private_key: string, provider: ethers.providers.StaticJsonRpcProvider) => {
  const signer = new ethers.Wallet(private_key, provider);
  return signer;
}