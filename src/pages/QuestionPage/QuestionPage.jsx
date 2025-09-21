import { useState, useId, useEffect } from "react";
import cls from "./QuestionPage.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { Badge } from "../../Components/Badge";
import { Button } from "../../Components/Button/Button";
import { Loader, SmallLoader } from "../../Components/Loader"
import { API_URL } from "../../constans"
import { useFetch } from "../../hooks/useFetch";
import { useAuth } from "../../hooks/useAuth";


export const QuestionPage = () => {
  const checkboxId = useId();
  const navigate = useNavigate();
  const { id } = useParams();
  const [card, setCard] = useState(null);
  const [isChecked, setIsChecked] = useState(true);
  const { isAuth } = useAuth();

  // Badge variantlari
  const levelVariant = () => {
    if (card.level === 1) return "primary";
    if (card.level === 2) return "warning";
    return "alert";
  };

  const completedVariant = () => {
    return card.completed ? "success" : "primary";
  };

  // Fetch uchun custom hooklar
  const [fetchCard, isCardLoading] = useFetch(async () => {
    const response = await fetch(`${API_URL}/react/${id}`);
    const data = await response.json();
    setCard(data);
  });

  const [updateCard, isCardUpdating] = useFetch(async (isChecked) => {
    const reqData = { completed: isChecked };
    const response = await fetch(`${API_URL}/react/${card.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reqData),
    });
    const data = await response.json();
    setCard(data);
  });

  useEffect(() => {
    fetchCard();
  }, []);

  useEffect(() => {
    card !== null && setIsChecked(card.completed);
  }, [card]);

  const onCheckboxChangeHandler = () => {
    setIsChecked(!isChecked);
    updateCard(!isChecked);
  };

  return (
    <>
      {isCardLoading && <Loader />}

      {card !== null && (
        <div className={cls.container}>
          <div className={cls.cardLabels}>
            <Badge variant={levelVariant()}>Level: {card.level}</Badge>
            <Badge variant={completedVariant()}>
              {isChecked ? "Completed" : "Not Completed"}
            </Badge>

            {card?.editDate && (
              <p className={cls.editDate}>Edited: {card.editDate}</p>
            )}
          </div>

          <h5 className={cls.cardTitle}>{card.question}</h5>
          <p className={cls.cardDescription}>{card.description}</p>

          <div className={cls.cardAnswers}>
            <label>Short answer:</label>
            <p className={cls.cardAnswer}>{card.answer}</p>
          </div>

          <p>Resources:</p>
          <ul className={cls.cardLinks}>
            {card.resources.map((link, index) => (
              <li key={index}>
                <a href={link.trim()} target="_blank" rel="noreferrer">
                  {link.trim()}
                </a>
              </li>
            ))}
          </ul>

          <label htmlFor={checkboxId} className={cls.cardCheckbox}>
            <input
              type="checkbox"
              id={checkboxId}
              className={cls.checkbox}
              checked={isChecked}
              onChange={onCheckboxChangeHandler}
              disabled={isCardUpdating}
            />
            <span>Mark question as completed</span>
            {isCardUpdating && <SmallLoader />}
          </label>

          {isAuth && (
            <Button
              onClick={() => navigate(`/editquestion/${card.id}`)}
              isDisabled={isCardUpdating}
            >
              Edit Question
            </Button>
          )}

          <Button onClick={() => navigate("/")} isDisabled={isCardUpdating}>
            Back
          </Button>
        </div>
      )}
    </>
  );
};
