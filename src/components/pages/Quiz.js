import React, { useEffect, useReducer, useState } from "react";
import Answers from "../Answers";
import MiniPlayer from "../MiniPlayer";
import ProgressBar from "../ProgressBar";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useQuestions from "../../hooks/useQuestions";
import _ from 'lodash'
import {useAuth} from '../../contexts/AuthContext'
import { getDatabase, ref, set } from "firebase/database";

const initialState = null;
const reducer = (state, action)=>{
  switch(action.type){
    case "questions":
      action.value.forEach(question =>{
        question.options.forEach(option => {
          option.checked = false;
        })
      });
      return action.value;

    case "answer":
      const questions = _.cloneDeep(state)
      questions[action.questionId].options[action.optionIndex].checked = action.value;
      return questions;

      default:
        return state;
  }
}

const Quiz = () => {
  const {id} = useParams();
  const {loading, error, questions} = useQuestions(id)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const location = useLocation();
  // const { videoTitle } = location.state;
  console.log(location.state);

  const [qna, dispatch] = useReducer(reducer, initialState)
  const {currentUser} = useAuth();
  const navigator = useNavigate();
  
  useEffect(()=>{
    dispatch({
      type: "questions",
      value: questions
    })
  }, [questions])

  const handleAnswerChange = (e, index)=>{
    dispatch({
      type: "answer",
      questionId: currentQuestion,
      optionIndex : index,
      value: e.target.checked
    })
  }

  const handleNextQuestion = ()=>{
    if(currentQuestion + 1 < questions.length){
      setCurrentQuestion(prevCurrent => prevCurrent + 1)
    }
  }

  const handlePrevQuestion = ()=>{
    if(currentQuestion >= 1 && currentQuestion <= questions.length){
      setCurrentQuestion(prevCurrent => prevCurrent - 1)
    }
  }

  const percentage = questions.length > 0 ? ((currentQuestion + 1)/ questions.length)*100 : 0


  const submitQuiz = async()=>{
    const {uid} = currentUser;
    const db = getDatabase();
    const resultRef = ref(db, `result/${uid}`)
    
    await set(resultRef, {
      [id]:qna
    });

    navigator(`/result/${id}`, {state:{qna}})
  }

  return (
    <>
      {error && <div>There was an error!</div>}
      {loading && <div>loading....</div>}
      {!loading && qna.length === 0 && <div>No data found!</div>}

      {!loading && qna.length >0 && 
      <>
      <h1>{qna[currentQuestion].title}</h1>
      <h4>Question can have multiple answers</h4>
      <Answers input={true} options={qna[currentQuestion].options} handleAnswerChange={handleAnswerChange}/>
      <ProgressBar  next={handleNextQuestion} prev={handlePrevQuestion} progress={percentage} submit={submitQuiz}/>
      <MiniPlayer id={id} title={''}/>
      </>}
    </>
  );
};

export default Quiz;
