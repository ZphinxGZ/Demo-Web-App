import { useEffect, useState } from 'react';
import './Download.css';

const serverUrl = 'http://localhost:5000';

const Download = () => {
    const [files, setFiles] = useState([]);

    const loadFileList = () => {
        fetch(`${serverUrl}/files`)
            .then(response => response.json())
            .then(setFiles)
            .catch(error => console.error('Error loading file list:', error));
    };

    useEffect(() => {
        loadFileList();
    }, []);

    return (
        <div className="download-container">
            <h2>Files on Server</h2>
            <ul>
                {files.map(file => (
                    <li key={file}>
                        <a href={`${serverUrl}/download/${file}`} download>{file}</a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Download;
