import React, { memo, useEffect, useState } from "react";
import styled, { css } from "styled-components";
import Icon from "../elements/icon";
import { isArray, isNull, get } from "lodash";
import OutsideClickHandler from "react-outside-click-handler/esm/OutsideClickHandler";

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

      div {
        width: 100%;
        height: 100%;
      }
    }
  }

  .assign {
    position: relative;
    width: 100%;
    height: 100%;
    & > div {
      &:first-child {
        height: 100%;
      }
    }
    &__header {
      display: flex;
      align-items: center;
      padding: 0 10px;
      height: 100%;
      width: 100%;
      cursor: default;
      &__item {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }

    &__body {
      min-width: 190px;
      max-width: 240px;
      position: absolute;
      top: 30px;
      left: 0;
      will-change: transform;
      background: #ffffff;
      box-shadow: 0px 2px 10px rgba(40, 40, 40, 0.3);
      border-radius: 8px;
      overflow: hidden;
      z-index: 2;
      display: inline-block;
      opacity: 0;
      transform: scale(0);
      //animation: hideAnim 0.2s forwards;
      &__title {
        font-weight: 500;
        font-size: 12px;
        line-height: 18px;
        color: #353945;
        margin: 10px 14px;
      }

      &__serach {
        display: flex;
        padding: 10px;

        .ui__icon__wrapper.md {
          .icon {
            width: 14px;
            height: 14px;
          }
        }

        input {
          border: none;
          outline: none;
          width: 100%;
          margin-left: 12px;
          font-size: 14px;
        }
      }

      &__humans {
        padding: 10px;

        &__row {
          display: flex;
          align-items: center;
          padding: 4px;
          cursor: pointer;

          &__img {
            box-sizing: border-box;
            border-radius: 50%;
            width: 30px;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 14px;
            position: relative;
            overflow: hidden;
            border: 1px solid transparent;

            &__name {
              font-size: 10px;
              line-height: 15px;
              text-align: center;
              color: #ffffff;
              background: #fb09ff;
              width: 100%;
              height: 100%;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
            }

            &.active {
              border: 1px solid #23262f;
            }
          }

          &__name {
            font-family: Poppins;
            font-style: normal;
            font-weight: 500;
            font-size: 12px;
            line-height: 18px;
            text-align: center;
            color: #353945;
          }
        }
      }
    }

    &.active {
      .assign {
        &__body {
          animation: showAnim 0.2s forwards;
        }
      }
    }
  }
`;

const Img = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  ${({ src }) =>
    src &&
    css`
      background: url(${src});
      background-repeat: no-repeat;
      background-size: cover;
      border: 1px solid #fff;
    `}
`;

const Assign = ({
  options = [],
  editable,
  defaultValue,
  onChange = () => "",
  rowSize,
  customHeader = null,
  isDoubleClick = true,
  idKey = "id",
  photoKey = null,
  nameKey = "firstName",
}) => {
  const [data, setData] = useState({
    selected: {},
    show: false,
    searchValue: "",
    options: [],
  });
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (options.length) setData((s) => ({ ...s, options }));
  }, [options]);

  useEffect(() => {
    if (options.length && !isNull(defaultValue)) {
      let temp = {};
      options.forEach((item) => {
        if (defaultValue.includes(get(item, idKey))) temp[get(item, idKey)] = item;
      });
      setData((s) => ({ ...s, selected: { ...temp } }));
    }
  }, [defaultValue]);

  const searchHandling = (e) => {
    const {
      target: { value },
    } = e;

    // search data
    // options = options.filter(({label}) => label.toLocaleLowerCase().startsWith(value.toLocaleLowerCase()));
    // set Options for showing display
    // setOptionsState(options);
    // inputOnChange(e);

    setData((s) => ({ ...s, searchValue: value }));
  };

  const clickHandling = (id, item) => {
    if (data.selected[id]) {
      delete data.selected[id];
      setData((s) => ({ ...s, selected: { ...data.selected } }));
    } else setData((s) => ({ ...s, selected: { ...s.selected, [id]: item } }));
  };

  const includesFromData = (id) => {
    return get(data, `selected[${id}].${idKey}`, "") === id;
  };

  const getIdsFromSelected = () => Object.keys(data.selected);

  const getDataFromSelectedById = (id) => get(data.selected, id, "");

  const getFullName = () => {
    let temp = "";
    getIdsFromSelected().forEach((item, index) => {
      temp += `${index !== 0 ? "," : ""} ${get(getDataFromSelectedById(item), "firstName", "")} / ${get(
        getDataFromSelectedById(item),
        "lastName",
        ""
      )}`;
    });
    return temp;
  };

  return (
    <Style {...{ rowSize }}>
      <div className={`assign ${show && "active"}`}>
        <OutsideClickHandler
          onOutsideClick={() => {
            show && onChange(getIdsFromSelected());
            setShow(false);
          }}
        >
          <div
            className={"assign__header"}
            onDoubleClick={() => isDoubleClick && setShow((s) => !s)}
            onClick={() => !isDoubleClick && setShow((s) => !s)}
          >
            <div className="assign__header__item">
              {isNull(customHeader) ? getFullName() : customHeader(Object.values(data.selected))}
            </div>
          </div>

          <div className="assign__body">
            <div className="assign__body__serach">
              <Icon icon="icon-search" />
              <input placeholder="search..." value={data.searchValue} onChange={searchHandling} />
            </div>
            <span className="assign__body__title">People</span>
            <div className="assign__body__humans">
              {isArray(data.options) &&
                data.options.map((item, index) => (
                  <div
                    className={`assign__body__humans__row`}
                    key={get(item, idKey, index)}
                    onClick={() => clickHandling(get(item, idKey, null), item)}
                  >
                    <div className={`assign__body__humans__row__img ${includesFromData(get(item, idKey, "")) && "active"}`}>
                      {!isNull(get(item, "photoId", null)) ? (
                        <Img src={`${get(item, "avatar")}?id=${get(item, "photoId")}&view=open`} />
                      ) : photoKey ? (
                        <Img src={`${get(item, photoKey)}`} />
                      ) : (
                        <span className="assign__body__humans__row__img__name">{get(item, "initialName", "")}</span>
                      )}
                    </div>
                    <span className="assign__body__humans__row__name">{get(item, nameKey, "")}</span>
                  </div>
                ))}
            </div>
          </div>
        </OutsideClickHandler>
      </div>
    </Style>
  );
};

export default memo(Assign);
