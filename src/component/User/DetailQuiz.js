import { useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { getDataQuiz, postSubmitQuiz } from "../../services/apiServices";
import "./DetailQuiz.scss";
import Question from "./Question";
import { useState } from "react";
import _, { forEach } from "lodash";
import ModalResult from "./ModalResult";
const DetailQuiz = () => {
  const params = useParams();
  const location = useLocation();
  const quizId = params.id;
  const [dataQuiz, setDataQuiz] = useState([]);
  const [index, setIndex] = useState(0);
  const [isShowModalResult, setIsShowModalResult] = useState(false);
  const [dataModalResult, setDataModalResult] = useState({});

  useEffect(() => {
    fetchQuestion();
  }, [quizId]);

  const fetchQuestion = async () => {
    let res = await getDataQuiz(quizId);
    let data = res.DT.qa;
    setDataQuiz(data);
  };

  const handlePrev = () => {
    if (index - 1 < 0) return;
    setIndex(index - 1);
  };

  const handleNext = () => {
    if (dataQuiz && dataQuiz.length > index + 1) setIndex(index + 1);
  };

  const handleFinishQuiz = async () => {
    let payload = { quizId: +quizId, answers: [] };
    let answers = [];
    if (dataQuiz && dataQuiz.length > 0) {
      dataQuiz.forEach((question) => {
        let questionId = +question.id;
        let userAnswerId = [];

        question.answers.forEach((a) => {
          if (a?.isSelected === true) {
            userAnswerId.push(a.id);
          }
        });
        answers.push({
          questionId,
          userAnswerId,
        });
      });
      payload.answers = answers;

      console.log(">>check payload", payload);
      let res = await postSubmitQuiz(payload);
      if (res && res.EC === 0) {
        setIsShowModalResult(true);
        setDataModalResult({
          countCorrect: res.DT.countCorrect,
          countTotal: res.DT.countTotal,
          quizData: res.DT.quizData,
        });
      } else {
        alert("something wrongs...");
      }
    }
  };
  return (
    <div className="detail-quiz-container">
      <div className="left-content">
        <div className="title">
          Quiz {quizId}: {location?.state?.quizTitle}
        </div>
        <hr />
        <div className="q-body">
          <img />
        </div>
        <div className="q-content">
          <Question
            index={index}
            setDataQuiz={setDataQuiz}
            data={dataQuiz && dataQuiz.length > 0 ? dataQuiz : []}
          />
        </div>
        <div className="footer">
          <button className="btn btn-primary ml-3" onClick={() => handlePrev()}>
            Previus
          </button>
          <button className="btn btn-secondary" onClick={() => handleNext()}>
            Next
          </button>
          <button
            className="btn btn-warning"
            onClick={() => handleFinishQuiz()}
          >
            Finish
          </button>
        </div>
      </div>
      <div className="right-content">connt down</div>
      <ModalResult
        dataModalResult={dataModalResult}
        show={isShowModalResult}
        setShow={setIsShowModalResult}
      />
    </div>
  );
};
export default DetailQuiz;
