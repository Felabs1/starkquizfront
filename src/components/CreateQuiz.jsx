import React, { useState, useRef } from "react";
import { useAppContext } from "../provider/AppProvider";

const CreateQuiz = () => {
  const { contract, address } = useAppContext();
  const [loading, setLoading] = useState(false);
  const title = useRef();
  const description = useRef();

  const createQuiz = () => {
    const _title = title.current.value;
    const _description = description.current.value;
    if (address) {
      const myCall = contract.populate("create_participant", [
        _title,
        _description,
      ]);
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
    <div className="w3-auto">
      <h3>Create Quiz</h3>
      <label>title</label>
      <input className="w3-input w3-border w3-round" type="text" ref={title} />
      <label>Description</label>
      <input
        className="w3-input w3-border w3-round"
        type="text"
        ref={description}
      />
      <br />
      <button className="w3-button w3-blue w3-round" onClick={createQuiz}>
        create
      </button>
    </div>
  );
};

export default CreateQuiz;
