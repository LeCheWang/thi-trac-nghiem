import { useState } from "react";
import { db } from "./data/firebbase-config";
import { collection, addDoc } from "@firebase/firestore";
import "./pages/Button.css"
import DatePicker from 'react-datepicker'
import "./pages/AddQuestion.css"

export default function AddExam() {
  const [newNameExam, setNewNameExam] = useState("");

  //Dữ liệu date
  const [newDateExam, setNewDateExam] = useState("");
  console.log("date", newDateExam);  

  const [newTimeStart, setNewTimeStart] = useState(new Date());
  const [newTimeFinish, setNewTimeFinish] = useState(new Date());
  const [newNumQuestions, setNewNumQuestions] = useState(0);
  const [newSubjectID, setNewSubjectID] = useState("");
  const [newNumDifficult, setNewNumDifficult] = useState(0);
  const [newNumNormal, setNewNumNormal] = useState(0);
  const [newNumEasy, setNewNumEasy] = useState(0);
 
  const handleSelectChangeSubject = (event) => {
    setNewSubjectID(event.target.value);
  };
  const examCollectionRef = collection(db, "Exams");

  const createExam = async () => {
    await addDoc(examCollectionRef, {
      NameExam: newNameExam,
      DateExam: newDateExam,
      TimeStart: newTimeStart,
      TimeFinish: newTimeFinish,
      NumQuestions: newNumQuestions,
      SubjectID: newSubjectID,
      NumDifficult: newNumDifficult,
      NumNormal: newNumNormal,
      NumEasy: newNumEasy

    });
  };

 

  return (
    <div className="AddExam">
      <div className="container">
        <form>
          <h3>THÊM ĐỀ THI</h3>
          <h2>Tên đề thi:</h2>
          <input
        placeholder="Question"
        onChange={(event) => setNewNameExam(event.target.value)}
      />    
        
      <h2>Chọn ngày thi: {newDateExam}</h2>
      <input type="date" 
      onChange={(event) => setNewDateExam(event.target.value)}></input>

      <h2>Thời gian:</h2>
      <div class="datepicker-container">
  <div class="datepicker-wrapper">
    <DatePicker
      selected={newTimeStart}
      onChange={(date) => setNewTimeStart(date)}
      shouldCloseOnSelect={false}
      showTimeSelect
      showTimeSelectOnly
      timeIntervals={15}
      dateFormat="h:mm aa"
    />
  </div>
  <div class="datepicker-wrapper">
    <DatePicker
      selected={newTimeFinish}
      onChange={(date) => setNewTimeFinish(date)}
      shouldCloseOnSelect={false}
      showTimeSelect
      showTimeSelectOnly
      timeIntervals={15}
      dateFormat="h:mm aa"
    />
  </div>
</div>



      <h2>Tổng số câu:</h2>
      <input
        type="number"
        placeholder="Nhập..."
        onChange={(event) => setNewNumQuestions(Number(event.target.value))}
      />
      <select value={newSubjectID} onChange={handleSelectChangeSubject}>
        <option value="">Môn học</option>
        <option value="csdl">Cơ Sở Dữ Liệu</option>
        <option value="ktlt">Kỹ Thuật Lập Trình</option>
        <option value="ctdlvgt">Cấu Trúc Dữ Liệu Và Giải Thuật</option>
        <option value="cnpm">Công Nghệ Phần Mềm</option>
        <option value="ltw">Lập Trình Web</option>
      </select>

      <h2>Số câu dễ:</h2>
      <input
        type="number"
        placeholder="Nhập..."
        onChange={(event) => setNewNumEasy(Number(event.target.value))}
      />
      <h2>Số câu bình thường:</h2>
      <input
        type="number"
        placeholder="Nhập..."
        onChange={(event) => setNewNumNormal(Number(event.target.value))}
      />
      <h2>Số câu khó:</h2>
      <input
        type="number"
        placeholder="Nhập..."
        onChange={(event) => setNewNumDifficult(Number(event.target.value))}
      />
      
    <div className="buttons">
      <button className="blob-btn" onClick={createExam}>
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