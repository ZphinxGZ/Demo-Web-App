import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserAndPass, { saveUser } from '../../../public/Users';

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isRegistered, setIsRegistered] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (isRegistered) {
            setTimeout(() => navigate('/login'), 2000);
        }
    }, [isRegistered, navigate]);

    const handleRegister = () => {
        const userExists = UserAndPass.some(user => user.username === username);
        if (userExists) {
            setMessage('Username already exists');
        } else {
            const newUser = { username: username, password: password };
            // setMessage("Registration successful.");
            UserAndPass.push(newUser);
            localStorage.setItem('UserAndPass', JSON.stringify(UserAndPass));
            saveUser(newUser); // Save user to Users.js
            setMessage('Registration successful. You will be redirected to the login page in 2 seconds.');
            setIsRegistered(true);
        }
    };

    return (
        <div className="register-container">
            <h2>Register</h2>
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleRegister}>Register</button>
            {message && <p>{message}</p>}
        </div>
    );
}

export default Register;
