import React, { useState, useRef } from "react";

import "./file__upload.css";

export default function FileUpload({ uploadFiles, clearAll }) {
  const [files, setFiles] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const inputRef = useRef();
  const btnRef = useRef();

  const handleFile = (e) => {
    let filesize = 10500000; // 10mb in bytes
    let newFileType = false;
    let fileType;
    setErrorMsg(null);
    if (e.target.files[0].type === "") {
      fileType = e.target.files[0].name.split(".").pop();
      newFileType = true;
    }

    if (newFileType) {
      if (fileType !== "txt" && fileType !== "csv") {
        inputRef.current.value = null;
        setErrorMsg(
          window.strings.Dashboard_invalidFileType ||
            "Invalid file type, please upload only csv, txt format"
        );
      }
    }
    if (!newFileType) {
      if (
        e.target.files[0].type !== "text/csv" &&
        e.target.files[0].type !== "text/plain"
      ) {
        inputRef.current.value = null;
        setErrorMsg(
          window.strings.Dashboard_invalidFileType ||
            "Invalid file type, please upload only csv, txt format"
        );
      }
    }
    try {
      if (e.target.files[0].size > filesize) {
        setErrorMsg(
          window.strings.Dashboard_maximumFileSize ||
            "Your file size is over limit. Max upload size is 10MB"
        );
        inputRef.current.value = null;
      } else {
        setFiles(e.target.files);
      }
    } catch (e) {
      inputRef.current.value = null;
      console.log("file does not exist");
    }
  };

  const handleFileUpload = () => {
    if (files) {
      btnRef.current.disabled = true;
      uploadFiles(files);
    } else {
      setErrorMsg(
        window.strings.Dashboard_fileDoesNotExist || "File does not exist"
      );
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
          <input
            type="file"
            accept="csv,text/plain"
            onChange={handleFile}
            ref={inputRef}
          />
        </div>
      </div>
      {errorMsg && (
        <div className="text-center">
          <p className="text-danger">
            <b>{errorMsg}</b>
          </p>
        </div>
      )}
      <div className="row">
        <div className="col">
          <button
            className="btn btn-primary btn-block mt-4"
            onClick={handleFileUpload}
            ref={btnRef}
          >
            {window.strings.Dashboard_upload || "Upload"}
          </button>
        </div>
        <div className="col">
          <button className="btn btn-info btn-block mt-4" onClick={clearUpload}>
            {window.strings.Dashboard_clear || "Clear"}
          </button>
        </div>
      </div>
    </>
  );
}
