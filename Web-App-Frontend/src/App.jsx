import './App.css';
import Download from './component/Download/Download';
import Upload from './component/Upload/Upload';
import Login from './component/Login/Login';
import Register from './component/Register/Register';
import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [reload, setReload] = useState(false);

    return (
        <Router>
            <div className="app-container">
                <Routes>
                    <Route path="/login" element={<Login onLoginSuccess={() => setIsLoggedIn(true)} />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/" element={isLoggedIn ? (
                        <>
                            <div className="component-box">
                                <Upload onUploadSuccess={() => setReload(!reload)} />
                            </div>
                            <div className="component-box">
                                <Download key={reload} />
                            </div>
                        </>
                    ) : (
                        <Navigate to="/login" />
                    )} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
