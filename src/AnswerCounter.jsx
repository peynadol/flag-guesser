export default function AnswerCounter(props) {
  return (
    <>
      <p className="answer-counter">
        Flag {props.questionNumber} of {props.questionAmount}
      </p>
    </>
  );
}
