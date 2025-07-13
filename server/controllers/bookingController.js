import Booking from "../models/Booking.js";
import Show from "../models/Show.js";
import stripe from "stripe";

const checkSeatsAvailability = async (showId, selectedSeats) => {
    try {
        const showData = await Show.findById(showId);

        if (!showData) {
            return false;
        }

        const occupiedSeats = showData.occupiedSeats;
        const isAnySeatTaken = selectedSeats.some(seat => occupiedSeats[seat]);
        return !isAnySeatTaken;
    } catch (error) {
        console.log(error.message);
        return false;
    }
}

export const createBooking = async (req, res) => {
    try {
        const { userId } = req.auth();
        const { showId, selectedSeats } = req.body;
        const { origin } = req.headers;
        const isAvailable = await checkSeatsAvailability(showId, selectedSeats);
        if (!isAvailable) {
            return res.json({ success: false, message: "Selected Seats are not available" })
        }

        const showData = await Show.findById(showId).populate('movie');
        const booking = await Booking.create({
            user: userId,
            show: showId,
            amount: showData.showPrice * selectedSeats.length,
            bookedSeats: selectedSeats
        })
        selectedSeats.map((seat) => {
            showData.occupiedSeats[seat] = userId;
        })

        showData.markModified('occupiedSeats');

        await showData.save();

        const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY)

        const formattedDate = new Date(showData.showDateTime).toLocaleString('en-PK', {
            dateStyle: 'medium',
            timeStyle: 'short'
        });


        const line_items = [{
            price_data: {
                currency: 'pkr',
                product_data: {
                    name: showData.movie.title,
                    description: `Showtime: ${formattedDate}`,
                    images: [`https://image.tmdb.org/t/p/original${showData.movie.poster_path}`]
                },
                unit_amount: Math.round(booking.amount * 100)
            },
            quantity: 1
        }]

        const session = await stripeInstance.checkout.sessions.create({
            success_url: `${origin}/loading/my-bookings`,
            cancel_url: `${origin}/my-bookings`,
            line_items: line_items,
            mode: 'payment',
            metadata: {
                bookingId: booking._id.toString()
            },
            expires_at: Math.floor(Date.now() / 1000) + 30 * 60
        })

        booking.paymentLink = session.url

        await booking.save()

        res.json({ success: true, url: session.url })
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message })
    }
}

export const getOccupiedSeats = async (req, res) => {
    try {
        const { showId } = req.params;

        const paidBookings = await Booking.find({
            show: showId,
            isPaid: true
        });

        let occupiedSeats = [];
        paidBookings.forEach(booking => {
            occupiedSeats.push(...booking.bookedSeats);
        });

        res.json({ success: true, occupiedSeats });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
}

export const deleteExpiredUnpaidBookings = async () => {
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);

    try {
        const result = await Booking.deleteMany({
            isPaid: false,
            createdAt: { $lt: oneHourAgo }
        });

        console.log(`[CLEANUP] Deleted ${result.deletedCount} expired unpaid bookings.`);
    } catch (error) {
        console.error('[CLEANUP ERROR]', error.message);
    }
};