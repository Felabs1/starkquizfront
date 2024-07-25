import React, { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useAppContext } from "../provider/AppProvider";
import { bigintToShortStr } from "../utils/AppUtils";

const CreateQuestions = () => {
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const { contract, address } = useAppContext();
  const [questionObject, setQuestionObject] = useState(null);
  const question = useRef();
  const answer = useRef();
  const questionId = useRef();
  const optionText = useRef();
  const isCorrect = useRef();
  const correctOption = useRef();
  console.log(id);

  const handleOptionSubmission = () => {
    const _question_id = questionId.current.value;
    const _answer = answer.current.value;
    const _optionText = optionText.current.value;
    const _isCorrect = isCorrect.current.value;
    const _correctOptoin = correctOption.current.value;

    // console.log(_question_id, _optionText, _isCorrect, _correctOptoin);
    console.log(_question_id);

    if (address) {
      const myCall = contract.populate("create_option", [
        id,
        _question_id,
        _optionText,
        JSON.parse(_isCorrect),
        _correctOptoin,
      ]);
      setLoading(true);
      contract["create_option"](myCall.calldata)
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

  const getQuestion = () => {
    if (contract) {
      const _questionId = questionId.current.value;

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
        <br />
        <br />

        {questionObject && (
          <div className="w3-card w3-padding">
            <p>{bigintToShortStr(questionObject.text)}</p>
            {questionObject.options &&
              questionObject.options.map((option) => {
                return (
                  <div>
                    <label>{bigintToShortStr(option.text)}</label>&nbsp;
                    <input
                      type="radio"
                      className="w3-radio"
                      value={bigintToShortStr(option.id.toString())}
                    />
                  </div>
                );
              })}
            <br />
            <label>option text</label>
            <input className="w3-input w3-border w3-round" ref={optionText} />
            <br />
            <label>is option correct</label>
            <select className="w3-input w3-border w3-round" ref={isCorrect}>
              <option value="false">false</option>
              <option value="true">true</option>
            </select>
            <br />
            <label>correct option</label>
            <input
              className="w3-input w3-border w3-round"
              ref={correctOption}
            />
            <br />

            <button
              onClick={handleOptionSubmission}
              className="w3-button w3-border w3-round"
            >
              Submit Option
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateQuestions;
