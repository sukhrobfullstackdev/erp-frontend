import React, { useCallback, useEffect, useState, memo } from "react";
import styled from "styled-components";
import { get, isArray, isEmpty, isEqual, isNil } from "lodash";
import { DebounceInput } from "react-debounce-input";
import Icon from "../elements/icon";
import Dropdown from "../elements/dropDown";
import Title from "../elements/title";
import Field from "../../containers/Form/field";
import FormDemo from "../../containers/Form/form-demo";
import Flex from "components/elements/flex";

const SearchStyle = styled.div`
  display: flex;

  .dropDown__body {
    z-index: 9;
    left: -50px;
    right: auto;
    top: 40px;
  }

  &:after {
    content: "";
    border-right: 1px solid #e6e8ec;
    min-height: 26px;
    margin: auto;
    margin-left: 10px;
  }

  .icon-search-hr {
    width: 20px !important;
    height: 20px !important;
  }

  .search_input {
    background-color: #fff;
    border: none;
    margin-left: 13px;

    ::placeholder {
      font-weight: 300;
      font-size: 16px;
      line-height: 20px;
      color: #777e91;
    }

    :focus {
      outline: none;
    }
  }

  .drop_btn {
    width: 30px;
    height: 30px;

    .ui__icon__wrapper {
      width: 30px;
      height: 30px;
      border-radius: 8px;
      transition: 0.3s ease;

      &:hover {
        background: #f4f5f6 !important;
      }
    }
  }

  .dropdown {
    padding: 14px 10px;
    background-color: #fff;
    border: 1px solid #f4f5f6;
    border-radius: 6px;
    min-width: 290px;
    max-height: 50vh;
    overflow-y: auto;

    .title {
      color: #777e91;
      font-size: 12px;
      font-weight: 500;
      line-height: 20px;
      margin-bottom: 9px;
    }

    button {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      padding: 5px;
      border-radius: 3px;
      background-color: #fcfcfd;
      color: #353945;
      font-size: 12px;
      border: none;

      :hover {
        background-color: #f4f5f6;
      }

      .rc-checkbox {
        width: 30px;
        height: 14px;

        input {
          width: 30px;
          height: 14px;
        }

        .rc-checkbox-inner {
          width: 30px;
          height: 14px;
          border: 1px solid #b1b5c4;

          ::after {
            background-color: #353945;
            width: 10px;
            height: 10px;
            opacity: 1;
          }

          :hover {
            border: none;
          }
        }
      }

      .rc-checkbox-checked {
        .rc-checkbox-inner {
          border: 1px solid #45b36b;

          ::after {
            background-color: #fcfcfd;
            left: 16px;
          }
        }
      }
    }
  }

  .exitBtn {
    display: flex;
    align-items: center;
    animation: ${({ value }) => (value ? "showAnim" : "hideAnim")} 0.1s forwards;
  }
  .check-all {
    .rc-checkbox {
      &-inner {
        &:after {
          background-color: #353945;
          opacity: 1;
        }
      }
    }
  }
`;

const Search = ({
  searchFields = [],
  searchFromView = () => {},
  search = "",
  changeSearchHandling = () => "",
  searchingColumns = [],
}) => {
  const [value, setValue] = useState(null);
  const [initialValue, setInitialValue] = useState(true);
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    setValue(search);
  }, [search]);

  useEffect(() => {
    if (!isNil(searchFields) && !isEmpty(searchFields)) {
      // console.log(searchingColumns);
      setColumns(
        searchFields.map(({ id, type, customField, searchable, name }) => ({
          columnName: id,
          columnType: type,
          checked: true,
          customField,
          searchable,
          name,
        }))
      );
    }
  }, [searchFields]);

  useEffect(() => {
    if (!isNil(value) && !initialValue) {
      searchFromView(
        value,
        columns.filter(({ checked }) => checked)
      );
    }
  }, [value]);

  const getValueFromField = useCallback(
    (data, name) => {
      setColumns(
        columns.map((column) =>
          isEqual(get(column, "columnName"), name)
            ? {
                ...column,
                checked: data,
              }
            : column
        )
      );
    },
    [columns]
  );

  const changeSearch = useCallback((value) => {
    setColumns((columns) =>
      columns.map((column) => {
        column.checked = value;
        return column;
      })
    );
  }, []);

  return (
    <SearchStyle value={value}>
      <Icon icon="icon-search-hr" color="#353945" />
      <DebounceInput
        minLength={1}
        debounceTimeout={1000}
        value={value}
        className="search_input"
        placeholder="Search..."
        type={"text"}
        onChange={(e) => {
          setInitialValue(false);
          setValue(e.target.value);
          changeSearchHandling(e.target.value);
        }}
      />
      <Icon
        icon={"icon-exit"}
        mainClassName={"exitBtn"}
        onClick={() => {
          setValue("");
          changeSearchHandling("");
        }}
      />
      <Dropdown className="drop_btn" button={<Icon icon="icon-bottom-arrow" color="#777E91" />}>
        <div className="dropdown">
          <FormDemo getValueFromField={getValueFromField}>
            <Flex justify={"space-between"} align={"center"}>
              <Title className="title">SEARCH IN</Title>
              <Field
                type={"checkbox"}
                defaultValue={true}
                name={"all"}
                leftLabel
                switchBtn
                className="check-all"
                onChange={changeSearch}
              />
            </Flex>
            {isArray(columns) &&
              columns.map(
                ({ id, columnName, searchable, checked, name }, index) =>
                  searchable && (
                    <Field
                      key={index + 1}
                      type={"checkbox"}
                      defaultValue={checked}
                      name={name || columnName}
                      inBtn
                      label={name || columnName}
                      switchBtn
                      leftLabel
                    />
                  )
              )}
          </FormDemo>
        </div>
      </Dropdown>
    </SearchStyle>
  );
};

export default memo(Search);
