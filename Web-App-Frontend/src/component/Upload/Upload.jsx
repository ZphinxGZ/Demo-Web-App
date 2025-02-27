import { useState } from 'react';
import './Upload.css';

const serverUrl = 'http://localhost:5000';

const Upload = ({ onUploadSuccess }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadStatus, setUploadStatus] = useState('');

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
        setUploadStatus('');
    };

    const uploadFile = () => {
        if (!selectedFile) return alert('Please select a file');

        const confirmUpload = window.confirm(`Are you sure you want to upload "${selectedFile.name}"?`);
        if (!confirmUpload) return;

        const formData = new FormData();
        formData.append('file', selectedFile);

        fetch(`${serverUrl}/upload`, { method: 'POST', body: formData })
            .then(response => response.json())
            .then(data => {
                setUploadStatus(data.message);
                setSelectedFile(null);
                onUploadSuccess();
            })
            .catch(error => console.error('Upload error:', error));
    };

    return (
        <div className="upload-container">
            <h2>Upload File</h2>
            <input type="file" onChange={handleFileChange} />
            <button onClick={uploadFile} disabled={!selectedFile}>Confirm Upload</button>
            <p>{uploadStatus}</p>
        </div>
    );
};

export default Upload;
