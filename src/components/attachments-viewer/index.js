import styled from "styled-components";
import { get } from "lodash";
import Modal from "../elements/modal";
import React, { memo } from "react";
import ApiActions from "../../services/api/actions";
import { connect } from "react-redux";
import Icon from "../elements/icon";

const Style = styled.div`
  .modal {
    background: rgba(53, 57, 69, 0.9);

    &__header {
      height: 60px;
      background: rgba(53, 57, 69, 1);
      width: 100vw;
      position: absolute;
      top: 0;
      color: #fff;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 20px;
      &__left {
      }
      &__center {
        display: flex;
        align-items: center;
        &__download {
          display: flex;
          align-items: center;
          margin-right: 10px;
          cursor: pointer;
          text-decoration: none;
          color: #fff;
          .ui__icon__wrapper {
            margin-right: 5px;
          }
        }
      }
      &__right {
        .ui__icon__wrapper {
          &.md {
            width: 30px;
            height: 30px;
            .icon {
              width: 100%;
              height: 100%;
            }
          }
        }
      }
    }

    &__body {
      margin-top: 80px;
      padding: 0;
      border: none;

      img {
        max-height: 85vh;
        border-radius: 8px;
      }
    }
  }
`;

const AttachmentsViewer = ({ modalData: { Children = () => "", deleteItem = () => "", ...other }, modalData, setTemp }) => {
  const deleteFile = () => {
    deleteItem();
    setTemp({ item: { ...other, Children, active: false } });
  };

  return (
    <Style>
      <Modal
        active={get(other, "active", false)}
        onClose={() => setTemp({ item: { ...other, Children, active: false } })}
        header={
          <>
            <div className="modal__header__left"></div>
            <div className="modal__header__center">
              <a
                href={get(other, "props.value", "")}
                // target={"_blank"}
                className="modal__header__center__download"
              >
                <Icon icon={"icon-download"} color={"#FCFCFD"} />
                Download
              </a>
              <Icon icon={"icon-recycle"} color={"#FCFCFD"} onClick={deleteFile} />
            </div>
            <div className="modal__header__right">
              <Icon
                icon={"icon-exit"}
                color={"#FCFCFD"}
                onClick={() =>
                  setTemp({
                    item: {
                      ...other,
                      Children,
                      active: false,
                    },
                  })
                }
              />
            </div>
          </>
        }
      >
        <Children {...get(other, "props", {})} />
      </Modal>
    </Style>
  );
};

const mapStateToProps = (state, props) => {
  return {
    modalData: get(state, "api.modalData", {}),
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setTemp: ({ item, storeName = "modalData" }) => {
      dispatch({
        type: ApiActions.TEMP_DATA.REQUEST,
        payload: {
          item,
          storeName,
        },
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(memo(AttachmentsViewer));
