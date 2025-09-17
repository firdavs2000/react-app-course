import { useActionState } from "react";
import cls from "./EditQuestionPage.module.css";
import { Loader } from "../../Components/Loader";
import { QuestionForm } from "../../components/QuestionForm";
import { delayFn } from "../../helpers/delayFn";
import { dateFormat } from "../../helpers/dateFormat";
import { API_URL } from "../../constans";
import { toast } from "react-toastify";

const editCardAction = async (_prevState, formData) => {
  try {
    await delayFn();

    // Form ma'lumotlarini obyektga aylantirish
    const newQuestion = Object.fromEntries(formData);
    const resources = newQuestion.resources.trim();
    const isClearForm = newQuestion.clearForm;
    const questionId = newQuestion.questionId;

    // So‘rov yuborish
    const response = await fetch(`${API_URL}/react/${questionId}`, {
      method: "PATCH",
      body: JSON.stringify({
        question: newQuestion.question,
        answer: newQuestion.answer,
        description: newQuestion.description,
        resources: resources?.length ? resources.split(",") : [],
        level: Number(newQuestion.level),
        completed: false,
        editDate: dateFormat(new Date()),
      }),
    });

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

export const EditQuestion = ({ initialState = {} }) => {
  const [formState, formAction, isPending] = useActionState(
    editCardAction,
    { ...initialState, clearForm: false }
  );

  return (
    <>
      {isPending && <Loader />}

      <h1 className={cls.formTitle}>Edit question</h1>

      <div className={cls.formContainer}>
        <QuestionForm
          formAction={formAction}
          state={formState}
          isPending={isPending}
          submitBtnText="Edit Question"
        />
      </div>
    </>
  );
};

