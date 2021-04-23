import React, { useState, useEffect, useRef } from "react";
import { Table, Button } from "reactstrap";

import TableList from "./TableList";
import SidePreview from "./SidePreview";
import Loading from "../Loading";
import PagesButton from "../../../logsCallactivity_Utils/PagesButton";

import "./table.css";

let isApiCallSuccess = false;
let initialLoad = true;

const snackBar = (status) => {
  return (
    <div id="snackbar" className={status ? "show" : ""}>
      Copied to Clipboard
    </div>
  );
};

export default function TableItem(props) {
  let {
    fetchAPI,
    fetchPaginationAPI,
    search,
    handleClick,
    bytesToSize,
    icons,
    searchClear,
    perPageCount,
    deleteApi,
  } = props;

  let [activePreviewData, setActivePreviewData] = useState(null);
  let [apicallTimes, setApiCallTimes] = useState(1);
  let [fileList, setFileList] = useState([]);
  let [totalRecords, setTotalRecords] = useState(null);
  let [loading, setLoading] = useState(false);
  let [showMoreDataMsg, setShowMoreDataMsg] = useState(false);
  let [baseUrl, setBaseUrl] = useState(null);
  let bottomRef = useRef(null);
  let pageNumRef = useRef(1);
  let searchFirst = useRef(false);
  let [showSnackBar, setShowSnackBar] = useState(false);
  let [intersect, setIntersect] = useState(false);

  const preview = (file, size) => {
    file.actualSizeInKb = size;
    file.url = `${baseUrl}${file.file_url}`;
    file.random = Math.random();
    setActivePreviewData(file);
  };

  useEffect(() => {
    if (activePreviewData) {
      handleClick(<SidePreview data={activePreviewData} />, () => {
        setActivePreviewData(null);
      });
    }
  }, [activePreviewData]);

  const removeDuplicates = (res, keyItem) => {
    return Array.from(new Set(res.map((a) => a.file_url))).map((file_url) => {
      return res.find((a) => a.file_url === file_url);
    });
  };

  const callAPI = async (search = null) => {
    setLoading(true);
    let finalResp = await fetchAPI(pageNumRef.current, search);
    const { records, baseUrl } = finalResp;
    const data = records.data;
    const total = records.total;
    
    try {
      setBaseUrl(baseUrl);
      if (data.length > 0) {
        setLoading(false);
        isApiCallSuccess = true;
        setTotalRecords(records);

        if (searchFirst.current) {
          searchFirst.current = false;
          let newFileList = [...data];
          setFileList(newFileList);
        } else {
          // setFileList((fileList) => [...fileList, ...data]);
          // Remove duplicates in case if exist
          let newFiles = [...fileList, ...data];
          console.log(newFiles);
          let newfileList = removeDuplicates(newFiles);
          setFileList((fileList) => newfileList);
        }
        if (data.length >= perPageCount) {
          pageNumRef.current++;
        } else {
          setShowMoreDataMsg(true);
        }
      } else {
        isApiCallSuccess = false;

        if (!isApiCallSuccess && pageNumRef.current <= 1) {
          setShowMoreDataMsg(false);
          setLoading(false);
        } else {
          setLoading(false);
          setShowMoreDataMsg(true);
        }
      }
    } catch (e) {
      isApiCallSuccess = false;
      setLoading(false);
      setShowMoreDataMsg(true);
    }

    initialLoad = false;

    try {
      if (data.length > 0) {
      }
    } catch (e) {
      // setShowLoadMoreBtn(false);
    }
  };  

  const callPaginationAPI = async (search = null) => {
    setLoading(true);
    let finalResp = await fetchPaginationAPI(search);
    const { records, baseUrl } = finalResp;
    const data = records.data;
    const total = records.total;
    
    try {
      setBaseUrl(baseUrl);
      if (data.length > 0) {
        setLoading(false);
        isApiCallSuccess = true;
        setTotalRecords(records);

        if (searchFirst.current) {
          searchFirst.current = false;
          let newFileList = [...data];
          setFileList(newFileList);
        } else {
          // setFileList((fileList) => [...fileList, ...data]);
          // Remove duplicates in case if exist
          let newFiles = [...fileList, ...data];
          console.log(newFiles);
          let newfileList = removeDuplicates(newFiles);
          setFileList((fileList) => newfileList);
        }
        if (data.length >= perPageCount) {
          pageNumRef.current++;
        } else {
          setShowMoreDataMsg(true);
        }
      } else {
        isApiCallSuccess = false;

        if (!isApiCallSuccess && pageNumRef.current <= 1) {
          setShowMoreDataMsg(false);
          setLoading(false);
        } else {
          setLoading(false);
          setShowMoreDataMsg(true);
        }
      }
    } catch (e) {
      isApiCallSuccess = false;
      setLoading(false);
      setShowMoreDataMsg(true);

    }

    initialLoad = false;

    try {
      if (data.length > 0) {
      }
    } catch (e) {
      // setShowLoadMoreBtn(false);
    }
  }; 

  useEffect(() => {
    callAPI(search);
  }, [apicallTimes]);

  useEffect(() => {
    if (search || searchClear) {
      setFileList([]);
      setLoading(true);
      setShowMoreDataMsg(false);
      initialLoad = true;
      pageNumRef.current = 1;
      searchFirst.current = true;
      callAPI(search);
    }
  }, [search, searchClear]);

  let loadNext = () => {
    setApiCallTimes((apicallTimes) => apicallTimes + 1);
  };

  let copyClipBoard = async (file) => {
    setShowSnackBar(true);
    let url = `${baseUrl}${file}`;
    window.navigator.clipboard.writeText(url).then(() => {
      setTimeout(() => {
        setShowSnackBar(false);
      }, 1000);
    });
  };

  const getSearchPrams = (searchTerm) => {
    let queryString;
    if (searchTerm) {
      queryString = Object.keys(searchTerm)
        .filter((key) => searchTerm[key] && searchTerm[key].length !== 0)
        .map((key) => key + '=' + searchTerm[key])
        .join('&');
    }

    return queryString;
  }

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
         <div className="table-responsive mt-3 mb-3  ">
            <Table className="table-outline mb-0 d-none d-sm-table table table-hover overflow-auto">
              <thead className="thead-light text-left">
                <tr>
                  <th className="th_name">{window.strings.ML_name || " Name"}</th>
                  <th>{window.strings.ML_uploadedBy || " Uploaded By"}</th>
                  <th>{window.strings.ML_extention || " Extention"}</th>
                  <th>{window.strings.ML_size || " Size"}</th>
                  <th>{window.strings.ML_uploadedAt|| " Uploaded At"}</th>
                  <th>{window.strings.ML_copy || " Copy"}</th>
                </tr>
              </thead>
              <tbody>
                { totalRecords ? totalRecords.data.length !== 0 > 0 && (
                  <TableList
                    icons={icons}
                    fileList={totalRecords.data}
                    preview={preview}
                    bytesToSize={bytesToSize}
                    copyClipBoard={copyClipBoard}
                    deleteApi={deleteApi}
                  />
                ) : (
                  <div className="p-5">
                    {window.strings.Dashboard_noResultFound || "No Result Found"}
                  </div>
                )}
              </tbody>
            </Table>
          </div>
          <div className="d-flex justify-content-between">
            <p className="text-left text-muted total_call_font">
              {window.strings.Dashboard_totalLogs || "Total Records"} :{" "}
              {totalRecords ? totalRecords.total : ""}
            </p>
            <PagesButton
              data={totalRecords}
              setData={setFileList}
              getAPI={callPaginationAPI}
              loading={loading}
              setLoading={setLoading}
              parameters={getSearchPrams(search)}
            />
          </div>
        </>
      )}

      {showMoreDataMsg ? (
        <div className="no_more p-3 border mb-2">
          <p className="text-muted text-center mb-0">
            {window.strings.ML_noMoreResults || "No More Results"}
          </p>
        </div>
      ) : (
        ""
      )}
      <div>{snackBar(showSnackBar)}</div>
      <div ref={bottomRef}></div>
    </>
  );
}
