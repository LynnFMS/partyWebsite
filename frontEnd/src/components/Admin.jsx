import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Admin() {
    const [bookings, setBookings] = useState([]);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {

    const isAuthenticated = sessionStorage.getItem("authenticated");

    if (!isAuthenticated) {
        navigate("/login");
    }

    const fetchBookings = async () => {
        try {
            const response = await fetch("http://localhost:3000/admin");
            const data = await response.json();

            if (response.ok) {
                setBookings(data.bookings);
            } else {
                setMessage("Could not retrieve bookings")
            }
        } catch(error) {
            console.log("Error fetching bookings: ", error)
            setMessage("Error fetching bookings.");
        }
    };
    fetchBookings();
}, [navigate]);

const deleteBooking = async (id) => {
    try {
        const response = await fetch(`http://localhost:3000/admin/${id}`, {
            method: "DELETE",
        });
        const data = await response.json();

        if (response.ok) {
            setBookings((prevBookings) => prevBookings.filter((booking) => booking._id !== id));
            setMessage(data.response);
        } else {
            setMessage("Error deleting booking.")
        }
    } catch(error) {
        console.log("Error deleting booking: ", error)
        setMessage("Error deleting booking");
    }
};

const handleUpdate = async (id) => {
    try {
        const response = await fetch(`http://localhost:3000/admin/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedData),
        });
        const data = await response.json();

        if (response.ok) {
            setBookings((prevBookings) => prevBookings.map((booking) => booking._id === id ? { ...booking, ...updatedData } : booking)
        );
        setMessage(data.response);
        } else {
            setMessage("Error updating booking");
        }
    } catch(error) {
        console.log("Error updating booking: ", error)
        setMessage("Error deleting booking");
    }
}

return (
    <main className="flex flex-col text-center">
        <h1 className="font-serif text-white sm:text-2xl md:text-3xl lg:text-4xl font-bold">Admin Page</h1>
        {message && <p className="font-serif text-white font-bold">{message}</p>}
        <div className="overflow-x-auto mt-6">
            <table>
                <thead>
                    <tr>
                        <th className="px-4 py-2 border-b-2 border-black text-white text-center">Name</th>
                        <th className="px-4 py-2 border-b-2 border-black text-white text-center">Date</th>
                        <th className="px-4 py-2 border-b-2 border-black text-white text-center">Email</th>
                        <th className="px-4 py-2 border-b-2 border-black text-white text-center">Address</th>
                        <th className="px-4 py-2 border-b-2 border-black text-white text-center">Item</th>
                    </tr>
                </thead>
                <tbody>
                    {bookings.length > 0 ? (bookings.map((booking) => (
                        <tr key={booking.id}>
                            <td className="px-4 py-2 border-b-2 border-black text-white">{booking.name}</td>
                            <td className="px-4 py-2 border-b-2 border-black text-white">{new Date(booking.date).toLocaleDateString()}</td>
                            <td className="px-4 py-2 border-b-2 border-black text-white">{booking.email}</td>
                            <td className="px-4 py-2 border-b-2 border-black text-white">{booking.location}</td>
                            <td className="px-4 py-2 border-b-2 border-black text-white">{booking.item}</td>
                            <td className="px-4 py-2 border-b-2 border-black text-white">
                                <button onClick={() => handleUpdate(booking._id, { name: "Updated Name" })}
                                className="bg-blue-500 text-white px-4 py-1 rounded-md">Update</button>
                                <button onClick={() => deleteBooking(booking._id)}
                                className="bg-red-500 text-white px-4 py-1 rounded-md ml-2">Delete</button>
                            </td>
                        </tr>
                    ))
                    ) : (
                        <tr>
                            <td colSpan="4" className="px-4 py-2 text-center border-b-2 border-black text-red-600">No Bookings Found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    </main>
);

};
