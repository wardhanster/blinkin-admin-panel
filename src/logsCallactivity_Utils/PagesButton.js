import React from "react";
import { Button, ButtonGroup } from "reactstrap";

const PagesButton = props => {
  let pagesButton = [];
  const { data, setData, getAPI, parameters, setLoading } = props;

  if (data !== null) {
    const { current_page, last_page } = data;

    const changePage = pageNo => {
      setLoading(true);
      (async () => {
        const res = await getAPI(pageNo + "&" + parameters);

        setData(res);
        setLoading(false);
      })();
    };
    if (current_page !== 1) {
      pagesButton.push(
        <Button
          color="light"
          className="border"
          onClick={() => {
            changePage(current_page - 1);
          }}
        >
          {"<"}
        </Button>
      );
    }
    let startPage = 1,
      lastPage = last_page;
    if (current_page - 5 > 0) {
      startPage = current_page - 5;
    }
    if (startPage + 10 <= last_page) {
      lastPage = startPage + 10;
    }
    for (let i = startPage; i <= lastPage; i++) {
      pagesButton.push(
        <Button
          key={`pagesbutton_${i}`}
          color={current_page === i ? "primary" : null}
          className="border"
          onClick={() => {
            changePage(i);
          }}
        >
          {i}
        </Button>
      );
    }
    if (current_page !== last_page)
      pagesButton.push(
        <Button
          key={`pageBtn_${current_page}`}
          color="light"
          className="border"
          onClick={() => {
            changePage(current_page + 1);
          }}
        >
          {">"}
        </Button>
      );
  }
  return <ButtonGroup>{pagesButton}</ButtonGroup>;
};

export default PagesButton;
