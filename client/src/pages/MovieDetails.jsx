import React, { useEffect, useState, useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import BlurCircle from '../components/BlurCircle'
import { ArrowRight, Frown, Heart, PlayCircleIcon, StarIcon } from 'lucide-react'
import timeFormat from '../lib/TimeFormat'
import DateSelect from '../components/DateSelect'
import MovieCard from '../components/MovieCard'
import Loader from '../components/Loader'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'

const MovieDetails = () => {
    const { id } = useParams()
    const [show, setShow] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const navigate = useNavigate()

    const { shows, axios, getToken, user, fetchFavoriteMovies, favoriteMovies, image_base_url } = useAppContext()

    const getShow = async () => {
        try {
            const { data } = await axios.get(`/api/show/${id}`, {
                headers: { Authorization: `Bearer ${await getToken()}` }
            })

            if (data.success) {
                setShow(data)
                setIsLoading(false)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleFavorite = async () => {
        try {
            if (!user) return toast.error("Please login to proceed");

            const { data } = await axios.post("/api/user/update-favorite", { movieId: id }, {
                headers: { Authorization: `Bearer ${await getToken()}` }
            })

            if (data.success) {
                await fetchFavoriteMovies()
                toast.success(data.message)
            }
            else {
                toast.error(data.message)
            }

            setIsLoading(false)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getShow()
    }, [id])

    const recommendations = useMemo(() => {
        return shows
            .filter(item => item._id !== id)
            .slice()
            .sort(() => Math.random() - 0.5)
            .slice(0, 6)
    }, [id])

    if (isLoading) return <Loader />

    if (!show) return (
        <div className="flex flex-col items-center justify-center h-screen">
            <Frown className='mb-5 w-10 h-10 md:w-20 md:h-20' />
            <h2 className="text-2xl font-bold">Movie Not Found</h2>
            <button
                onClick={() => { navigate('/movies'); scrollTo(0, 0) }}
                className="mt-4 px-4 pb-2.5 pt-2 bg-primary rounded-md cursor-pointer hover:bg-primary-dull"
            >
                Browse Movies
            </button>
        </div>
    )

    return (
        <div className='px-6 md:px-16 lg:px-40 pt-30 md:pt-50'>
            <div className='flex flex-col md:flex-row gap-8 max-w-6xl mx-auto'>
                <img
                    src={image_base_url + show.movie.poster_path}
                    alt={show.movie.title}
                    className='max-md:mx-auto rounded-xl h-104 max-w-70 object-cover'
                    onError={(e) => {

                    }}
                />

                <div className='relative flex flex-col gap-3'>
                    <BlurCircle top='-100px' left='-100px' />
                    <p className='text-primary'>ENGLISH</p>
                    <h1 className='text-4xl font-semibold max-w-96 text-balance'>{show.movie.title}</h1>
                    <div className='flex items-center gap-2 text-gray-300'>
                        <StarIcon className='w-5 h-5 text-primary fill-primary' />
                        {show.movie.vote_average.toFixed(1)} User Rating
                    </div>
                    <p className='text-gray-400 mt-2 text-sm leading-tight max-w-xl'>{show.movie.overview}</p>
                    <p>
                        {timeFormat(show.movie.runtime)} &bull; {show.movie.genres.map(g => g.name).join(", ")} &bull; {show.movie.release_date.split("-")[0]}
                    </p>

                    <div className='flex items-center flex-wrap gap-4 mt-4'>
                        <button className='flex items-center gap-2 px-7 py-3 text-sm bg-gray-800 hover:bg-gray-900 transition rounded-md font-medium cursor-pointer active:scale-95'><PlayCircleIcon className='w-5 h-5' />Watch Trailer</button>
                        <a href="#dateSelect" className='px-10 py-3 text-sm bg-primary hover:bg-primary-dull transition rounded-md font-medium cursor-pointer active:scale-95'>Buy Tickets</a>
                        <button className='bg-gray-700 p-2.5 rounded-full transition cursor-pointer active:scale-95'>
                            <Heart onClick={handleFavorite} className={`w-5 h-5 ${favoriteMovies.find(movie => movie._id === id) ? 'fill-primary text- primary' : ""} `} />
                        </button>
                    </div>
                </div>
            </div>

            <p className='text-lg font-medium mt-20'>Your Favorite Cast</p>
            <div className="overflow-x-auto no-scrollbar mt-8 pb-4">
                <div className='flex items-start gap-4 w-max px-4'>
                    {show.movie.casts.slice(0, 12).map((cast, index) => (
                        <div key={`cast-${index}`} className='flex flex-col items-center text-center'>
                            <img src={image_base_url + cast.profile_path} alt="" className='rounded-full h-20 md:h-20 aspect-square object-cover' />
                            <p className='font-medium text-xs mt-3 max-w-20'>{cast.name}</p>
                        </div>
                    ))}
                </div>
            </div>

            <DateSelect dateTime={show.dateTime} id={id} />

            <div className='mb-50'>
                <div className='relative w-full flex items-center justify-between pt-20 pb-10'>
                    <BlurCircle top='100px' left="0px" />
                    <p className='font-medium text-lg'>You May Also Like</p>
                    <button onClick={() => { navigate("/movies"); scrollTo(0, 0) }} className='group flex items-center gap-2 text-sm text-gray-300 cursor-pointer'>
                        View All
                        <ArrowRight className='group-hover:translate-x-0.5 transition w-4.5 h-4.5' />
                    </button>
                </div>
                <div className='relative mb-60 flex flex-wrap mx-auto max-w-[857px] justify-center md:justify-start gap-8 mt-8'>
                    <BlurCircle bottom='0px' right="0px" />
                    {recommendations.map((movie, index) => (
                        <MovieCard key={`movie-${index}`} movie={movie} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default MovieDetails