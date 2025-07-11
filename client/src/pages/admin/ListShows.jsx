import React, { useEffect, useState } from 'react'
import { dummyShowsData } from '../../assets/assets'
import Loader from '../../components/Loader'
import Title from '../../components/admin/Title'
import { dateFormat } from '../../lib/dateformat'

const ListShows = () => {
    const currency = import.meta.env.VITE_CURRENCY
    const [shows, setShows] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const getAllShows = async () => {
        try {
            setShows([{
                movie: dummyShowsData[0],
                showDateTime: "2025-07-10T09:55:00.000Z",
                showPrice: 59,
                occupiedSeats: {
                    A1: "user_1",
                    B1: "user_2",
                    C1: "user_3"
                }
            }]);
            setIsLoading(false);
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getAllShows();
    }, []);

    if (isLoading) return <Loader />

    return (
        <>
            <Title text1="List" text2="Shows" />
            <div className='max-w-4xl mt-6 overflow-x-auto no-scrollbar'>
                <table className='w-full min-w-[700px] border-collapse rounded-md overflow-hidden text-nowrap'>
                    <thead className='text-center'>
                        <tr className="bg-primary/20 text-center text-white">
                            <th className='p-2 font-medium pl-5'>Movie Name</th>
                            <th className='p-2 font-medium'>Show Time</th>
                            <th className='p-2 font-medium'>Total Bookings</th>
                            <th className='p-2 font-medium'>Earnings</th>
                        </tr>
                    </thead>
                    <tbody className='text-sm text-center font-light'>
                        {shows.map((show, index) => (
                            <tr key={index} className='border-b border-primary/10 bg-primary/5 even:bg-primary/10'>
                                <td className='p-2 min-w-45 pl-5'>{show.movie.title}</td>
                                <td className='p-2'>{dateFormat(show.showDateTime)}</td>
                                <td className='p-2'>{Object.keys(show.occupiedSeats).length}</td>
                                <td className='p-2'>{currency} {Object.keys(show.occupiedSeats).length * show.showPrice}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default ListShows