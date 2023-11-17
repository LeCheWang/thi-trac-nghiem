import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import AddQuestion from "./components/AddQuestion";
import AddExam from "./components/AddExam";
import ListQuestion from "./components/ListQuestion";
import ListExam from "./components/ListExam";
import Login from "./components/Login";
import LoginStudent from "./components/LoginStudent";
import LoginTeacher from "./components/LoginTeacher";
//import './App.css';
 
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/LoginStudent" Component={LoginStudent} />
        <Route path="/LoginTeacher" Component={LoginTeacher} />
        <Route path="/dashboard" Component={Dashboard} />
        <Route path="/ListQuestion" Component={ListQuestion} />
        <Route path="/AddQuestion" Component={AddQuestion} />
        <Route path="/AddExam" Component={AddExam} />
        <Route path="/ListExam" Component={ListExam} />
      </Routes>
    </BrowserRouter>
  );
}
 
export default App;