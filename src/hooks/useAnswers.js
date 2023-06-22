import { useEffect, useState } from 'react';
import {getDatabase, ref, query, orderByKey,get} from 'firebase/database'

const useAnswers = (videoId) => {
   const [loading, setLoading] = useState(true)
   const [error, setError] = useState(false)
   const [answers, setAnswers] = useState([])

   useEffect(()=>{
        async function fetchAnswers(){
            const db = getDatabase()
            const answerRef = ref(db, 'answers/'+videoId+'/questions')
            const answerQuery = query(answerRef,orderByKey())
            
            try {
                setError(false);
                setLoading(true);
                const snapshot = await get(answerQuery)

                setLoading(false);
                if(snapshot.exists()){
                    setAnswers(Object.values(snapshot.val()))
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

        fetchAnswers()

   },[videoId])

   return {
    loading,
    error,
    answers
   }
};

export default useAnswers;