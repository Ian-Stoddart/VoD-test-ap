import { Outlet } from "react-router-dom";

function BasePage() {
    return(
        <div className="base-page">
            <h1>BASE PAGE</h1>
            <Outlet />
        </div>
    )
}

export default BasePage