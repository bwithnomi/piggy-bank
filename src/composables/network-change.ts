import { createCipher } from "./crypto";
import useHash from "./hash";

export type Network = {
  name: string;
  rpc: string;
  chainId: number;
  explorer_url: string;
  curreny_symbol: string;
}

export const networks: Network[] = [
  {
    name: "Mumbai",
    rpc: "https://polygon-mumbai.g.alchemy.com/v2/A9Mi2iqBCtgjYcqIWYR93TDUjUOgFc5_",
    chainId: 8001,
    explorer_url: "https://mumbai.polygonscan.com/",
    curreny_symbol: "MATIC",
  },
  {
    name: "Sepolia",
    rpc: "https://eth-sepolia.g.alchemy.com/v2/oqZGNsE_YVZUaneZzyEy1s2tGKBRVL-p",
    chainId: 11155111,
    explorer_url: "https://sepolia.etherscan.io/",
    curreny_symbol: "SepoliaETH",
  },
]

export const setNetwork = (chainId: number) => {
  
  let net = networks.findIndex(a => a.chainId == chainId)
  if (net > -1) {
    let ciphertext = createCipher(JSON.stringify(networks[net]));
    console.log(useHash('network'));
    
    localStorage.setItem(useHash('network'), ciphertext);
  }
}
