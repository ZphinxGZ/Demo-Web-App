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
        setLoading(true);
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
            confirmButtonText: "Yes, delete ",
            
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`${serverUrl}/delete/${fileName}`, { method: 'DELETE' })
                    .then(() => {
                        // Swal.fire("Deleted! success", `"${fileName}" has been deleted.`, "success",);
                        Swal.fire({
                            title: "Deleted! Success",
                            text: `"${fileName}" has been deleted.`,
                            icon: "success",
                            didOpen: () => {
                                document.querySelector('.swal2-title').style.color = 'red';
                              }
                        })
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
    const handleDownload = async (file) => {
        try {
            const response = await fetch(`${serverUrl}/download/${file}`, { method: "HEAD" });
    
            if (!response.ok) {
                throw new Error("File not found");
            }
    
            // ถ้าไฟล์มีอยู่ ให้เปิดลิงก์ดาวน์โหลด
            const downloadLink = document.createElement("a");
            downloadLink.href = `${serverUrl}/download/${file}`;
            downloadLink.download = file;
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
        } catch {
            Swal.fire("Error", "Failed to download file. Please try again.", "error");
        }
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
           {files.slice().reverse().map(file => (
    <li key={file}>
        <button className='download-link' onClick={() => handleDownload(file)}>
            {file}
        </button>
        <button className="delete-button" onClick={() => handleDelete(file)}>❌</button>
    </li>
))}
    </ul>
        </div>
    );
};

export default Download;
