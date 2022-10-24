import React from "react";
import styled from "styled-components";
import SearchAndAdd from "../../../modules/hr/components/searchAndAdd";

const StyledComponentHead = styled.div``;

const ComponentHead = ({
  children,
  buttonText = "Add",
  openModalOrLink = () => {},
  search = () => {},
  rightContent,
  hideSearch,
  searchFields,
  searchFromView,
  ...rest
}) => {
  return (
    <StyledComponentHead {...rest}>
      <SearchAndAdd
        {...{
          hideSearch,
          search,
          buttonText,
          openModalOrLink,
          children: rightContent,
          searchFields,
          searchFromView,
        }}
      />
      {children}
    </StyledComponentHead>
  );
};

export default ComponentHead;
