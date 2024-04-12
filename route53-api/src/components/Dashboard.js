import React from 'react';
import { Link } from 'react-router-dom';
import TotalItems from './TotalItems';
import ActiveItems from './ActiveItems';
import InactiveItems from './InactiveItems';
import PendingItems from './PendingItems';

const Dashboard = () => {
    // Sample counts for demonstration purposes
    const totalCount = 100;
    const activeCount = 75;
    const inactiveCount = 25;
    const pendingCount = 10;

    return (
        <div className="container mt-4">
            <h1>Dashboard</h1>
            <div className="row mt-4">
                <div className="col-lg-3 col-md-6 mb-4">
                    <div className="card h-100">
                        <div className="card-body">
                            <h2>Domain Count</h2>
                            <p>{totalCount}</p>
                            <Link to="/total-items" className="btn btn-primary">View Details</Link>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6 mb-4">
                    <div className="card h-100">
                        <div className="card-body">
                            <h2>DNS Count</h2>
                            <p>{activeCount}</p>
                            <Link to="/active-items" className="btn btn-primary">View Details</Link>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6 mb-4">
                    <div className="card h-100">
                        <div className="card-body">
                            <h2>Inactive Count</h2>
                            <p>{inactiveCount}</p>
                            <Link to="/inactive-items" className="btn btn-primary">View Details</Link>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6 mb-4">
                    <div className="card h-100">
                        <div className="card-body">
                            <h2>Pending Count</h2>
                            <p>{pendingCount}</p>
                            <Link to="/pending-items" className="btn btn-primary">View Details</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
