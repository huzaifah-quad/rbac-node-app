import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import SidebarMenu from './components/SidebarMenu';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={<SidebarMenu />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
