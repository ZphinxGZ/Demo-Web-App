import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import './Download.css';

const serverUrl = 'http://localhost:5000';

const Download = () => {
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // โหลดรายการไฟล์
    useEffect(() => {
        setLoading(true); // เริ่มโหลด
        fetch(`${serverUrl}/files`)
            .then(response => response.json())
            .then(setFiles)
            .catch(err => setError("Failed to load files. Please try again."))
            .finally(() => setLoading(false)); // จบการโหลด
    }, []); // คำสั่งนี้จะทำงานเมื่อ component ถูก mount ครั้งแรก

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
                        // โหลดรายการไฟล์ใหม่หลังจากลบ
                        setLoading(true); // เริ่มโหลดใหม่
                        fetch(`${serverUrl}/files`)
                            .then(response => response.json())
                            .then(setFiles)
                            .catch(() => Swal.fire("Error", "Failed to refresh file list. Please try again.", "error"))
                            .finally(() => setLoading(false)); // จบการโหลด
                    });
            }
        });
    };

    return (
        <div className="download-container">
            <h2>Files List</h2>
            <button onClick={() => {
                setLoading(true); // เริ่มโหลดเมื่อกด refresh
                fetch(`${serverUrl}/files`)
                    .then(response => response.json())
                    .then(setFiles)
                    .catch(() => Swal.fire("Error", "Failed to refresh file list. Please try again.", "error"))
                    .finally(() => setLoading(false)); // จบการโหลด
            }} className="refresh-button">Refresh</button>
            {loading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
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
