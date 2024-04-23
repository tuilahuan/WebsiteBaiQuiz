import _ from "lodash";
const Question = (props) => {
  const { data, index, setDataQuiz } = props;

  const question = data[index];
  if (_.isEmpty(data)) {
    return <></>;
  }
  const handleCheckBox = (event, id) => {
    setDataQuiz((prevData) => {
      const updatedData = [...prevData];
      updatedData[index].answers[id].isSelected = event.target.checked;
      return updatedData;
    });
  };
  return (
    <>
      {question.imageFile ? (
        <div className="q-image">
          <img src={`data:image/jpqg;base64,${question.imageFile}`} />
        </div>
      ) : (
        <div className="q-image"></div>
      )}
      <div className="question">
        Question {index + 1}: {question.description}?
      </div>
      <div className="answer">
        {question.answers.map((item, index) => {
          return (
            <div>
              <div key={`answers-${index}`} className="a-child">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={item?.isSelected === true}
                    onChange={(event) => handleCheckBox(event, index)}
                  />
                  <label className="form-check-label">{item.description}</label>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
export default Question;
