import React, { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useAppContext } from "../provider/AppProvider";

const CreateQuestions = () => {
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const { contract, address } = useAppContext();
  const { questionObject, setQuestionObject } = useState(null);
  const question = useRef();
  const answer = useRef();
  const questionId = useRef();
  console.log(id);

  const getQuestion = () => {
    if (contract) {
      const _questionId = questionId.current.value;
      console.log(_quizId);

      const myCall = contract.populate("get_question", [id, _questionId]);
      setLoading(true);
      contract["get_question"](myCall.calldata, {
        parseResponse: false,
        parseRequest: false,
      })
        .then((res) => {
          let val = contract.callData.parse("get_question", res?.result ?? res);
          console.log(val);
          setQuestionObject(val);
        })
        .catch((err) => {
          console.error("Error: ", err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const handleCreateQuestion = () => {
    const _question = question.current.value;
    const _answer = answer.current.value;
    if (address) {
      const myCall = contract.populate("create_question", [
        id,
        _question,
        _answer,
      ]);
      setLoading(true);
      contract["create_question"](myCall.calldata)
        .then((res) => {
          console.info("Successful Response:", res);
          question.current.value = "";
          answer.current.value = "";
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
      <div className="w3-margin" style={{ width: "40rem" }}>
        <h3>Quiz # {id}</h3>
        <label>question</label>
        <input className="w3-input w3-border w3-round" ref={question} />
        <br />
        <label>answer</label>
        <input className="w3-input w3-border w3-round" ref={answer} />
        <button
          className="w3-button w3-blue w3-round"
          onClick={handleCreateQuestion}
        >
          Create
        </button>

        <br />
        <h3>Create Choices</h3>
        <label>Question Number</label>
        <input className="w3-input w3-border w3-round" ref={questionId} />
        <button className="w3-button w3-border w3-round" onClick={getQuestion}>
          Get Question
        </button>

        <div className="w3-card">choices form goes here</div>
      </div>
    </div>
  );
};

export default CreateQuestions;
