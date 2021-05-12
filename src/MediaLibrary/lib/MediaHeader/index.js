import React, { useState, useRef, useEffect } from "react";

import {
  Row,
  Col,
  InputGroup,
  InputGroupAddon,
  CardBody,
  Button,
  Card,
  Input,
  Form,
  Container,
  FormGroup,
  Label,
} from "reactstrap";
import Multiselect from "react-widgets/lib/Multiselect";

import "react-widgets/dist/css/react-widgets.css";
import DateRange from "../../../utils/DateRange";

import "./media_header.css";

const fileTypes = ["png", "jpeg", "jpg", "pdf", "mp4"];

export default function MediaHeader(props) {
  let { searchCallback, clearSearch, defaultTags } = props;
  let [ filterParams, setFilterParams ] = useState({});
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  let [fileType, setFileType] = useState([]);
  let [searchText, setSearchText] = useState(null);
  const [clear, setClear] = useState(false);
  let [tagVal, setTagVal] = useState([]);

  const fileTypeRef = useRef([]);
  const recentUpdateRef = useRef(false);

  let handleSearchSubmit = () => {
    let searchFilter = { ...filterParams };
    
    if (tagVal.length > 0) {
      searchFilter["tags"] = tagVal;
    }

    let created_at;
    if (startDate) {
      created_at = startDate;
    }

    if (endDate) {
      created_at += " to " + endDate;
    }

    if (created_at) {
      searchFilter = { ...filterParams, created_at };
    }

     console.log(searchFilter,'searchFilter')
    searchCallback(searchFilter);
  };

  let handleClearSearch = () => {
    setSearchText(null);
    setClear(!clear);
    setFilterParams({})
    resetElements(fileTypeRef.current);
    setTagVal([]);
    setFileType([]);
    recentUpdateRef.current = false;
    setClear(true);
    setFilterParams({})
    setStartDate(null)
    setEndDate(null)
    clearSearch();
  };

  useEffect(() => {
    if (
      tagVal.length > 0 ||
      fileType.length > 0 ||
      searchText ||
      recentUpdateRef.current
    ) {
      handleSearchSubmit();
    }
  }, [tagVal, fileType, searchText]);

  let resetElements = (elements) => {
    elements.forEach((element) => {
      if (element.classList.contains("btn-primary")) {
        element.classList.remove("btn-primary");
        element.classList.add("btn-outline-primary");
      }
    });
  };

  let onClear = () => {
    setStartDate(null)
    setEndDate(null)
    setClear(!clear);
  }

  const handleFilterChange = (key, value) => {

    const updatedFilterParams = { ...filterParams, [key]: value };
    console.log(updatedFilterParams)
    setFilterParams(updatedFilterParams);
  }

  const handleDate = (date, type) => {
    if (type === "start") {
      setStartDate(date);
    } else if (type === "end") {
      setEndDate(date);
    }
  };

  let handleNewTag = (value) => {
    if (value.length <= 0) {
      recentUpdateRef.current = true;
    }
    setTagVal(value);
  };

  return (
    <div className="container ml-0 border p-3 mt-3 mw-100 rounded">
       <Row>
       <div className="ml-3 small col-lg-3 mb-2">
                <h3>{ window.strings.Dashboard_filter || "Filters" }</h3>
           </div>
          </Row>
      <Row className="">
          <div className="ml-3 small col-lg-4 mb-2">
            <h6 className="d-flex font-weight-bold text-muted">
              {window.strings.ML_FileName || "File Name"}
            </h6>
            <Input
                placeholder={window.strings.ML_FileName || "File Name"}
                value={filterParams["upload_name"] || ""}
                onChange={(e) => handleFilterChange('upload_name', e.target.value)}
            />
          </div>
          <div className="ml-3 small col-lg-3 mb-2">
            <h6 className="d-flex font-weight-bold text-muted">
              {window.strings.ML_extention || "FileType"}
            </h6>
            <Input type="select" name="FileType" onChange={(e) => handleFilterChange('file_extension', e.target.value)} value={filterParams["file_extension"] || ""} id="FileType">
              <option>Select Type</option>
              {fileTypes.map((type) => (<option key={type} value={type}>{type}</option>))}
            </Input>
          </div>
          <div className="ml-3 small col-lg-3 mb-2">
            <h6 className="d-flex font-weight-bold text-muted">
              {window.strings.ML_uploadedBy || "Uploaded By"}
            </h6>
            <Input
                        placeholder={window.strings.ML_uploadedBy || "Uploaded By"}
                        value={filterParams["uploader_name"] || ""}
                        onChange={(e) => handleFilterChange('uploader_name', e.target.value)}
            />
          </div>
          <div className="ml-3 small col-lg-4 mb-2">
            <h6 className="d-flex font-weight-bold text-muted">
              {window.strings.ML_uplodersEmail || "Uploader's email"}
            </h6>
            <Input
                        placeholder={window.strings.ML_uplodersEmail || "Uploader's email"}
                        value={filterParams["uploader_email"] || ""}
                        onChange={(e) => handleFilterChange('uploader_email', e.target.value)}
            />
          </div>
          <div className="ml-3 small col-lg-3 mb-2">
            <h6 className="d-flex font-weight-bold text-muted">
              {window.strings.ML_uplodedOn || "Uploaded On"}
            </h6>
            <DateRange clear={clear} handleDate={handleDate} onClear={onClear} />
          </div>
          <div className="ml-3 small col-lg-3 mb-2 tags-dropdown-container">
            <h6 className="d-flex font-weight-bold text-muted">
              {window.strings.ML_tags || "Tags"}
            </h6>
            <Multiselect
                      data={defaultTags}
                      onChange={(value) => handleNewTag(value)}
                      value={tagVal}
            />
          </div>
      </Row>
      <div className="row ml-2">
            <InputGroup className="">
              <Button
                color="primary" 
                className="d-flex ml-2"
                size="sm" 
                onClick={handleSearchSubmit}>
                {window.strings.ML_search || "Search"}
              </Button>
              <Button
                className="d-flex ml-3 clearBtn"
                size="sm"
                color="primary"
                onClick={handleClearSearch}
              >
                {window.strings.ML_clear || "Clear"}
              </Button>
            </InputGroup>
           </div>
    </div>
  );
}
