import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ApiComponent from './components/ApiComponent';
import About from './components/About';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import TotalItems from './components/TotalItems';
import ActiveItems from './components/ActiveItems';
import InactiveItems from './components/InactiveItems';
import PendingItems from './components/PendingItems';

function App() {
    return (
        <Router>
            <div className="App">
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <Link className="navbar-brand" to="/">Home</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="/about">About</Link>
                            </li>
                        </ul>
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="/dashboard">Dashboard</Link>
                            </li>
                        </ul>
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link" to="/login">
                                    <i className="fas fa-sign-in-alt"></i> Login
                                </Link>
                            </li>
                        </ul>
                    </div>
                </nav>

                <Routes>
                    <Route path="/about" element={<About/>} />
                    <Route path="/" element={<ApiComponent/>} />
                    <Route path="/login" element={<Login/>} />
                    <Route path="/dashboard" element={<Dashboard/>} />
                    <Route path="/total-items" element={<TotalItems/>} />
                    <Route path="/active-items" element={<ActiveItems/>} />
                    <Route path="/inactive-items" element={<InactiveItems/>} />
                    <Route path="/pending-items" element={<PendingItems/>} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
