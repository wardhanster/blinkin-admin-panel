import React, { useState, useRef } from "react";

import "./file__upload.css";

export default function FileUpload({ uploadFiles, clearAll }) {
  const [files, setFiles] = useState(null);
  const inputRef = useRef();
  const btnRef = useRef();

  const handleFile = (e) => {
    setFiles(e.target.files);
    console.log(e.target.files);
  };

  const handleFileUpload = () => {
    if (files) {
      btnRef.current.disabled = true;
      uploadFiles(files);
    }
  };

  const clearUpload = () => {
    setFiles(null);
    btnRef.current.disabled = false;
    inputRef.current.value = null;
    clearAll();
  };

  return (
    <>
      <div className="file_upload_container">
        <div className="dashed-border">
          <input type="file" onChange={handleFile} ref={inputRef} />
        </div>
      </div>
      <div className="row">
        <div className="col">
          <button
            className="btn btn-primary btn-block mt-4"
            onClick={handleFileUpload}
            ref={btnRef}
          >
            Upload
          </button>
        </div>
        <div className="col">
          <button className="btn btn-info btn-block mt-4" onClick={clearUpload}>
            Clear
          </button>
        </div>
      </div>
    </>
  );
}
