import React, { useState, useEffect } from 'react';
import './styles/AdminDashboard.css';

const AdminDashboard = () => {
  const [scholarships, setScholarships] = useState([]);
  const [newScholarship, setNewScholarship] = useState({ name: '', description: '', amount: '' });
  const [editScholarship, setEditScholarship] = useState({ id: null, name: '', description: '', amount: '' });

  // Fetch Scholarships
  useEffect(() => {
    const fetchScholarships = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/scholarships`);
        const data = await response.json();
        setScholarships(data);
      } catch (error) {
        console.error('Error fetching scholarships:', error);
      }
    };
    fetchScholarships();
  }, []);

  // Form Handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewScholarship({ ...newScholarship, [name]: value });
  };

  const handleAddScholarship = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/scholarships`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newScholarship),
      });
      const addedScholarship = await response.json();
      setScholarships([...scholarships, addedScholarship]);
      setNewScholarship({ name: '', description: '', amount: '' });
    } catch (error) {
      console.error('Error adding scholarship:', error);
    }
  };

  const handleEditScholarship = (scholarship) => setEditScholarship(scholarship);

  const handleUpdateScholarship = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/scholarships/${editScholarship.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editScholarship),
      });
      const updatedScholarship = await response.json();
      setScholarships(
        scholarships.map((scholarship) =>
          scholarship.id === updatedScholarship.id ? updatedScholarship : scholarship
        )
      );
      setEditScholarship({ id: null, name: '', description: '', amount: '' });
    } catch (error) {
      console.error('Error updating scholarship:', error);
    }
  };

  const handleDeleteScholarship = async (id) => {
    try {
      await fetch(`${process.env.REACT_APP_BACKEND_URL}/scholarships/${id}`, { method: 'DELETE' });
      setScholarships(scholarships.filter((scholarship) => scholarship.id !== id));
    } catch (error) {
      console.error('Error deleting scholarship:', error);
    }
  };

  return (
    <div className="admin-dashboard-container">
      <header className="admin-dashboard-header">
        <h1>Admin Dashboard</h1>
        <p>Shape the future with opportunities that build lives, not destroy them.</p>
      </header>

      <section className="scholarship-list-section">
        <h2>Empowering Scholarships</h2>
        {scholarships.length > 0 ? (
          scholarships.map((scholarship) => (
            <div className="scholarship-card" key={scholarship.id}>
              <div className="card-content">
                <h3>{scholarship.name}</h3>
                <p>{scholarship.description}</p>
                <p className="amount">Funding Amount: ₹{scholarship.amount}</p>
              </div>
              <div className="card-actions">
                <button className="edit-button" onClick={() => handleEditScholarship(scholarship)}>
                  Modify
                </button>
                <button className="delete-button" onClick={() => handleDeleteScholarship(scholarship.id)}>
                  Remove
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No scholarships are currently listed. Be the first to make an impact.</p>
        )}
      </section>

      <section className="add-scholarship-section">
        <h2>Create a Scholarship</h2>
        <form onSubmit={handleAddScholarship} className="scholarship-form">
          <input
            type="text"
            name="name"
            placeholder="Enter Scholarship Name"
            value={newScholarship.name}
            onChange={handleInputChange}
            required
          />
          <textarea
            name="description"
            placeholder="Write a brief description"
            value={newScholarship.description}
            onChange={handleInputChange}
            required
          />
          <input
            type="number"
            name="amount"
            placeholder="Specify Funding Amount"
            value={newScholarship.amount}
            onChange={handleInputChange}
            required
          />
          <button type="submit" className="add-button">
            Add New
          </button>
        </form>
      </section>

      {editScholarship.id && (
        <section className="edit-scholarship-section">
          <h2>Update Scholarship</h2>
          <form onSubmit={handleUpdateScholarship} className="scholarship-form">
            <input
              type="text"
              name="name"
              value={editScholarship.name}
              onChange={(e) => setEditScholarship({ ...editScholarship, name: e.target.value })}
              required
            />
            <textarea
              name="description"
              value={editScholarship.description}
              onChange={(e) => setEditScholarship({ ...editScholarship, description: e.target.value })}
              required
            />
            <input
              type="number"
              name="amount"
              value={editScholarship.amount}
              onChange={(e) => setEditScholarship({ ...editScholarship, amount: e.target.value })}
              required
            />
            <button type="submit" className="update-button">
              Save Changes
            </button>
          </form>
        </section>
      )}
    </div>
  );
};

export default AdminDashboard;
