import React, { memo, useState } from "react";
import { toast } from "react-toastify";
import styled, { css } from "styled-components";
import { isNull, get, isArray } from "lodash";
import { connect } from "react-redux";
import SimpleBar from "simplebar-react";
import Dropdown from "../../../../../components/elements/dropDown/dropdown";
import ApiActions from "../../../../../services/api/actions";
import { formatDate } from "../../../../../utils";

import useImg from "../../../../../assets/icons/UserImg.svg";

const Style = styled.div`
  height: 100%;

  .dropDown {
    width: 100%;
    height: 100%;

    & > div {
      &:first-child {
        height: 100%;
      }
    }

    &__button {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    &__body {
      .barBody {
        max-height: 500px;
        width: 400px;
      }
      .box {
        width: 400px;
        display: flex;
        padding: 10px 15px;

        &__container {
          width: 100%;
          border: 1px solid #9da3b6;
          padding: 10px;
          border-radius: 4px;
        }

        &__img {
          width: 30px;
          min-width: 30px;
          height: 30px;
          border-radius: 50%;
          margin-right: 10px;
        }

        &__head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 12px;

          &__fullName {
          }
        }
      }
    }
  }
`;

const Img = styled.div`
  ${({ src }) =>
    src &&
    css`
      background: url(${src}) no-repeat center;
      background-size: cover;
    `}
`;

const CommentCell = ({
  initialValue,
  id,
  editable,
  rowId,
  index,
  updateItemRequest,
  setLoading,
  viewId,
  typeConfig,
  request,
}) => {
  const [state, setState] = useState([]);

  const onChange = (value) => {
    setLoading(true);
    updateItemRequest({
      id: rowId,
      // viewId,
      attributes: { [id]: value },
      cb: {
        success: () => {
          setLoading(false);
          toast.success("SUCCESSFULLY UPDATED");
        },
        fail: () => {
          setLoading(false);
        },
      },
    });
  };
  const handling = () => {
    !isNull(initialValue) &&
      request({
        url: `${get(typeConfig, "commentConfig.url", "")}`,
        attributes: initialValue,
        method: "post",
        cb: {
          success: ({ data }) => setState(data),
        },
      });
  };
  return (
    <Style>
      <Dropdown button={isNull(initialValue) ? 0 : initialValue.length} clickButton={handling}>
        <SimpleBar className="barBody">
          {isArray(state) &&
            state.map((item) => (
              <div className={"box"}>
                <Img
                  className={"box__img"}
                  src={
                    !isNull(get(item, "photoId", null))
                      ? `${get(item, "avatar", "")}?id=${get(item, "photoId", null)}&view=open&format=SMALL`
                      : useImg
                  }
                />
                <div className="box__container">
                  <div className="box__head">
                    <div className="box__head__fullName">{get(item, "fullName", "")}</div>
                    <div>{formatDate(new Date(get(item, "createdAt", 0)), "dd/MM/yyyy")}</div>
                  </div>
                  {get(item, "text", "")}
                </div>
              </div>
            ))}
        </SimpleBar>
      </Dropdown>
    </Style>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    request: ({ attributes, cb, method = "get", url }) => {
      dispatch({
        type: ApiActions.REQUEST.REQUEST,
        payload: {
          method,
          url,
          attributes,
          cb,
        },
      });
    },
  };
};

export default connect(null, mapDispatchToProps)(memo(CommentCell));
