import axios from "../utils/axiosCustomeize";
const postCreateNewUser = (email, password, username, role, image) => {
  const data = new FormData();
  data.append("email", email);
  data.append("password", password);
  data.append("username", username);
  data.append("role", role);
  data.append("userImage", image);
  console.log("check form", data);
  return axios.post(`api/v1/participant`, data);
};
const getAllUsers = () => {
  return axios.get(`api/v1/participant/all`);
};
const putUpdateUser = (id, username, role, image) => {
  const data = new FormData();
  data.append("id", id);
  data.append("username", username);
  data.append("role", role);
  data.append("userImage", image);
  return axios.put(`api/v1/participant`, data);
};

const deleteUser = (userId) => {
  return axios.delete(`api/v1/participant`, { data: { id: userId } });
};

const getUserWithPaginate = (page, limit) => {
  return axios.get(`api/v1/participant?page=${page}&limit=${limit}`);
};
const postLogin = (userEmail, userPassword, delay) => {
  return axios.post(`api/v1/login`, {
    email: userEmail,
    password: userPassword,
    delay: 5000,
  });
};
const postRegister = (email, password, username) => {
  return axios.post(`api/v1/register`, { email, password, username });
};
const getQuizByUser = () => {
  return axios.get("api/v1/quiz-by-participant");
};
const getDataQuiz = (id) => {
  return axios.get(`api/v1/quiz-with-qa/${id}`);
};

const postSubmitQuiz = (data) => {
  return axios.post(`api/v1/quiz-submit`, { ...data });
};

const postCreateNewQuiz = (description, name, difficulty, quizImage) => {
  const data = new FormData();
  data.append("description", description);
  data.append("name", name);
  data.append("difficulty", difficulty);
  data.append("quizImage", quizImage);
  return axios.post(`api/v1/quiz`, data);
};

const getAllQuiz = () => {
  return axios.get(`api/v1/quiz/all`);
};

const putUpdateQuiz = (id, description, name, difficulty, quizImage) => {
  const data = new FormData();
  data.append("id", id);
  data.append("description", description);
  data.append("name", name);
  data.append("difficulty", difficulty);
  data.append("quizImage", quizImage);
  return axios.put(`api/v1/quiz`, data);
};

const deleteQuiz = (quizId) => {
  return axios.delete(`api/v1/quiz/${quizId}`);
};

const postCreateNewQuestionForQuiz = (quiz_id, description, questionImage) => {
  const data = new FormData();
  data.append("quiz_id", quiz_id);
  data.append("description", description);
  data.append("questionImage", questionImage);
  return axios.post(`api/v1/question`, data);
};

const postCreateNewAnswerForQuiz = (
  description,
  correct_answer,
  question_id
) => {
  return axios.post(`api/v1/answer`, {
    description,
    correct_answer,
    question_id,
  });
};

export {
  postCreateNewUser,
  getAllUsers,
  putUpdateUser,
  deleteUser,
  getUserWithPaginate,
  postLogin,
  postRegister,
  getQuizByUser,
  getDataQuiz,
  postSubmitQuiz,
  postCreateNewQuiz,
  getAllQuiz,
  putUpdateQuiz,
  deleteQuiz,
  postCreateNewQuestionForQuiz,
  postCreateNewAnswerForQuiz,
};
