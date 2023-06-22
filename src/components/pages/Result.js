import React from 'react';
import Analysis from '../Analysis';
import Summary from '../Summary';
import { useParams, useLocation } from 'react-router-dom';
import useAnswers from '../../hooks/useAnswers';
import _ from 'lodash'
const Result = (router) => {
    const {id} = useParams();
    const location = useLocation();
    const { qna } = location.state;
  
    const {loading, error, answers} = useAnswers(id)

    const calculate = ()=>{
        let score = 0;
        answers.forEach((question, index1)=>{
            let correctIndexes = [],
                checkedIndexes = [];

            question.options.forEach((option, index2)=>{
                if(option.correct) correctIndexes.push(index2)
                if(qna[index1].options[index2].checked) {
                    checkedIndexes.push(index2)
                    option.checked = true;
                }
            })

            if(_.isEqual(correctIndexes, checkedIndexes)){
                score = score + 5;
            }

        })
        return score;
    }


    return (
        <>
        {error && <div>There was an error!</div>}
        {loading && <div>loading....</div>}
        {!loading && qna.length === 0 && <div>No data found!</div>}

        {answers && answers.length >0 &&
            <>
                <Summary score={calculate()} noq={answers.length}/>
                <Analysis answers={answers}/>
            </>
        }
        </>
    );
};

export default Result;