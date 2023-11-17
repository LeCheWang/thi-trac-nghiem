import { useState, useEffect } from "react";
import { db } from "./data/firebbase-config";
import { useNavigate } from 'react-router-dom';
import { collection, getDocs } from "@firebase/firestore";
import "./pages/ListQuestion.css";

export default function ListExam() {
  const [exams, setExams] = useState([]);
  const examsCollectionRef = collection(db, "Exams");

  useEffect(() => {
    const getExams = async () => {
      const querySnapshot = await getDocs(examsCollectionRef);
      const data = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setExams(data);
    };
    getExams();
  }, [examsCollectionRef]);

  const formatTime = (time) => {
    if (time && time.seconds) {
      const date = new Date(time.seconds * 1000);
      return date.toLocaleTimeString();
    }
    return "";
  };

  return (
    <div className="ListQuestion">
      <table className="styled-table">
        <thead>
          <tr>
            <th style={{ textAlign: "center" }}>Tên đề thi</th>
            <th style={{ textAlign: "center" }}>Ngày thi</th>
            <th style={{ textAlign: "center" }}>Môn thi</th>
            <th style={{ textAlign: "center" }}>Thời gian bắt đầu</th>
            <th style={{ textAlign: "center" }}>Thời gian kết thúc</th>
            <th style={{ textAlign: "center" }}>Tổng số câu hỏi</th>
            <th style={{ textAlign: "center" }}>Dễ</th>
            <th style={{ textAlign: "center" }}>Bình thường</th>
            <th style={{ textAlign: "center" }}>Khó</th>
          </tr>
        </thead>
        <tbody>
          {exams.map((exam) => (
            <tr key={exam.NameExam}>
              <td>{exam.NameExam}</td>
              <td>{exam.DateExam}</td>
              <td>{exam.SubjectID}</td>
              <td>{formatTime(exam.TimeStart)}</td>
              <td>{formatTime(exam.TimeFinish)}</td>
              <td>{exam.NumQuestions}</td>
              <td>{exam.NumEasy}</td>
              <td>{exam.NumNormal}</td>
              <td>{exam.NumDifficult}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}