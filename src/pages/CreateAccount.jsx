import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { useAppContext } from "../provider/AppProvider";

const CreateAccount = () => {
  const { contract, address, handleWalletConnection } = useAppContext();
  const [loading, setLoading] = useState(false);

  const enroll = () => {
    if (address) {
      const myCall = contract.populate("create_participant", []);
      setLoading(true);
      contract["create_participant"](myCall.calldata)
        .then((res) => {
          console.info("Successful Response:", res);
        })
        .catch((err) => {
          console.error("Error: ", err);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      handleWalletConnection();
    }
  };
  return (
    <div>
      <Navbar />
      <br />
      <br />
      <br />
      <div className="w3-center">
        <button className="w3-button w3-blue w3-round" onClick={enroll}>
          Click to enroll
        </button>
      </div>
    </div>
  );
};

export default CreateAccount;
