import { useActionState } from 'react';
import { Button } from '../../Components/Button/Button';
import cls from './AddQuestionPage.module.css';
import { toast } from 'react-toastify';
import { Loader } from "../../Components/Loader"
import { API_URL } from "../../constans";
import {  delayFn } from "../../helpers/delayFn"
import { QuestionForm } from '../../Components/QuestionForm';


const createCardAction = async (_prevState, formData) => {
    try {
        await delayFn();

        // Form ma'lumotlarini obyektga aylantirish
        const newQuestion = Object.fromEntries(formData);
        const resources = newQuestion.resources?.trim();
        const isClearForm = newQuestion.clearForm === "on";

        // So‘rov yuborish
        const response = await fetch(`${API_URL}/react`, {
            method: "POST",
            body: JSON.stringify({
                question: newQuestion.question,
                answer: newQuestion.answer,
                description: newQuestion.description,
                resources: resources.length ? resources.split(",") : [],
                level: Number(newQuestion.level),
                completed: false,
                editDate: undefined,
            }),
        });

        // 404 holati
        if (response.status === 404) {
            throw new Error("Resource not found (404)");
        }

        const question = await response.json();
        toast.success("New question is successfully created!");

        return isClearForm ? {} : question;

    } catch (error) {
        console.error("Xatolik yuz berdi:", error);
        toast.error(`Error: ${error.message}`);
        return {}; // Xatolik bo‘lsa, forma tozalansin
    }
};

export const AddQuestionPage = () => {
    const [formState, formAction, isPending] = useActionState(createCardAction, { clearForm: true });
    return (
        <>
            {isPending && <Loader />}
            <h1 className={cls.formTitle}>Add new question</h1>
            <div className={cls.formContainer}>
               <QuestionForm formAction={formAction} state={formState} isPending={isPending} submitBtnText=" Add Question "/>
            </div>
        </>
    );
};
export default AddQuestionPage;