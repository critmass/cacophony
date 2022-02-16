import React, { useEffect, useState } from "react"

const LoadingScreen = () => {

    const [t, setT] = useState(0)
    useEffect(() => {
        const time = setInterval(() => {
            setT(currentTime => currentTime + 1)
        }, 1200)
        return () => clearInterval(time)
    }, [])
    return (
        <div className="LoadingScreen-container container">
            <div className="row align-items-center">
                <div className="text-center col display-1">
                    Loading{".".repeat(1 + t % 3)}
                </div>
            </div>
        </div>
    )
}

export default LoadingScreen