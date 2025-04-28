import React from 'react';
import UserTable from './components/usertable';
import FileUploader from './components/fileuploader';
import FileDownloader from './components/filedownloader';

function App() {
  return (
    <div className="p-4">
      <UserTable />
      {/* <hr />
      <FileUploader />
      <hr />
      <FileDownloader /> */}
    </div>
  );
}

export default App;