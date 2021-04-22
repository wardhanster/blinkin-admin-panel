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
    resetElements(fileTypeRef.current);
    setTagVal([]);
    setFileType([]);
    recentUpdateRef.current = false;
    setClear(true);
    setFilterParams({})
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
    <Container className="media_header">
      <Card className="mb-2">
      <CardBody>
      <Row className="media_header_title mb-2 pt-3 justify-content-between">
      <Form>
        <div className="container-fluid search_container">
          <Row>
              <Col md={12}>
                <h3>Filter</h3>
              </Col>
          </Row>
          <Row form>
            <Col md={4}>
              <FormGroup>
                <Label for="exampleEmail">File Name</Label>
                <Input
                        placeholder={window.strings.ML_search || "File Name"}
                        value={filterParams["upload_name"] || ""}
                        onChange={(e) => handleFilterChange('upload_name', e.target.value)}
                      />
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup> 
                <Label for="examplePassword">Extention</Label>
                <Input
                        placeholder={window.strings.ML_search || "Extention"}
                        value={filterParams["file_extension"] || ""}
                        onChange={(e) => handleFilterChange('file_extension', e.target.value)}
                      />
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label for="examplePassword">Uploaded By</Label>
                <Input
                        placeholder={window.strings.ML_search || "Uploaded By"}
                        value={filterParams["uploader_name"] || ""}
                        onChange={(e) => handleFilterChange('uploader_name', e.target.value)}
                      />
              </FormGroup>
            </Col>
          </Row>
          <Row form>
            <Col md={4}> 
              <FormGroup>
                <Label for="exampleEmail">Uploader's email</Label>
                <Input
                        placeholder={window.strings.ML_search || "Uploader's email"}
                        value={filterParams["uploader_email"] || ""}
                        onChange={(e) => handleFilterChange('uploader_email', e.target.value)}
                      />
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label for="examplePassword">Uploaded On</Label>
                <DateRange clear={clear} handleDate={handleDate} />
              </FormGroup>
            </Col>
            <Col md={4}>
                <FormGroup>
                  <Label style={{paddingTop: 0}} sm={12}>{window.strings.ML_tags || "Tags"}</Label>
                  <Col sm={12}>
                    <Multiselect
                      data={defaultTags}
                      onChange={(value) => handleNewTag(value)}
                      value={tagVal}
                    />
                  </Col>
                </FormGroup>
            </Col>
          </Row>
          <Row form>
          <Col md={12}>
            <InputGroup className="">
              <Button color="primary" onClick={handleSearchSubmit}>
                {window.strings.ML_search || "Search"}
              </Button>
              <Button
                className="clearBtn"
                color="primary"
                onClick={handleClearSearch}
              >
                {window.strings.ML_clear || "Clear"}
              </Button>
            </InputGroup>
            </Col>
           </Row>
       </div>
      </Form>

      </Row>
      </CardBody>
      </Card>
    </Container>
  );
}
