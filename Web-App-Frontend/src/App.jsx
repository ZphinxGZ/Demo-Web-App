import './App.css';
import Download from './component/Download/Download';
import Upload from './component/Upload/Upload';
import { useState } from 'react';

function App() {
    const [reload, setReload] = useState(false);

    return (
        <div className="app-container">
            <div className="component-box">
                <Upload onUploadSuccess={() => setReload(!reload)} />
            </div>
            <div className="component-box">
                <Download key={reload} />
            </div>
        </div>
    );
}

export default App;
