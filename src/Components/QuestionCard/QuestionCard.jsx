import {} from "react";
import { Button } from "../Button/Button";
import cls from "./QuestionCard.module.css";

export const QuestionCard = () => {
  return (
    <div className={cls.card}>
      {/* Label section */}
      <div className={cls.cardLabels}>
        <div>Level: 1</div>
        <div>Not Completed</div>
      </div>

      {/* Question title */}
      <h5 className={cls.cardTitle}>Что такое JSX?</h5>

      {/* Answer section */}
      <div className={cls.cardAnswers}>
        <label>short answer:</label>
        <p className={cls.cardAnswer}>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corrupti, nobis.
        </p>
      </div>

      {/* View Button */}
      <Button variant="contained" onClick={() => console.log("View clicked")}>
        View
      </Button>
    </div>
  );
};
