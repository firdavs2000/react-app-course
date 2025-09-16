import { useActionState } from 'react';
import { Button } from '../../Components/Button/Button';
import cls from './AddQuestionPage.module.css';
import { toast } from 'react-toastify';
import { Loader } from "../../Components/Loader"
import { API_URL } from "../../constans";
import {  delayFn } from "../../helpers/delayFn"


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
                <form action={formAction} className={cls.form}>
                    {/* Question */}
                    <div className={cls.formControl}>
                        <label htmlFor="questionField">Question:</label>
                        <textarea
                            defaultValue={formState?.question || ""}
                            name="question"
                            id="questionField"
                            cols="30"
                            rows="2"
                            required
                            placeholder="Please enter a question"
                        ></textarea>
                    </div>

                    {/* Answer */}
                    <div className={cls.formControl}>
                        <label htmlFor="answerField">Answer:</label>
                        <textarea
                            defaultValue={formState?.answer || ""}
                            name="answer"
                            id="answerField"
                            cols="30"
                            rows="2"
                            required
                            placeholder="Please enter a short answer"
                        ></textarea>
                    </div>

                    {/* Description */}
                    <div className={cls.formControl}>
                        <label htmlFor="descriptionField">Description:</label>
                        <textarea
                            defaultValue={formState?.description || ""}
                            name="description"
                            id="descriptionField"
                            cols="30"
                            rows="5"
                            required
                            placeholder="Please enter a full description"
                        ></textarea>
                    </div>

                    {/* Resources */}
                    <div className={cls.formControl}>
                        <label htmlFor="resourcesField">Resources:</label>
                        <textarea
                            defaultValue={formState?.resources || ""}
                            name="resources"
                            id="resourcesField"
                            cols="30"
                            rows="5"
                            placeholder="Please enter resources separated by commas"
                        ></textarea>
                    </div>

                    {/* Level */}
                    <div className={cls.formControl}>
                        <label htmlFor="levelField">Level:</label>
                        <select
                            name="level"
                            id="levelField"
                            defaultValue={formState?.level || ""}
                            required
                        >
                            <option value="" disabled>
                                Question level
                            </option>
                            <option value="1">1 – easiest</option>
                            <option value="2">2 – medium</option>
                            <option value="3">3 – hardest</option>
                        </select>
                    </div>

                    {/* Clear form checkbox */}
                    <label htmlFor="clearFormField" className={cls.clearFormControl}>
                        <input
                            className={cls.checkbox}
                            type="checkbox"
                            name="clearForm"
                            id="clearFormField"
                            defaultChecked={formState?.clearForm || false}
                            aria-label="Clear form after submitting"
                        />
                        <span>Clear form after submitting?</span>
                    </label>

                    {/* Submit button */}
                    <Button type="submit" isDisabled={isPending}>
                        Add question
                    </Button>
                </form>
            </div>
        </>
    );
};
