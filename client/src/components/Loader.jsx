// components/Loader.jsx
import React from 'react'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const Loader = () => {

    const { nextUrl } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (nextUrl) {
            setTimeout(() => {
                navigate('/' + nextUrl)
            }, 8000);
        }
    }, [])

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
    )
}

export default Loader
