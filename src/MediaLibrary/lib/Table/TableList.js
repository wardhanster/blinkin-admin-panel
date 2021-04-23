import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";

export default function TableList(props) {
  let {
    preview,
    fileList,
    bytesToSize,
    icons,
    copyClipBoard,
    deleteApi,
  } = props;

  return fileList.map((file, index) => {
    let filesize = bytesToSize(file.file_size);
    return (
      <tr key={index}>
        <th scope="row" color="primary" className="table_header_filename">
          <i className={icons(file.file_extension)} aria-hidden="true"></i>
          <span
            className="file_name_preview"
            onClick={() => preview(file, filesize)}
            title={file.upload_name}
          >
            {file.upload_name}
          </span>
        </th>
        <td>{file.uploader_name}</td>
        <td>{file.file_extension}</td>
        <td>{filesize}</td>
        <td>{file.created_at}</td>
        <td>
          <i
            title="Copy Url"
            onClick={() => copyClipBoard(file.file_url)}
            className="fa fa-clone copy-icon"
            aria-hidden="true"
          ></i>
          <i
            title="Delete"
            onClick={() => deleteApi(file)}
            className="fa fa-trash text-danger"
            aria-hidden="true"
          ></i>
        </td>
      </tr>
    );
  });
}
