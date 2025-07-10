import React, { useEffect, useState } from 'react'
import Title from '../../components/admin/Title'
import { dummyShowsData } from '../../assets/assets';

const AddShows = () => {
    const currency = import.meta.env.VITE_CURRENCY

    const [nowPlaying, setNowPlaying] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null)
    const [dateTimeSelection, setDateTimeSelection] = useState({})
    const [dateTimeInput, setDateTimeInput] = useState("")
    const [showPrice, setShowPrice] = useState("")

    const fetchNowPlayingMovies = async () => {
        setNowPlaying(dummyShowsData);
    }

    useEffect(() => {
        fetchNowPlayingMovies();
    }, [])

    return (
        <>
            <Title text1="Add" text2="Shows" />
        </>
    )
}

export default AddShows