import {} from "react";
import cls from "./HomePage.module.css"; // CSS fayl kerak bo‘lsa
import { QuestionCard } from "../../Components/QuestionCard/QuestionCard"; // Yo‘lni loyihaga qarab tuzish kerak

export const HomePage = () => {
  return (
    <div className={cls.container}>
      <h2>HomePage</h2>
      <QuestionCard />
    </div>
  );
};
