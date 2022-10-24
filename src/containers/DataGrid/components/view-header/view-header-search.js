import Search from "components/search";
import React from "react";

const ViewHeaderSearch = ({ searchFields, searchFromView, search, changeSearchHandling, searchingColumns }) => {
  return (
    <Search
      searchFields={searchFields}
      searchFromView={searchFromView}
      search={search}
      changeSearchHandling={changeSearchHandling}
      searchingColumns={searchingColumns}
    />
  );
};

export default ViewHeaderSearch;
