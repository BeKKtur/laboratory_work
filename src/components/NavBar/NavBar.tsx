import {Link} from "react-router-dom";

const AppBar = () => {

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid div nav">
                    <h1 className="navbar-brand m-0">Turtle Pizza Admin</h1>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className='link'>
                            <Link className="button" to='admin/dishes'>Dishes</Link>
                            <Link className="button" to='admin/orders'>Orders</Link>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default AppBar;