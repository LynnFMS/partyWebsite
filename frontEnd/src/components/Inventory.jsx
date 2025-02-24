import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen/index";
import {useEffect, useState} from "react";
import { useParams } from "react-router-dom";

export default function Inventory() {
    const cloudinary = new Cloudinary({
        cloud: { cloudName: "dowgufc1f" }
    });

    const [inventory, setInventory] = useState([]);
    const [error, setError] = useState("");
    const { category } = useParams();

    useEffect(() => {
        async function fetchInventory() {
            let url = "http://localhost:3000/inventory";
            if (category) {
                url = `http://localhost:3000/inventory/category/${category}`;
            }
            try {
            const response = await fetch(url);
            const results = await response.json();
            setInventory(results.inventoryItems);
            } catch (error) {
                setError("Error fetching inventory");
                console.error(error);
            }
        }
        fetchInventory();
    }, [category]);

    if (!Array.isArray(inventory)) {
        return <div className="text-white font-bold text-center">No inventory available</div>;
    }

    return (
        <div className="p-6">
            {error && <p>Error: {error}</p>}
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
                {inventory.map((item) => (
                    <div className="bg-white rounded-xl shadow-lg p-4 flex flex-col items-center" key={item._id}>
                        <AdvancedImage
                            className="sm:h-32 sm:w-32 md:h-36 md:w-36 lg:h-40 lg:w-40 xl:self-center lg:self-center md:self-center sm:self-center rounded-xl border-2 border-solid border-black"
                            cldImg={cloudinary.image(item.public_id)}
                        />
                        <div className="text-black font-serif font-bold sm:text-xs md:text-sm lg:text-sm text-center p-2">{item.title}</div>
                        <div className="text-black font-serif font-bold sm:texyt-xs md:text-sm lg:text-sm text-center">Price: ${item.price}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}
