import React, { useState } from 'react';

const TotalItems = () => {
    const [data, setData] = useState([
        { id: 1, name: 'John Doe', age: 30 },
        { id: 2, name: 'Jane Smith', age: 25 },
        { id: 3, name: 'Michael Johnson', age: 35 }
    ]);

    const handleEdit = (id) => {
        // Handle edit action (e.g., open edit modal, navigate to edit page)
        console.log('Edit', id);
    };

    const handleDelete = (id) => {
        // Handle delete action (e.g., show confirmation modal, delete item from data)
        console.log('Delete', id);
    };

    return (
        <div className="container mt-4">
            <h1>Total Items</h1>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.age}</td>
                            <td>
                                <button className="btn btn-primary mr-2" onClick={() => handleEdit(item.id)}>Edit</button>
                                <button className="btn btn-danger" onClick={() => handleDelete(item.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button className="btn btn-success" onClick={() => console.log('Add')}>Add</button>
        </div>
    );
};

export default TotalItems;
