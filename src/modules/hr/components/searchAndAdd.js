import React, { memo, useEffect } from "react";
import styled from "styled-components";
import Button from "../../../components/elements/button";
import Gridbtn from "../../../components/gridbtn";
import Search from "../../../components/search/search";
import ReactTooltip from "react-tooltip";

const SearchAndAddStyle = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 38px 0 18px;

  .btn {
    display: flex;
  }

  .searchAndAdd__right__btn {
    button {
      padding: 7px 12px 8px 12px;
      font-weight: 500;
      font-size: 14px;
      line-height: 21px;
      text-align: center;
      color: #fcfcfd;
      border-radius: 8px;
      height: 34px;
      text-transform: inherit;
    }
  }
`;

const SearchAndAdd = ({
  buttonText = "Create new role",
  openModalOrLink = () => {},
  positionBtn = false,
  search = "",
  searchFields = [],
  children,
  searchFromView = () => {},
  className = "searchAndAddStyledContainer",
  hideSearch = false,
  changeSearchHandling,
  tip = "",
}) => {
  useEffect(() => {
    // ReactTooltip.rebuild();
  });
  return (
    <SearchAndAddStyle className={className}>
      {tip && <ReactTooltip id="btn" />}
      {!hideSearch && (
        <Search
          {...{
            searchFields,
            search,
            searchFromView,
            changeSearchHandling,
          }}
        />
      )}
      <div className="btn searchAndAdd__right">
        {buttonText && (
          <Button
            className="searchAndAdd__right__btn"
            success
            onCLick={openModalOrLink}
            data-tip={tip}
            data-for="btn"
            data-effect={"solid"}
          >
            {buttonText}
          </Button>
        )}
        {positionBtn && <Gridbtn />}
        {children}
      </div>
    </SearchAndAddStyle>
  );
};

export default memo(SearchAndAdd);
