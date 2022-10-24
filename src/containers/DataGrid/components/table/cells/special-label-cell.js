import React, { memo, useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { get, isArray, isEmpty, isUndefined } from "lodash";
import Dropdown from "../../../../../components/elements/dropDown/dropdown";
import ApiActions from "../../../../../services/api/actions";
import { connect } from "react-redux";
import SimpleBar from "simplebar-react";
import { formatDate } from "../../../../../utils";

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
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: default;
    }

    &__body {
      width: 300px;
      top: 35px;
      padding: 10px 10px 2px;

      ${({ isHaveData }) =>
        isHaveData &&
        css`
          padding: 0;
        `}
      .cards {
        width: 100%;

        .tr {
          width: 100%;
          height: auto !important;
          //border: none !important;
          margin-bottom: 10px;
          border: 1px solid #85878c;
          border-radius: 4px;
          &:first-child {
            border: 1px solid #85878c;
          }

          .tdd {
            display: flex;
            //border: 1px solid #e9ebf0;
            background: none;

            .cards__item {
              width: 100%;
              height: 25px;
              padding: 5px 0 5px 5px;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              background: none;
            }
          }
        }
      }
    }
  }

  .simplebar-track {
    &.simplebar-horizontal {
      height: 0;
    }
  }
`;

const SpecialLabelCell = ({
  initialValue,
  id,
  editable,
  rowId,
  index,
  updateItemRequest,
  setLoading,
  viewId,
  typeConfig,
  getDataById,
  setItem,
  getTempData,
  match,
}) => {
  const [data, setData] = useState({});

  useEffect(() => {
    return () => {
      if (!get(getTempData(), rowId) && !isEmpty(data)) {
        setItem({
          item: { ...getTempData(), ...data },
          storeName: "temp-Data-For-Lead-View",
        });
      }
    };
  }, [data]);

  const getParamsKey = () => {
    if (match.path.includes("calls")) return "callId";
    else return "leadId";
  };

  const onChangeHandling = (e) => {
    if (e && !get(getTempData(), rowId)) {
      isEmpty(data[rowId]) &&
        getDataById({
          url: `${get(typeConfig, "specialLabelConfig.url", "")}?${getParamsKey()}=${rowId}`,
          storeName: rowId,
          cb: {
            success: (res) => {
              setData((s) => ({
                ...s,
                [rowId]: get(res, "data", []),
              }));
            },
          },
        });
    }
  };

  let specialLabelData = get(getTempData(), rowId) ? get(getTempData(), rowId) : get(data, rowId);
  let arr = get(specialLabelData, `values`, []);
  let ignoreKeys = get(specialLabelData, `ignoreKeys`, []);
  let config = get(specialLabelData, `config`, []);

  const ignoreRow = (key) => !!isUndefined(ignoreKeys.find((i) => i === key));

  const getData = (key, item) => {
    if (get(config, "time", false) && get(config, "time", false) === key)
      return formatDate(new Date(get(item, key, "")), "dd/MM/yyyy  HH:mm:ss");
    else return get(item, key, "");
  };

  return (
    <Style isHaveData={isEmpty(arr) || arr === undefined}>
      <Dropdown
        {...{
          button: initialValue,
          onChange: onChangeHandling,
        }}
      >
        <SimpleBar style={{ maxHeight: "300px" }} forceVisible={"y"}>
          <div className={"cards"}>
            {isArray(arr) &&
              arr.map((item, index) => (
                <div
                  className={"tr"}
                  key={get(item, "id", "")}
                  style={{
                    background: get(item, config["coloredRow"], false) ? "rgb(218, 232, 245, 0.5)" : "none",
                  }}
                >
                  {Object.keys(item).map(
                    (i, ind) =>
                      ignoreRow(i) && (
                        <div className={"tdd"} key={get(item, `id`, "") + ind}>
                          <div className="cards__item">{i}</div>
                          <div className="cards__item">{getData(i, item)}</div>
                        </div>
                      )
                  )}
                </div>
              ))}
          </div>
        </SimpleBar>
      </Dropdown>
    </Style>
  );
};

const mapStateToProps = (state) => ({
  getTempData: () => get(state, `api.temp-Data-For-Lead-View`, {}),
});

const mapDisptchToProps = (dispatch) => ({
  getDataById: ({ method = "get", infinite = true, url, storeName, cb }) => {
    dispatch({
      type: ApiActions.REQUEST.REQUEST,
      payload: {
        url,
        storeName,
        method,
        cb,
      },
    });
  },
  setItem: ({ item, storeName, cb }) => {
    dispatch({
      type: ApiActions.TEMP_DATA.REQUEST,
      payload: {
        item,
        storeName,
        cb,
      },
    });
  },
});

export default connect(mapStateToProps, mapDisptchToProps)(memo(SpecialLabelCell));
