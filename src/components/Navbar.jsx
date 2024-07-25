import React from "react";
import { useAppContext } from "../provider/AppProvider";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { handleWalletConnection, handleWalletDisconnection, address } =
    useAppContext();

  const disconnectWallet = () => {
    if (window.confirm("are you sure you want to disconnect") == true) {
      handleWalletDisconnection();
      window.location.reload();
    }
  };

  const barItems = [
    { item_name: "home", item_link: "" },

    { item_name: "create account", item_link: "create-account" },
    { item_name: "create quiz", item_link: "create-quiz" },
    { item_name: "create questions", item_link: "create-questions" },
    { item_name: "answer questions", item_link: "answer-questions" },
  ];

  return (
    <div className="w3-bar w3-padding w3-blue">
      <span className="w3-bar-item w3-large">Stark Quiz</span>
      {barItems.map((item, index) => (
        <Link to={`/${item.item_link}`} className="w3-bar-item" key={index}>
          {item.item_name}
        </Link>
      ))}

      <div className="w3-right">
        {address ? (
          <button
            onClick={disconnectWallet}
            className="w3-btn w3-round w3-border w3-border-white"
          >
            {address.substring(0, 5)}...{address.substring(address.length - 5)}
          </button>
        ) : (
          <button
            className="w3-btn w3-round w3-border w3-border-white"
            onClick={handleWalletConnection}
          >
            Connect wallet
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
