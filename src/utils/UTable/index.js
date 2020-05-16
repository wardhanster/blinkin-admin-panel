import React, { useState, useEffect } from "react";
import { Collapse } from "reactstrap";

import Paginator from "../Paginator";

import Loader from "../Loader";

import { showMonthDateYear, dateToHowManyAgo } from "../DateHandle";

import DeleteConfirmation from "../DeleteConfirmation";
import Filter from "../../Users/Filter";

import "./utable.css";

export default function UTable({
  data,
  handlePerPage,
  perPageCount,
  handlePageNumberSubmit,
  handleUserView,
  handleDelete,
  handleFilterSubmit,
  showFilter,
  handleClear
}) {
  const [userData, setUserData] = useState(data ? data[0].data : []);
  const [isOpen, setIsOpen] = useState(false);
  const [listId, setListId] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [deleteBtnStatus, setDeleteBtnStatus] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [showLoading, setShowLoading] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  useEffect(() => {
    if (listId.length > 0) {
      setDeleteBtnStatus(false);
    } else {
      setDeleteBtnStatus(true);
    }
  }, [listId]);

  useEffect(() => {
    if (data && data[0].data.length > 0) {
      setUserData(data[0].data);
      setShowLoading(false);
    } else if (data && data[0].data.length === 0) {
      setUserData([]);
      setShowLoading(false);
    }
  }, [data]);

  const handleCheckBox = (id, e) => {
    let knowId = listId.indexOf(id) > -1 ? false : true;
    if (knowId) {
      setListId([...listId, id]);
    } else {
      setSelectAll(false);
      setListId(listId.filter(item => item !== id));
    }
  };
  const handleAllChange = () => {
    if (selectAll) {
      setSelectAll(false);
      setListId([]);
    } else {
      setSelectAll(true);
      let ids = [];
      userData.forEach(user => {
        ids.push(user.id);
      });
      setListId(ids);
    }
  };

  const handleDeleteBtn = () => {
    setDeleteModal(true);
  };

  const showDeleteConfirmation = () => {
    setDeleteModal(false);
  };

  const handleDeleteConfirmation = () => {
    handleDelete(listId);
    setDeleteModal(false);
  };

  const handleFilterbtn = data => {
    setShowLoading(true);
    handleFilterSubmit(data);
  };

  const handleFilterClear = () => {
    setShowLoading(true);
    handleClear();
  };

  const handlePageNumber = num => {
    setShowLoading(true);
    handlePageNumberSubmit(num);
  };

  const handlePerPageBtn = e => {
    setShowLoading(true);
    handlePerPage(e.target.value);
  };

  return (
    <div className="container bg-white mt-2 mb-3">
      <div className="table_container">
        <div className="row mt-3 mb-3">
          <div className="col-10">
            <button className="btn btn-primary btn-sm" onClick={toggle}>
              Filter
            </button>{" "}
            <button
              className="btn btn-danger btn-sm"
              disabled={deleteBtnStatus}
              onClick={handleDeleteBtn}
            >
              Delete
            </button>
          </div>
          <div className="col-2">
            <div className="d-inline">Show </div>
            <div className="d-inline">
              <select
                className="form-control-sm"
                value={perPageCount}
                onChange={handlePerPageBtn}
              >
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
              </select>
            </div>
            <div className="d-inline"> entries</div>
          </div>
        </div>
        <Collapse isOpen={isOpen}>
          <Filter
            handleFilterSubmit={handleFilterbtn}
            handleClear={handleFilterClear}
          />
        </Collapse>
      </div>
      {showLoading ? (
        <Loader />
      ) : (
        <div className="table-responsive utable_container">
          <table className="table-outline mb-0 d-none d-sm-table table table-hover">
            <thead className="thead-light">
              <tr>
                <th className="col-xs-1">
                  <label className="pure-material-checkbox">
                    <input
                      type="checkbox"
                      checked={selectAll}
                      onChange={handleAllChange}
                    />
                    <span></span>
                  </label>
                </th>
                <th>
                  <i className="fa fa-user" aria-hidden="true" /> User
                </th>
                <th>
                  <i className="fa fa-envelope" aria-hidden="true" /> Email
                </th>
                <th className="text-center">
                  <i className="fa fa-globe" aria-hidden="true"></i> Country
                </th>
                <th>
                  <i className="fa fa-plug" aria-hidden="true"></i> IP Address
                </th>
                <th>
                  <i className="fa fa-sign-in" aria-hidden="true"></i> Activity
                </th>
              </tr>
            </thead>
            <tbody>
              {data &&
                userData.map(user => {
                  return (
                    <tr
                      className={
                        listId.indexOf(user.id) > -1 ? "tr__active" : ""
                      }
                      key={user.id}
                    >
                      <td className="col-xs-1">
                        <label className="pure-material-checkbox">
                          <input
                            type="checkbox"
                            checked={
                              listId.indexOf(user.id) > -1 ? true : false
                            }
                            value={user.id}
                            onChange={e => handleCheckBox(user.id, e)}
                          />
                          <span></span>
                        </label>
                      </td>
                      <td onClick={() => handleUserView(user.id)}>
                        <div className="title active__link text-capitalize">
                          {user.name}
                        </div>
                        <div className="small text-muted">
                          {user.position && (
                            <span className="text-capitalize">
                              {user.position} {" | "}
                            </span>
                          )}
                          Registered :{" "}
                          {showMonthDateYear(new Date(user.created_at))}
                        </div>
                      </td>
                      <td className="title">{user.email}</td>
                      <td className="text-center">
                        <i
                          title={user.country}
                          className={`flag-icon flag-icon-${user.country.toLocaleLowerCase()} h4 mb-0`}
                        ></i>
                      </td>
                      <td>
                        {user.last_active_ip ? user.last_active_ip : "NA"}
                      </td>
                      <td>
                        <div className="small text-muted">Last login</div>
                        <strong
                          title={
                            user.last_active_at ? user.last_active_at : "NA"
                          }
                        >
                          {user.last_active_at
                            ? dateToHowManyAgo(user.last_active_at)
                            : "NA"}
                        </strong>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
          {userData && userData.length <= 0 ? (
            <div className="text-center mt-4">
              <p>No results Found</p>
            </div>
          ) : (
            ""
          )}
        </div>
      )}
      <hr />
      {data && (
        <div className="row justify-content-end">
          <div className="col">
            <p className="text-muted">
              <small>
                Page {data[0].current_page} of {data[0].last_page} ({" "}
                {data[0].total} Users)
              </small>
            </p>
          </div>
          <div className="col-auto">
            <Paginator
              maxClickableCells={5}
              paginatorData={data[0]}
              pageNumberSelect={count => handlePageNumber(count)}
            />
          </div>
        </div>
      )}
      {deleteModal && (
        <DeleteConfirmation
          newToggle={showDeleteConfirmation}
          showStatus={deleteModal}
          deleteUser={handleDeleteConfirmation}
        />
      )}
    </div>
  );
}
