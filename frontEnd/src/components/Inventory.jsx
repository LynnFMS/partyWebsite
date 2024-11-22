import {useEffect, useState} from "react";

export default function Inventory() {
    const [inventory, setInventory] = useState([])
    const [error, setError] = useState("");

    useEffect(() => {
        try { //fetch inventory data
            async function fetchInventory() {
                const url = "http://localhost:3000/inventory";
        
                const response = await fetch(url);
                const results = await response.json();
                setInventory(results);
                console.log(results);
            }
            fetchInventory();
        } catch (error) {
            setError(error.message);
        }
    }, [])//empty array means that the code should only run once

    //this case must be present in order to allow inventory to load in
    if (!Array.isArray(inventory.inventoryItems)) {
        return <div class="text-center">No inventory available</div>; // Handle non-array case gracefully (map() is not a function)
      }
    return(
        <div>
            {error && <p>Error: {error}</p>}
            <div>
                {inventory.inventoryItems.map((e) => (//react is hungry for keys
                    <div key={e._id}>
                        <h1>{e.name}</h1>
                        <h2>{e.description}</h2>
                        <div>price: ${e.price}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}