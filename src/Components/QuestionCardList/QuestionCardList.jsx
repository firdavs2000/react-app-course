import { QuestionCard } from '../../Components/QuestionCard/QuestionCard';
import cls from "./QuestionCardList.module.css";

export const QuestionCardList = ({ cards }) => {
    return (
        <div className={cls.cardList}>
            {cards.map((card, index) => (
                <QuestionCard card={card} key={index} />
            ))}
        </div>
    );
};

