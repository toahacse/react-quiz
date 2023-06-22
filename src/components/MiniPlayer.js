import React, { useRef, useState } from 'react';
import classes from '../styles/MiniPlayer.module.css'
import img from '../assets/images/3.jpg'
import ReactPlayer from 'react-player'

const MiniPlayer = ({id, title}) => {
  const buttonRef = useRef();
  const [status, setStatus] = useState(false)

  const toggleiminiPlayer = ()=>{
      if(status){
          setStatus(false)
          buttonRef.current.classList.add(classes.floatingBtn)
      }else{
          setStatus(true)
          buttonRef.current.classList.remove(classes.floatingBtn)
      }
  }

    return (
        <div className={`${classes.miniPlayer} ${classes.floatingBtn}`} ref={buttonRef} onClick={toggleiminiPlayer}>
          <span className={`material-icons-outlined ${classes.open}`}> play_circle_filled </span>
          <span className={`material-icons-outlined ${classes.close}`} onClick={toggleiminiPlayer}> close </span>
          
          <ReactPlayer
            // className={classes.player}
            url={`https://www.youtube.com/watch?v=${id}`} 
            width="300px"
            height="168px"
            playing={status}
            controls
          />

          <p>{title}</p>
        </div>
    );
};

export default MiniPlayer;