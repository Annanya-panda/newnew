import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Route53DataTableComponent = () => {
    const [zones, setZones] = useState([]);
    const [formData, setFormData] = useState({ Name: '', CallerReference: '', ResourceRecordSetCount: '', Comment: '', IsPrivate: false });
    const [editMode, setEditMode] = useState(false);
    const [editId, setEditId] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [modalMode, setModalMode] = useState('add'); 
    const baseURI = 'http://localhost:5000';

    useEffect(() => {
        fetchZones();
    }, []);

    const fetchZones = async () => {
        try {
            const response = await axios.get(baseURI + '/api/zones');
            setZones(response.data.HostedZones || []);
        } catch (error) {
            console.error('Error fetching zones:', error);
        }
    };

    const fetchZoneByZoneId = async (zoneId) => {
        try {
            const response = await axios.get(baseURI + '/api/zones/' + zoneId);
            var detailedZone = response.data.HostedZone;
            setFormData({ Name: detailedZone.Name, CallerReference: detailedZone.CallerReference, ResourceRecordSetCount: detailedZone.ResourceRecordSetCount, Comment: detailedZone.Config.Comment, IsPrivate: detailedZone.Config.PrivateZone });
            console.log(response);
        } catch (error) {
            console.error('Error fetching zones:', error);
        }
    };

    const generateCallerReference = () => {
        return Date.now().toString();
    };

    const handleCreateOrUpdateZone = async () => {
        try {
            let response;
            if (editMode) {
                response = await axios.put(`${baseURI}/api/zones/${editId}`, formData);
            } else {
                const formDataWithCallerReference = { ...formData, CallerReference: generateCallerReference() };
                response = await axios.post(`${baseURI}/api/zones`, formDataWithCallerReference);
            }
            console.log('API Response:', response.data);
            console.log('Zone created/updated');
            fetchZones();
            setEditMode(false);
            setEditId(null); 
            setFormData({ Name: '', CallerReference: '', ResourceRecordSetCount: '', Comment: '', IsPrivate: false });
            setShowModal(false); 
        } catch (error) {
            console.error('Error creating/updating zone:', error);
        }
    };

    const handleEditZone = async (zone) => {
        const zoneId = zone.Id.split('/')[2];
        fetchZoneByZoneId(zoneId);
        setEditMode(true);
        setEditId(zoneId);
        setModalMode('edit'); 
        setShowModal(true);
    };

    const handleDeleteZone = async (id) => {
        try {
            const zoneId = id.split('/')[2];
            await axios.delete(baseURI + `/api/zones/${zoneId}`);
            console.log('Zone deleted from AWS Route 53');

            const updatedZones = zones.filter(zone => zone.Id !== id);
            setZones(updatedZones);
            console.log('Zone deleted from the UI');
        } catch (error) {
            console.error('Error deleting zone:', error);
        }
    };

    const handleOpenModal = (mode, zone = null) => {
        if (mode === 'add') {
            setModalMode('add');
            setEditMode(false); 
            setEditId(null);
            setFormData({ Name: '', CallerReference: '', ResourceRecordSetCount: '', Comment: '', IsPrivate: false });
        } else {
            setModalMode('edit');
            setEditMode(true);
            setEditId(zone.Id.split('/')[2]);
            fetchZoneByZoneId(zone.Id.split('/')[2]);
        }
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <div className="container mt-4">
            <h1>Route 53 Zones</h1>
            <button className="btn btn-primary" onClick={() => handleOpenModal('add')}>Add Zone</button>
            <table className="table table-bordered mt-3">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Caller Reference</th>
                        <th>Resource Record Set Count</th>
                        <th>Comment</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {zones.map((zone) => (
                        <tr key={zone.Id.split('/')[2]}>
                            <td>
                                <a href="#" onClick={() => handleEditZone(zone)}>{zone.Name}</a>
                            </td>
                            <td>{zone.CallerReference}</td>
                            <td>{zone.ResourceRecordSetCount}</td>
                            <td>
                                {zone.Config.Comment}
                                {zone.Config.PrivateZone ? <span style={{ color: 'green' }}> (Private)</span> : <span style={{ color: 'red' }}> (Public)</span>}
                            </td>
                            <td>
                                <button className="btn btn-primary" onClick={() => handleEditZone(zone)}>Edit</button>
                                <button className="btn btn-danger" onClick={() => handleDeleteZone(zone.Id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

          
            {showModal && (
                <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{modalMode === 'add' ? 'Add Zone' : 'Edit Zone'}</h5>
                                <button type="button" className="close" onClick={handleCloseModal} aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label>Name:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={formData.Name}
                                        onChange={(e) => setFormData({ ...formData, Name: e.target.value })}
                                        placeholder='Name'
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Caller Reference:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={formData.CallerReference}
                                        onChange={(e) => setFormData({ ...formData, CallerReference: e.target.value })}
                                        placeholder='Caller Reference'
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Resource Record Set Count:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={formData.ResourceRecordSetCount}
                                        onChange={(e) => setFormData({ ...formData, ResourceRecordSetCount: e.target.value })}
                                        placeholder='Resource Record Set Count'
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Comment:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={formData.Comment}
                                        onChange={(e) => setFormData({ ...formData, Comment: e.target.value })}
                                        placeholder='Comment'
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Is Private:</label>
                                    <div>
                                        <label>
                                            <input
                                                type="radio"
                                                value={true}
                                                checked={formData.IsPrivate === true}
                                                onChange={(e) => setFormData({ ...formData, IsPrivate: true })}
                                            />
                                            Yes
                                        </label>
                                        <label>
                                            <input
                                                type="radio"
                                                value={false}
                                                checked={formData.IsPrivate === false}
                                                onChange={(e) => setFormData({ ...formData, IsPrivate: false })}
                                            />
                                            No
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Close</button>
                                <button type="button" className="btn btn-primary" onClick={handleCreateOrUpdateZone}>{modalMode === 'add' ? 'Add Zone' : 'Update Zone'}</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Route53DataTableComponent;