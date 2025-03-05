import { useState, useRef } from "react";
import "./Upload.css";

const serverUrl = "http://localhost:5000";

const Upload = ({ onUploadSuccess }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setUploadStatus("");

    
    if (file && file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onloadend = () => {
            const img = new Image();
            img.src = reader.result;

            img.onload = () => {
                
                const canvas = document.createElement("canvas");
                const ctx = canvas.getContext("2d");

                
                const MAX_WIDTH = 500;
                const MAX_HEIGHT = 200;

                
                let width = img.width;
                let height = img.height;

                if (width > MAX_WIDTH) {
                    height = (height * MAX_WIDTH) / width;
                    width = MAX_WIDTH;
                }
                if (height > MAX_HEIGHT) {
                    width = (width * MAX_HEIGHT) / height;
                    height = MAX_HEIGHT;
                }

                
                canvas.width = width;
                canvas.height = height;

                
                ctx.drawImage(img, 0, 0, width, height);
                setPreviewUrl(canvas.toDataURL());
            };
        };
        reader.readAsDataURL(file);
    } else {
        setPreviewUrl(null);
    }
};


  const uploadFile = () => {
    if (!selectedFile) return alert("Please select a file");

    const confirmUpload = window.confirm(
      `Are you sure you want to upload "${selectedFile.name}"?`
    );
    if (!confirmUpload) return;

    const formData = new FormData();
    formData.append("file", selectedFile);

    fetch(`${serverUrl}/upload`, { method: "POST", body: formData })
      .then((response) => response.json())
      .then((data) => {
        setUploadStatus(data.message);
        setSelectedFile(null);
        setPreviewUrl(null)
        fileInputRef.current.value = null; 
        onUploadSuccess();
      })
      .catch((error) => console.error("Upload error:", error));
  };

  return (
    <div className="upload-container">
      <h2>Upload File</h2>
      <input
        className="file-upload"
        type="file"
        onChange={handleFileChange}
        ref={fileInputRef}
      />
      {previewUrl ? (
       <div className="preview-container">
       <img src={previewUrl} alt="Preview" className="preview-image" />
   </div>
   
   
      ) : (
        selectedFile && <p>Selected File: {selectedFile.name}</p>
      )}
      <br />
      <button onClick={uploadFile} disabled={!selectedFile}>
        Confirm Upload
      </button>
      <p>{uploadStatus}</p>
    </div>
  );
};

export default Upload;
