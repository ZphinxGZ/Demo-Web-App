import './App.css';
import Download from './component/Download/Download';
import Upload from './component/Upload/Upload';
import { useState } from 'react';

function App() {
    const [reload, setReload] = useState(false);

    return (
        <>
            <Upload onUploadSuccess={() => setReload(!reload)} />
            <Download key={reload} />
        </>
    );
}

export default App;
