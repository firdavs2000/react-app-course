import { Button } from "../Button/Button";
import cls from "./QuestionForm.module.css";


export const QuestionForm = ({ formAction, state, isPending, submitBtnText }) => {
    return (
        <form action={formAction} className={cls.form}>
            <input type="text" name="questionId" defaultValue={state.id} hidden />
            {/* Question */}
            <div className={cls.formControl}>
                <label htmlFor="questionField">Question:</label>
                <textarea
                    defaultValue={state?.question || ""}
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
                    defaultValue={state?.answer || ""}
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
                    defaultValue={state?.description || ""}
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
                    defaultValue={state?.resources || ""}
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
                    defaultValue={state?.level || ""}
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
                    defaultChecked={state?.clearForm || false}
                    aria-label="Clear form after submitting"
                />
                <span>Clear form after submitting?</span>
            </label>

            {/* Submit button */}
            <Button type="submit" isDisabled={isPending}>
                {submitBtnText}
            </Button>
        </form>
    );
};
