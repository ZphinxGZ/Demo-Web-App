import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserAndPass from '../../../public/Users';
import fs from 'fs';
import path from 'path';

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleRegister = () => {
        const userExists = UserAndPass.some(user => user.username === username);
        if (userExists) {
            setMessage('Username already exists');
        } else {
            const newUser = { username: username, password: password };
            UserAndPass.push(newUser);
            fs.writeFileSync(path.resolve(__dirname, '../../../public/Users.js'), `const UserAndPass = ${JSON.stringify(UserAndPass)};\n\nexport default UserAndPass;`);
            setMessage('Registration successful');
            setTimeout(() => navigate('/login'), 2000);
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
