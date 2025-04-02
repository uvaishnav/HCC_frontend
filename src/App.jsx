import React from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Analytics from './components/Analytics';
import Calendar from './components/Calendar';
import Settings from './components/Settings';
import './App.css';

function App() {
  return (
    <div className="app">
      <aside className="sidebar">
        <h1 className="app-title">Human Centric Companion</h1>
        <nav>
          <NavLink to="/" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            <i className="icon-home">🏠</i>
            Dashboard
          </NavLink>
          <NavLink to="/analytics" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            <i className="icon-analytics">📊</i>
            Analytics
          </NavLink>
          <NavLink to="/calendar" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            <i className="icon-calendar">📅</i>
            Calendar
          </NavLink>
          <NavLink to="/settings" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            <i className="icon-settings">⚙️</i>
            Settings
          </NavLink>
        </nav>
      </aside>
      
      <main className="main-content">
        <header className="top-header">
          <div className="user-info">
            <h2>Vaishnav Uppalapati</h2>
            <p>Student, GITAM University</p>
          </div>
          <div className="notifications">
            <i className="icon-notification">🔔</i>
          </div>
        </header>
        
        <div className="content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default App;
