import './Upload.css';

function Upload() {
    return (
      <div className="upload-container">
        <h1>Upload</h1>
        <div className="upload-input">
          <input type="file" style={{fontSize: 'large'}}/>
          <button className='upload-button'>&uarr;</button>
        </div>
        <progress value={0} max={100} style={{ width: "100%" }}></progress>
      </div>
    );
}

export default Upload;