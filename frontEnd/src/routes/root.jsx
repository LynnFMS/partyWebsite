import { NavLink, Outlet } from "react-router-dom";

export default function Root() {
    return(
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-green-400 text-right bg-auto">
        <div>
            <header>
                <h1 className="text-center text-white font-bold text-6xl font-serif">Drago's Moonwalks</h1>
                <h3 className="text-center text-white font-bold text-2xl my-4 font-serif">Parties Fundraisers and Family Reunions</h3>
            </header>
            <main className="p-4">
                {/*button*/}
                <NavLink to="/inventory">
                    <button className="bg-yellow-600 hover:bg-white hover:text-yellow-600 text-white font-bold py-1 px-4 rounded-full mr-2" >Inventory</button> 
                </NavLink>
                <NavLink to="/booking">
                    <button className="bg-yellow-600 hover:bg-white hover:text-yellow-600 text-white font-bold py-1 px-4 rounded-full mr-2">Bookings & Availability</button>
                </NavLink>
                <NavLink to="/login">
                <button className="bg-red-600 hover:bg-white hover:text-red-600 text-white font-bold py-1 px-4 rounded-full">Admin</button>
                </NavLink>
            <img 
                className="rounded-sm absolute top-6 left-6 w-60 h-auto sm:w-40 md:w-40 lg:w-52 xl:w-60"
                src="https://media.discordapp.net/attachments/1303146516294270996/1309332345635213394/image.png?ex=67413245&is=673fe0c5&hm=d27f00db3f87f1b7e08a3dedc6adc2daf61d9a7f8df0d4ffff33135f82e01f42&=&format=webp&quality=lossless&width=372&height=352"
                alt="Dragon Picture"></img>
            </main>
            
            <main className="text-left m-14 flex flex-col">
                <NavLink to="/all">
                    <button className="bg-yellow-600 text-white rounded-full w-40 transition-transform transform hover:scale-105 hover:bg-white hover:text-yellow-600 m-1 mt-10 font-bold">All</button>
                </NavLink>
                <NavLink>
                    <button className="bg-yellow-600 text-white rounded-full w-40 transition-transform transform hover:scale-105 hover:bg-white hover:text-yellow-600 m-1 font-bold">Category</button>
                </NavLink>
                <NavLink>
                    <button className="bg-yellow-600 text-white rounded-full w-40 transition-transform transform hover:scale-105 hover:bg-white hover:text-yellow-600 m-1 font-bold">Category</button>
                </NavLink>
                <NavLink>
                    <button className="bg-yellow-600 text-white rounded-full w-40 transition-transform transform hover:scale-105 hover:bg-white hover:text-yellow-600 m-1 font-bold">Category</button>
                </NavLink>
                <NavLink>
                    <button className="bg-yellow-600 text-white rounded-full w-40 transition-transform transform hover:scale-105 hover:bg-white hover:text-yellow-600 m-1 font-bold">Category</button>
                </NavLink>
            </main>
            <Outlet></Outlet>
        </div>

    </div>
    )
}