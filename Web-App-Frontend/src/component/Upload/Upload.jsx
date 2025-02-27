import React, { useRef } from 'react'
import axios from 'axios';
import './Upload.css'

function Upload() {
    const fileRef = useRef();
    const progressRef = useRef();
    const uploadClick = () => {
        if(fileRef.current.files[0] === undefined){
            return alert('No File Selected')
        }

        //upload file using formdata
        const formData = new FormData();
        formData.append('test', fileRef.current.files[0]);

        //axios
        axios.post('http://localhost:3000/files/upload', formData, {headers: {
            'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: (progressEvent) => {
            progressRef.current.value = Math.round(progressEvent.loaded / progressEvent.total * 100);
        }
        }).then((res) => {
            alert('File Uploaded successfully'); 
        }).catch((err) => {
            alert('Error uploading file');
        }).finally(() => {
            fileRef.current.value = null
            progressRef.current.value = 0
        })
    }

  return (
    <div className='upload-container'>
        <h1>Upload</h1>
        <div className='upload-input'>  
            <input type="file" style={{fontSize: 'large'}} ref={fileRef}/>
            <button className='upload-button' onClick={uploadClick}>&uarr;</button>
        </div>
        <progress className='upload-progress' value={0} max={100} style={{width: '100%'}} ref={progressRef}></progress>
    </div>
  )
}

export default Upload