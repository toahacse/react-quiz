import { useEffect, useState } from 'react';
import {getDatabase, ref, query, orderByKey,get} from 'firebase/database'

const useQuestions = (videoId) => {
   const [loading, setLoading] = useState(true)
   const [error, setError] = useState(false)
   const [questions, setQuestions] = useState([])

   useEffect(()=>{
        async function fetchQuestions(){
            const db = getDatabase()
            const quizRef = ref(db, 'quiz/'+videoId+'/questions')
            const quizQuery = query(quizRef,orderByKey())
            
            try {
                setError(false);
                setLoading(true);
                const snapshot = await get(quizQuery)

                setLoading(false);
                if(snapshot.exists()){
                    setQuestions(Object.values(snapshot.val()))
                }else{

                }
            } catch (error) {
                console.log(error);
                setError(true);
                setLoading(false);
            }
        }
        
        // setTimeout(() => {
        // }, 2000);

        fetchQuestions()

   },[videoId])

   return {
    loading,
    error,
    questions
   }
};

export default useQuestions;