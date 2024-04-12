import React from 'react';
import { Link } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';

const Sidebar = ({ isOpen, toggleSidebar }) => {
    return (
        <div className={isOpen ? 'sidebar open' : 'sidebar'}>
            <div className="sidebar-header">
                <h3>Menu</h3>
                <FaTimes className="close-icon" onClick={toggleSidebar} />
            </div>
            <ul className="sidebar-links">
                <li>
                    <Link to="/dashboard" onClick={toggleSidebar}>Dashboard</Link>
                </li>
                <li>
                    <Link to="/total-items" onClick={toggleSidebar}>Total Items</Link>
                </li>
                <li>
                    <Link to="/active-items" onClick={toggleSidebar}>Active Items</Link>
                </li>
                <li>
                    <Link to="/inactive-items" onClick={toggleSidebar}>Inactive Items</Link>
                </li>
                <li>
                    <Link to="/pending-items" onClick={toggleSidebar}>Pending Items</Link>
                </li>
                <li>
                    <Link to="/route53" onClick={toggleSidebar}>Route53</Link>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
