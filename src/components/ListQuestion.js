import { useState, useEffect } from "react";
import { db } from "./data/firebbase-config";
import { useNavigate } from 'react-router-dom';
import { collection, getDocs } from "@firebase/firestore";
import "./pages/ListQuestion.css"


export default function ListQuestion() {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const questionsCollectionRef = collection(db, "Question");


  
  useEffect(() => {
    const getQuestions = async () => {
      const querySnapshot = await getDocs(questionsCollectionRef);
      const data = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setQuestions(data);
    };
    getQuestions();
  }, [questionsCollectionRef]);

  return (
    <div className="ListQuestion">
          <table className="sytled-table">
        <thead>
          <tr>
            <th style={{textAlign: "center"}}>Question ID</th>
            <th style={{textAlign: "center"}}>Question</th>
            <th style={{textAlign: "center"}}>Level</th>
            <th style={{textAlign: "center"}}>Correct Answer ID</th>
            <th style={{textAlign: "center"}}>Subject ID</th>
            <th style={{textAlign: "center"}}>Creator ID</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((question) => (
            <tr key={question.id}>
              <td>{question.questionID}</td>
              <td>{question.question}</td>  
              <td>{question.level}</td>
              <td>{question.correctAnswerID}</td>
              <td>{question.subjectID}</td>
              <td>{question.creatorID}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}