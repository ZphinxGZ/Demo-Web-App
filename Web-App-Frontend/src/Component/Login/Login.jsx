import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserAndPass from '../../../public/Users';
import './Login.css';

function Login({ onLoginSuccess }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = () => {
        const user = UserAndPass.find(user => user.username === username && user.password === password);
        if (user) {
            onLoginSuccess();
            navigate('/');
        } else {
            setError('Incorrect username or password');
        }
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <h2>Login</h2>
                <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button onClick={handleLogin}>Login</button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button onClick={() => navigate('/register')}>Register</button>
            </div>
        </div>
    );
    
}

export default Login;