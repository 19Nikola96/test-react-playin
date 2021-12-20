import React from 'react'
import '../Loading/Loading.css'

const Loading = () => {
    return (
        <div className="loading-box">            
            <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
        </div>
    )
}

export default Loading
