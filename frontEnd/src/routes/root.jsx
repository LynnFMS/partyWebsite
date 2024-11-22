import { NavLink, Outlet } from "react-router-dom";

export default function Root() {
    return(
    <div class="text-center">
        <div>
            <header>
                {/*button*/}
                <NavLink to="/inventory">
                    <button class="btn btn-primary">inventory</button> 
                </NavLink>
                <NavLink to="/admin">
                <button>Admin</button>
                </NavLink>
            </header>
            <Outlet></Outlet>
        </div>
    </div>
    )
}