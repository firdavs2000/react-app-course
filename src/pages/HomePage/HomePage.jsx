import { useState, useEffect } from "react";
import { API_URL } from "../../constans";
import { QuestionCardList } from "../../Components/QuestionCardList";
import { Loader } from "../../Components/Loader";
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
    <Loader />
    <QuestionCardList  cards={questions} />
    </>
  );
};
