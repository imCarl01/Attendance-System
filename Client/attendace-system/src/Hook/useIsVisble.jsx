import React, { useEffect, useState } from 'react'


const useIsVisble = (ref) => {
    const [isInterseting, setIntersecting] = useState(false)

    useEffect(()=>{
        if(!ref.current) return;
        const observer = new IntersectionObserver(([entry])=>{
            setIntersecting(entry.isIntersecting)
        })

        observer.observe(ref.current);
        return ()=>{
            observer.disconnect();
        };
    },[ref]);

    return isInterseting;
}

export default useIsVisble