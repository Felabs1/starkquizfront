import React, { useState, useRef } from "react";
import Navbar from "../components/Navbar";
import CreateQuiz from "../components/CreateQuiz";
import { useAppContext } from "../provider/AppProvider";
import { Link } from "react-router-dom";
import { bigintToLongAddress, bigintToShortStr } from "../utils/AppUtils";

const CreateQuizPage = () => {
  const [loading, setLoading] = useState(false);
  const { contract, address } = useAppContext();
  const [quiz, setQuiz] = useState(null);
  const title = useRef();
  const description = useRef();
  const quizId = useRef();

  const getQuiz = () => {
    if (contract) {
      const _quizId = quizId.current.value;
      console.log(_quizId);

      const myCall = contract.populate("get_quiz", [_quizId]);
      setLoading(true);
      contract["get_quiz"](myCall.calldata, {
        parseResponse: false,
        parseRequest: false,
      })
        .then((res) => {
          let val = contract.callData.parse("get_quiz", res?.result ?? res);
          console.log(val);
          setQuiz(val);
        })
        .catch((err) => {
          console.error("Error: ", err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  return (
    <div>
      <Navbar />
      <div style={{ width: "40rem" }} className="w3-auto w3-margin">
        <CreateQuiz />

        <h3>Retrieve quiz Id</h3>
        <input className="w3-input w3-border w3-round" ref={quizId} />
        <button className="w3-button w3-border w3-round" onClick={getQuiz}>
          Retrieve
        </button>
        <br />
        <br />
        {quiz && (
          <div className="w3-card w3-padding">
            <span className="w3-large">{quiz.id.toString()}</span>
            <hr />
            <span>{bigintToShortStr(quiz.title)}</span>
            <p>{bigintToShortStr(quiz.description)}</p>
            <Link
              to={`/create-quiz/${quiz.id.toString()}`}
              className="w3-button w3-blue w3-round"
            >
              Visit
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateQuizPage;
