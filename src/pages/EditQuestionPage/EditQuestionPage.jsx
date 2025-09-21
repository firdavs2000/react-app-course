import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { API_URL } from "../../constans";
import { useEffect, useState } from "react";
import { Loader } from "../../Components/Loader";
import { EditQuestion } from "./EditQuestion";

const EditQuestionPage = () => {
  const { id } = useParams();
  const [question, setQuestion] = useState(null);

  const [fetchQuestion, isQuestionLoading] = useFetch(async () => {
    const response = await fetch(`${API_URL}/react/${id}`);
    const data = await response.json();
    setQuestion(data);
  });

  useEffect(() => {
    fetchQuestion();
  }, []);

  return (
    <>
      {isQuestionLoading && <Loader />}
      {question && <EditQuestion initialState={question} />}
    </>
  );
};

export default EditQuestionPage;