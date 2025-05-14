export default function AnswerCounter(props) {
  return (
    <div className="flex justify-center items-center mb-4">
      <p className="answer-counter">
        Flag {props.questionNumber} of {props.questionAmount}
      </p>
    </div>
  );
}
