import React, { useState,useEffect } from "react";
import axios from "axios";

import "./Download.css";

const filesDummy = [
  {
    name: "cat.jpg",
    url: "http://localhost:3000/cat.jpg",
  },
  {
    name: "dog.jpg",
    url: "http://localhost:3000/dog.jpg",
  },
  
];
function Download() {
  const [files, setFiles] = useState(filesDummy);

  useEffect(() => {
    fetchFiles();
  }, []);


  const fetchFiles = () => {
    axios.get('http://localhost:3000/files/list').then((res) => {
        setFiles(res.data);
    }).catch((err) => {
        console.log(err);
    });
  }
  return (
    <div className="download-container">
      <h1>Dowload</h1>
      <div className="files-list">
        {files.map((file) => (
            <div className="file" key={Math.random()}>
                <b>{file.name}</b>
                <a href={file.url} target="_blank">
                    <button className="download-button">
                        &darr;
                    </button>
                </a>
            </div>
        ))}
      </div>
    </div>
  );
}

export default Download;
