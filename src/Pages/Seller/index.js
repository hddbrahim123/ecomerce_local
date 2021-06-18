import React, { useEffect } from 'react'
import { isConnect } from '../../Core/ApiCore/Auth'

const Dashboard = ()=>{

    useEffect(() => {
        isConnect()
            .then(res=>console.log(res))
    }, [])

    return (
        <div>
            Dashboard
        </div>
    )
}

export default Dashboard
