import { Link } from "react-router-dom"

const Navbar = () => {
    return (
        <header>
            <div className="container">
                <Link to="/">
                    <h1>Company Employees</h1>
                    <h3>Manage Employees Efficeintly</h3>
                </Link>
            </div>

        </header>
    )
}


export default Navbar