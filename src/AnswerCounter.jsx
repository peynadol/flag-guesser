export default function AnswerCounter(props) {
  return (
    <>
      <p>
        {props.questionNumber} of {props.questionAmount}
      </p>
    </>
  );
}
