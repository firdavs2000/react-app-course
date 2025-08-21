import { useState, useEffect, } from "react";
import { API_URL } from "../../constans";
import { QuestionCardList } from "../../Components/QuestionCardList";
import { Loader } from "../../Components/Loader";
import { useFetch } from "../../hooks/useFetch";
import { SearchInput } from "../../Components/SearchInput"
import cls from "./HomePage.module.css";

export const HomePage = () => {
  const [questions, setQuestions] = useState([]);
  const [searchValue, setSearchValue] = useState([]);


  const [getQuestions, isLoading, error] = useFetch(async (url) => {
    const response = await fetch(`${API_URL}/${url}`);
    const questions = await response.json();

    setQuestions(questions);
    return questions;
  });

  useEffect(() => {
    getQuestions("react");
  }, []);

  const onSearchChangeHandler = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <>
      <div className={cls.controlsContainer}>
        <SearchInput
          value={searchValue}
          onChange={onSearchChangeHandler}
        />
      </div>


      {isLoading && <Loader />}
      {error && <p>{error}</p>}
      <QuestionCardList cards={questions} />
    </>
  );

};

