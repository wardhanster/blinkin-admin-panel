import React from "react";
import {
  Container,
  Row,
  Col
} from "reactstrap";

import FileUpload from "../FileUpload";
import SidePreview from "../Table/SidePreview";
import "./recent_card.css";

export default function RecentCard(props) {
  const {
    uploadFiles,
    bytesToSize,
    baseUrl,
    loadNewContent,
    handleClick,
    triggerAfterUpload,
    tags,
  } = props;
  const handleCardTitleClick = (file) => {
    file.actualSizeInKb = bytesToSize(file.file_size);
    file.url = `${baseUrl}${file.file_url}`;
    file.random = Math.random();
    handleClick(<SidePreview data={file} />);
  };

  return (
    <div className="mb-4 mt-2 recent-card">
      <h5 className="text-muted mb-3">
        {window.strings.ML_quickAccess || "Quick access"}
      </h5>
      <Container>
        <Row>
          <Col xs="3">
            <FileUpload
              sideModal={props.sideModal}
              tags={tags}
              toggle={props.toggle}
              uploadFiles={uploadFiles}
              bytesToSize={bytesToSize}
              loadNewContent={loadNewContent}
              triggerAfterUpload={triggerAfterUpload}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
}
