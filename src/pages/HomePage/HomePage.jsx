import { useState, useEffect } from "react";
import QuestionCard from "../../Components/QuestionCard/QuestionCard";
import { API_URL } from "../../constans";
// import cls from "./HomePage.module.css";

export const HomePage = () => {
  const [questions, setQuestions] = useState([]);

  const getQuestions = async () => {
    try {
      const response = await fetch(`${API_URL}/react`);
      const questions = await response.json();
      setQuestions(questions);
      console.log("questions", questions);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getQuestions();
  }, []);

  return (
    <>
      {questions.map((card, index) => (
        <QuestionCard card={card} key={index} />
      ))}
    </>
  );
};
