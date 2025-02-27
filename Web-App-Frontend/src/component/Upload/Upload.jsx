import { useState } from 'react';
import './Upload.css';

const serverUrl = 'http://localhost:5000';

const Upload = ({ onUploadSuccess }) => {
    const [uploadStatus, setUploadStatus] = useState('');

    const uploadFile = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        fetch(`${serverUrl}/upload`, { method: 'POST', body: formData })
            .then(response => response.json())
            .then(data => {
                setUploadStatus(data.message);
                onUploadSuccess();
            })
            .catch(error => console.error('Upload error:', error));
    };

    return (
        <div className="upload-container">
            <h2>Upload File</h2>
            <input type="file" onChange={uploadFile} />
            <p>{uploadStatus}</p>
        </div>
    );
};

export default Upload;
