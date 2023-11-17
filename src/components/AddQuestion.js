import { useState } from "react";
import { db } from "./data/firebbase-config";
import { collection, addDoc } from "@firebase/firestore";
import "./pages/Button.css"
import "./pages/AddQuestion.css"

export default function AddQuestion() {
  const [newQuestion, setNewQuestion] = useState("");
  const [newLevel, setNewLevel] = useState("");
  const [newSubjectID, setNewSubjectID] = useState("");
  const [answers, setAnswers] = useState([
    { id: 1, text: "", isCorrect: false },
    { id: 2, text: "", isCorrect: false },
    { id: 3, text: "", isCorrect: false },
    { id: 4, text: "", isCorrect: false },
  ]);
  const [correctAnswerID, setCorrectAnswerID] = useState(0);
  
  const handleAnswerChange = (event, id) => {
    const { value } = event.target;
    setAnswers((prevAnswers) =>
      prevAnswers.map((answer) =>
        answer.id === id ? { ...answer, text: value } : answer
      )
    );
  };
  
  const handleCorrectAnswerChange = (event) => {
    const { value } = event.target;
    setCorrectAnswerID(parseInt(value));
  };

  const handleSelectChangeLevel = (event) => {
    setNewLevel(event.target.value);
  };

  const handleSelectChangeSubject = (event) => {
    setNewSubjectID(event.target.value);
  };
  const questionsCollectionRef = collection(db, "Question");

  const createQuestion = async () => {
    await addDoc(questionsCollectionRef, {
      question: newQuestion,
      level: newLevel,
      subjectID: newSubjectID,
      answers: answers,
      correctAnswerID: correctAnswerID,
      
    });
  };

 

  return (
    <div className="AddQuestion">
      <div className="container">
        <form>
          <h3>THÊM CÂU HỎI</h3>
        
      <h2>Nội dung câu hỏi</h2>
      <input
        placeholder="Question"
        onChange={(event) => setNewQuestion(event.target.value)}
      />
      
      <select value={newLevel} onChange={handleSelectChangeLevel}>
        <option value="">Mức độ</option>
        <option value="de">Dễ</option>
        <option value="bt">Trung bình</option>
        <option value="kh">Khó</option>
      </select>
      
      
      
      <select value={newSubjectID} onChange={handleSelectChangeSubject}>
        <option value="">Môn học</option>
        <option value="csdl">Cơ Sở Dữ Liệu</option>
        <option value="ktlt">Kỹ Thuật Lập Trình</option>
        <option value="ctdlvgt">Cấu Trúc Dữ Liệu Và Giải Thuật</option>
        <option value="cnpm">Công Nghệ Phần Mềm</option>
        <option value="ltw">Lập Trình Web</option>
        
      </select>
      <h2>Các đáp án</h2>
      <ul className="nav flex-column">
  {answers.map((answer) => (
    <li className="nav-item" key={answer.id}>
      <div className="input-group-text">
        <input
          type="radio"
          name="radAns"
          className="mr-2"
          aria-label="Radio button for following text input"
          value={answer.id}
          checked={correctAnswerID === answer.id}
          onChange={handleCorrectAnswerChange}
        />
        <input
          type="text"
          className="form-control"
          placeholder="Đáp án"
          aria-label="Text input with radio button"
          name={`ans${answer.id}`}
          value={answer.text}
          onChange={(event) => handleAnswerChange(event, answer.id)}
        />
      </div>
    </li>
  ))}
</ul>
<div className="buttons">
      <button className="blob-btn" onClick={createQuestion}>
        Thêm 
        <span className="blob-btn__inner">
          <span className="blob-btn__blobs">
            <span className="blob-btn__blob"></span>
            <span className="blob-btn__blob"></span>
            <span className="blob-btn__blob"></span>
            <span className="blob-btn__blob"></span>
          </span>
        </span>
      </button>
    </div>
    
        </form>
      </div>
      </div>

  )
}