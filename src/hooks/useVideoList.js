import { useEffect, useState } from 'react';
import {getDatabase, ref, query, orderByKey,get, startAt, limitToFirst} from 'firebase/database'

const useVideoList = (page) => {
   const [loading, setLoading] = useState(true)
   const [error, setError] = useState(false)
   const [videos, setVideos] = useState([])
   const [hasMore, setHasMore] = useState(true)

   useEffect(()=>{
    async function fetchVideos(){
        const db = getDatabase()
        const videosRef = ref(db, 'videos')
        const videosQuery = query(videosRef,orderByKey(), startAt(String(page)), limitToFirst(4))
        try {
            setError(false);
            setLoading(true);
            const snapshot = await get(videosQuery)

            
            setLoading(false);
            if(snapshot.exists()){
                setVideos((prevVideos)=>{
                    return [...prevVideos, ...Object.values(snapshot.val())]
                })
            }else{
                setHasMore(false)
            }
        } catch (error) {
            console.log(error);
            setError(true);
            setLoading(false);
        }
    }
    
    // setTimeout(() => {
    // }, 2000);

    fetchVideos()
   },[page])

   return {
    loading,
    error,
    videos,
    hasMore
   }
};

export default useVideoList;