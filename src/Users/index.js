import React, { useState, useEffect, useRef } from "react";

import UTable from "../utils/UTable";
import Loader from "../utils/Loader";
import UserModal from "./UserModal";
import snackBar from "../utils/Snackbar";

const initial = {
  loading: false,
  responseData: null,
  perPage: 10,
  pageNum: 1,
  refresh: false,
  searchTerms: null,
  clearAll: false
};

export default function Users({
  fetchAPI,
  fetchUserById,
  updateUserData,
  deleteUsers
}) {
  let [activeModal, setActiveModal] = useState(false);
  let [userData, setUserData] = useState(null);
  let [modalLoading, setModalLoading] = useState(false);
  let [refresh, setRefresh] = useState(false);
  let [snackbarShow, setSnackbarShow] = useState(false);
  let [msg, setMsg] = useState(null);
  let [showFilter, setShowFilter] = useState(false);
  let [clearAll, setClearAll] = useState(false);
  let initialLoadRef = useRef(true);

  let [main, setMain] = useState(initial);

  const callAPI = async (loading = false) => {
    initialLoadRef.current = false;
    if (loading) {
      setMain({ ...main, loading: true });
    }
    const { pageNum, perPage, searchTerms } = main;
    let res = await fetchAPI(perPage, pageNum, searchTerms);
    try {
      setMain({ ...main, loading: false, responseData: res });
    } catch (e) {
      handleResponseError(res.error);
    }
  };

  useEffect(() => {
    if (clearAll) {
      callAPI();
      setClearAll(false);
    }
  }, [clearAll]);

  useEffect(() => {
    if (initialLoadRef.current) {
    } else {
      callAPI();
    }
  }, [main.perPage, refresh]);

  useEffect(() => {
    if (main.searchTerms) {
      callAPI();
    }
  }, [main.searchTerms]);

  useEffect(() => {
    if (initialLoadRef.current) {
    } else {
      callAPI(false);
    }
  }, [main.pageNum]);

  useEffect(() => {
    callAPI(true);
  }, []);

  const handlePerPage = value => {
    setMain({ ...main, perPage: value });
  };

  const handlePageNumberSubmit = pageNum => {
    setMain({ ...main, pageNum });
  };

  const handleUserView = async id => {
    setActiveModal(activeModal => !activeModal);
    setModalLoading(true);
    let user = await fetchUserById(id);
    if (user.success) {
      setUserData(user.data);
      setModalLoading(false);
    }
  };

  const handleResponseError = msg => {
    setMsg(msg);
    setSnackbarShow(true);
    setTimeout(() => {
      setMsg(null);
      setSnackbarShow(false);
    }, 1000);
  };

  const updateUserDetails = async (id, data) => {
    setModalLoading(true);
    let res = await updateUserData(id, data);
    if (res) {
      setModalLoading(false);
      setActiveModal(false);
      setRefresh(refresh => !refresh);
      setMsg("Updated Successfully");
      setSnackbarShow(true);
      setTimeout(() => {
        setMsg(null);
        setSnackbarShow(false);
      }, 1000);
    }
  };

  const toggleModal = val => {
    setActiveModal(val);
  };

  const handleDelete = async (ids, callback) => {
    let deleteRes = await deleteUsers(ids);
    if (deleteRes.success) {
      setRefresh(refresh => !refresh);
      setMsg("Deleted Successfully");
      setSnackbarShow(true);
      setTimeout(() => {
        setMsg(null);
        setSnackbarShow(false);
      }, 1000);
      callback();
    } else {
      setMsg("Failed");
      setSnackbarShow(true);
      setTimeout(() => {
        setMsg(null);
        setSnackbarShow(false);
      }, 1000);
    }
  };

  const handleFilterSubmit = data => {
    setShowFilter(true);
    // setSearchTerms(data);
    setMain({ ...main, searchTerms: data });
  };

  const handleClear = () => {
    // setSearchTerms(null);
    setMain({ ...main, searchTerms: null });
    setClearAll(true);
  };

  return (
    <>
      {main.loading ? (
        <Loader />
      ) : (
        <UTable
          data={main.responseData}
          perPageCount={main.perPage}
          handlePerPage={handlePerPage}
          handlePageNumberSubmit={handlePageNumberSubmit}
          handleUserView={handleUserView}
          handleDelete={handleDelete}
          showFilter={showFilter}
          handleFilterSubmit={handleFilterSubmit}
          handleClear={handleClear}
        />
      )}
      {activeModal && (
        <UserModal
          active={activeModal}
          userDetails={userData}
          toggleModal={toggleModal}
          modalLoading={modalLoading}
          updateUserDetails={updateUserDetails}
        />
      )}
      {snackbarShow && <div>{snackBar(snackbarShow, msg)}</div>}
    </>
  );
}
