import React, { Fragment } from 'react';
import Checkbox from './Checkbox';
import classes from '../styles/Answers.module.css'
const Answers = ({input, options=[],handleAnswerChange}) => {
    return (
        <div className={classes.answers}>
            {
                options.map((option, index) => (
                    <Fragment key={index}>
                        {input ? (
                            <Checkbox 
                                key={index}
                                onChange={(e)=>handleAnswerChange(e, index)} 
                                className={classes.answer} 
                                text={option.title} 
                                value={index} 
                                checked={option.checked}
                            />
                        ) : (
                            <Checkbox 
                                key={index}
                                className={`${classes.answer} ${
                                    option.correct ? 
                                    classes.correct : 
                                    option.checked ? 
                                    classes.wrong : 
                                    null }` 
                                 } 
                                text={option.title} 
                                defaultChecked={option.checked}
                                disabled
                            />
                        )}
                    </Fragment>
                ))
            }
        </div>
    );
};

export default Answers;