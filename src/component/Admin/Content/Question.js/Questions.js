import Select from "react-select";
import { BsPatchMinusFill, BsFillPatchPlusFill } from "react-icons/bs";
import { RiImageAddLine } from "react-icons/ri";
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";
import { useEffect, useState } from "react";
import {
  getAllQuiz,
  postCreateNewAnswerForQuiz,
  postCreateNewQuestionForQuiz,
} from "../../../../services/apiServices";

const Questions = (props) => {
  const [listQuiz, setListQuiz] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState({});
  const sizeIcon = "1.76rem";
  const [questions, setQuestions] = useState([
    {
      id: uuidv4(),
      description: "",
      imageFile: "",
      imageName: "",
      answers: [{ id: uuidv4(), description: "", isCorrect: false }],
    },
  ]);

  const handleAddRemoveQuestion = (type, id) => {
    if (type === "add") {
      const newQuestion = {
        id: uuidv4(),
        description: "",
        imageFile: "",
        imageName: "",
        answers: [{ id: uuidv4(), description: "", isCorrect: false }],
      };
      setQuestions([...questions, newQuestion]);
    }
    if (type === "remove") {
      let questionClone = _.cloneDeep(questions);
      questionClone = questionClone.filter((item) => item.id != id);
      setQuestions(questionClone);
    }
  };

  const handleAddRemoveAnswer = (type, idAnswer, idQuestion) => {
    let questionClone = _.cloneDeep(questions);
    let index = questionClone.findIndex((item) => item.id === idQuestion);
    if (type === "add") {
      const newAnswer = {
        id: uuidv4(),
        description: "",
        isCorrect: false,
      };
      questionClone[index].answers.push(newAnswer);
      setQuestions(questionClone);
    }
    if (type === "remove") {
      questionClone[index].answers = questionClone[index].answers.filter(
        (item) => item.id !== idAnswer
      );
      setQuestions(questionClone);
    }
  };

  const handleOnChange = (type, questionId, value) => {
    if (type === "QUESTION") {
      let questionClone = _.cloneDeep(questions);
      let index = questionClone.findIndex((item) => item.id === questionId);
      if (index > -1) {
        questionClone[index].description = value;
        setQuestions(questionClone);
      }
    }
  };

  const handleOnChangeFileQuestion = (questionId, event) => {
    let questionClone = _.cloneDeep(questions);
    let index = questionClone.findIndex((item) => item.id === questionId);
    if (
      index > -1 &&
      event.target &&
      event.target.files &&
      event.target.files[0]
    ) {
      questionClone[index].imageFile = event.target.files[0];
      questionClone[index].imageName = event.target.files[0].name;
      setQuestions(questionClone);
    }
  };

  const handleAnswerQuestion = (type, answersId, questionId, value) => {
    let questionClone = _.cloneDeep(questions);
    let index = questionClone.findIndex((item) => item.id === questionId);
    if (index > -1) {
      questionClone[index].answers = questionClone[index].answers.map(
        (answer) => {
          if (answer.id === answersId) {
            if (type === "CHECKBOX") {
              answer.isCorrect = value;
            }
            if (type === "INPUT") {
              answer.description = value;
            }
          }
          return answer;
        }
      );
      setQuestions(questionClone);
    }
  };

  const handleQuestionSubmit = async () => {
    console.log("click submit ", questions, selectedQuiz);

    //postCreateNewAnswerForQuiz, postCreateNewQuestionForQuiz,
    //submit question
    const createQuestions = questions.map(async (question) => {
      const q = await postCreateNewAnswerForQuiz(
        +selectedQuiz.value,
        question.description,
        question.imageFile
      );
      return q;
    });
    let a = await Promise.all(createQuestions);
    console("check a", a);
    //submit answers
  };

  const fetchListQuiz = async () => {
    let res = await getAllQuiz();
    if (res && res.DT) {
      const newList = res.DT.map((item) => {
        return {
          value: item.id,
          label: `${item.id} - ${item.description}`,
        };
      });
      setListQuiz(newList);
    }
  };

  useEffect(() => {
    fetchListQuiz();
  }, []);

  return (
    <div className="w-[97%] mx-auto">
      <div className="text-[20px] font-bold mb-3">Manage Question</div>
      <div className="w-[50%]">
        <Select
          defaultValue={selectedQuiz}
          onChange={setSelectedQuiz}
          options={listQuiz}
          placeholder={"Quiz type..."}
        />
      </div>
      <div className="my-4 text-[16px]">Add question</div>
      {questions &&
        questions.length > 0 &&
        questions.map((item, index) => {
          return (
            <div key={item.id} className="flex flex-col gap-3 mb-5">
              <div className="flex items-center gap-5">
                <div className="relative border-[1px] rounded-lg w-[50%] h-14">
                  <input
                    type="text"
                    id="floating_outlined"
                    className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=""
                    value={item.description}
                    onChange={(event) =>
                      handleOnChange("QUESTION", item.id, event.target.value)
                    }
                  />
                  <label
                    htmlFor="floating_outlined"
                    className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                  >
                    Question {index + 1} description
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <label htmlFor={`${item.id}`} className="cursor-pointer">
                    <RiImageAddLine size={sizeIcon} color="blue" />
                  </label>
                  <input
                    id={`${item.id}`}
                    type={"file"}
                    hidden
                    onChange={(event) =>
                      handleOnChangeFileQuestion(item.id, event)
                    }
                  ></input>
                  <p className="cursor-pointer">
                    {questions[index].imageName
                      ? questions[index].imageName
                      : "0 file is uploaded"}
                  </p>
                  <div className="btn-add flex gap-2">
                    <span
                      onClick={() => handleAddRemoveQuestion("add", item.id)}
                    >
                      <BsFillPatchPlusFill size={sizeIcon} color="green" />
                    </span>
                    {questions.length > 1 && (
                      <span
                        onClick={() =>
                          handleAddRemoveQuestion("remove", item.id)
                        }
                      >
                        <BsPatchMinusFill size={sizeIcon} color="red" />
                      </span>
                    )}
                  </div>
                </div>
              </div>
              {item.answers &&
                item.answers.length > 0 &&
                item.answers.map((answers, index) => {
                  return (
                    <div
                      key={answers.id}
                      className="flex items-center gap-3 ml-5"
                    >
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={answers.isCorrect}
                        onChange={(event) =>
                          handleAnswerQuestion(
                            "CHECKBOX",
                            answers.id,
                            item.id,
                            event.target.checked
                          )
                        }
                      />
                      <div className="relative border-[1px] rounded-lg w-[50%] h-12">
                        <input
                          type="text"
                          className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=""
                          value={answers.description}
                          onChange={(event) =>
                            handleAnswerQuestion(
                              "INPUT",
                              answers.id,
                              item.id,
                              event.target.value
                            )
                          }
                        />
                        <label
                          htmlFor="floating_outlined"
                          className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                        >
                          Answer {index + 1}
                        </label>
                      </div>
                      <div className="flex gap-2">
                        <span
                          onClick={() =>
                            handleAddRemoveAnswer("add", answers.id, item.id)
                          }
                        >
                          <BsFillPatchPlusFill size={sizeIcon} color="green" />
                        </span>
                        {item.answers.length > 1 && (
                          <span
                            onClick={() =>
                              handleAddRemoveAnswer(
                                "remove",
                                answers.id,
                                item.id
                              )
                            }
                          >
                            <BsPatchMinusFill size={sizeIcon} color="red" />
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
            </div>
          );
        })}
      {questions && questions.length > 0 && (
        <div>
          <button
            className="btn btn-warning"
            onClick={() => handleQuestionSubmit()}
          >
            Save Questions
          </button>
        </div>
      )}
    </div>
  );
};
export default Questions;
