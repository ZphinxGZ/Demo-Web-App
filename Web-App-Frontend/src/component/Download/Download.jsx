import { useEffect, useState, useCallback } from 'react';
import Swal from 'sweetalert2';
import './Download.css';

const serverUrl = 'http://localhost:5000';

const Download = () => {
    const [files, setFiles] = useState([]);

    // โหลดรายการไฟล์
    const loadFileList = useCallback(() => {
        fetch(`${serverUrl}/files`)
            .then(response => response.json())
            .then(setFiles);
    }, []);

    useEffect(() => {
        loadFileList();
    }, [loadFileList]);

    // ฟังก์ชันลบไฟล์
    const handleDelete = (fileName) => {
        Swal.fire({
            title: "Are you sure?",
            text: `Do you want to delete "${fileName}"?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete "
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`${serverUrl}/delete/${fileName}`, { method: 'DELETE' })
                    .then(() => {
                        Swal.fire("Deleted!", `"${fileName}" has been deleted.`, "success");
                        loadFileList(); // โหลดรายการไฟล์ใหม่
                    });
            }
        });
    };

    return (
        <div className="download-container">
            <h2>Files on Server</h2>
            <button onClick={loadFileList} className="refresh-button">Refresh</button>
            <ul>
                {files.length > 0 ? (
                    files.map(file => (
                        <li key={file}>
                            <a href={`${serverUrl}/download/${file}`} download>{file}</a>
                            <button className="delete-button" onClick={() => handleDelete(file)}>❌</button>
                        </li>
                    ))
                ) : (
                    <p>No files available.</p>
                )}
            </ul>
        </div>
    );
};

export default Download;
