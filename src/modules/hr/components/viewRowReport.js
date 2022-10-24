import React from "react";
import styled from "styled-components";
import { get } from "lodash";
import { useHistory } from "react-router-dom";
import Icon from "../../../components/elements/icon";
import Dropdown from "./../../../components/elements/dropDown/index";

const ViewRowReportStyle = styled.div`
  background: #f4f5f6;
  border-radius: 4px;
  padding: 9px 12px;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 18px;
  color: #353945;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
  cursor: pointer;
  .dropDown {
    &__body {
      left: auto !important;
      right: 0 !important;
      width: 180px;
      .head {
        display: flex;
        justify-content: space-between;
        font-weight: 500;
        font-size: 12px;
        line-height: 18px;
        color: #777e91;
        padding: 10px 15px 0 15px;
        text-transform: uppercase;
        .icons {
          display: flex;
        }
      }
      .body {
        padding: 5px 10px;
        .options {
          display: flex;
          align-items: center;
          padding: 7px 5px;
          font-size: 12px;
          font-weight: 400;
          line-height: 18px;
          color: #353945;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;

          .ui__icon__wrapper {
            margin-right: 8px;
          }
        }
      }
    }
  }
`;

const ViewRowReport = ({
  id = null,
  name = "",
  defaultView = false,
  favourite = false,
  publicly = false,
  permissionsUser = {},
  redirectUrl = "",
  deleteView = () => {},
  ...rest
}) => {
  const history = useHistory();
  return (
    <ViewRowReportStyle
      onClick={() => {
        console.log("id:" + id);
        if (redirectUrl && id) history.push(`${redirectUrl}${id}`);
      }}
      {...rest}
    >
      {name}
      <Dropdown className={"viewRowReport"} button={<Icon size="sm" icon="icon-more-dots" color="#323232" />}>
        <div className="head">
          view options
          <div className="icons">
            {get(permissionsUser, "canEditViewName", false) && <Icon icon="icon-edit" color="#323232" />}
            {get(permissionsUser, "canShare", false) && <Icon icon="icon-files" color="#323232" />}
          </div>
        </div>
        <div className="body">
          {/*<div className="options"> <Icon icon="icon-pin" color="#777E91" /> Pin </div>*/}
          {favourite && (
            <div className="options">
              <Icon icon="icon-favorite" color="#777E91" /> Favorite{" "}
            </div>
          )}
          <div className="options">
            <Icon icon="icon-duplicate" color="#777E91" /> Duplicate
          </div>
          {/*<div className="options"> <Icon icon="icon-move" color="#777E91" /> Move </div>*/}
          {get(permissionsUser, "canChangePublicly", false) && (
            <div className="options">
              <Icon icon="icon-sharing" color="#777E91" /> Sharing & Permission{" "}
            </div>
          )}
          {get(permissionsUser, "canDeleteView", false) && (
            <div
              onClick={(e) => {
                e.stopPropagation();
                deleteView(id);
              }}
              className="options"
            >
              <Icon icon="icon-recycle" color="#EF466F" /> Delete{" "}
            </div>
          )}
        </div>
        <div className="footer"></div>
      </Dropdown>
    </ViewRowReportStyle>
  );
};

export default ViewRowReport;
