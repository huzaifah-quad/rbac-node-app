import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, Routes, Route } from 'react-router-dom';

function Sidebar() {
  const [menuItems, setMenuItems] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return window.location.href = '/login';
    axios.get('http://localhost:4000/menu', {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setMenuItems(res.data));
  }, []);
  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
      <div className="sidebar">
        <nav className="mt-2">
          <ul className="nav nav-pills nav-sidebar flex-column">
            {menuItems.map(item => (
              <li key={item.function_id} className="nav-item">
                <Link to={item.function_url} className="nav-link">
                  <i className={`nav-icon ${item.function_icon}`}></i>
                  <p>{item.function_name}</p>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
}

export default function SidebarMenu() {
  return (
    <>
      <Sidebar />
      <Routes>
        <Route path="/dashboard" element={<h2>Dashboard</h2>} />
        {/* Additional functional routes */}
      </Routes>
    </>
  );
}
