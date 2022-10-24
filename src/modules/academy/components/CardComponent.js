import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { get, isNull } from "lodash";
import Button from "../../../components/elements/button";
import Icon from "../../../components/elements/icon";
import Text from "../../../components/elements/text";
import Title from "../../../components/elements/title";
import Dropdown from "./../../../components/elements/dropDown/dropdown";
import DeleteModalBody from "../../../containers/GridView/components/DeleteModalBody";
import Modal from "../../../components/elements/modal";

const StyledCard = styled.div`
  background: #ffffff;
  border-top: 6px solid ${({ colorCode }) => colorCode || "#EF466F"};
  border-radius: 6px 6px 10px 10px;
  min-height: 200px;
  margin-bottom: 31px;
  cursor: pointer;
  transition: 0.3s ease;
  display: flex;
  justify-content: space-between;
  flex-direction: column;

  :hover {
    //box-shadow: 0px 40px 32px -24px rgba(15, 15, 15, 0.12);
    box-shadow: 0px 40px 32px 4px rgba(15, 15, 15, 0.12);
  }

  .title_row {
    padding: 11px 8px 11px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .title {
      font-size: 16px;
      font-weight: 500;
      line-height: 14px;
      color: #000;
    }

    .ui__icon__wrapper {
      width: 30px;
      height: 30px;

      :hover {
        background-color: #f4f5f6;
        border-radius: 8px;
      }

      .icon {
        width: 26px;
        height: 26px;
        background-color: #777e91;

        :hover {
          background-color: #353945;
        }
      }
    }

    position: relative;

    .dropdawn {
      /* position: absolute; */
      background: #ffffff;
      border: 1px solid #e6e8ec;
      box-shadow: 0px 2px 10px rgba(40, 40, 40, 0.3);
      border-radius: 8px;
      width: 140px;
      min-height: 87px;
      /* top: 49px;
      right: 10px; */
      padding: 15px;

      .drop_btn {
        margin-bottom: 5px;

        &:last-child {
          margin-bottom: 0px;
        }

        button {
          display: flex;
          align-items: center;
          background: #fff;
          border-radius: 4px;
          width: 100%;
          height: 27px;
          font-size: 14px;
          font-weight: 400;
          transition: 0.5s ease;
          padding: 0px;
          color: #777e90;

          .ui__icon__wrapper {
            height: 18px;
            width: 18px;
            margin-right: 14px;

            .icon {
              background-color: #777e90;
              height: 18px;
              width: 18px;
            }
          }
        }
      }

      .edit_btn {
        button {
          :hover {
            color: #45b26b;

            .ui__icon__wrapper {
              .icon {
                background-color: #45b26b;
              }
            }
          }
        }
      }

      .delete_btn {
        button {
          :hover {
            color: #ef466f;

            .ui__icon__wrapper {
              .icon {
                background-color: #ef466f;
              }
            }
          }
        }
      }
    }
  }

  .description {
    padding: 0 20px 20px 20px;
    font-size: 12px;
    font-weight: 400;
    color: #353945;
    line-height: 20px;
    height: 83px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
  }

  .status {
    border-top: 1px solid #e6e8ec;
    padding: 12px 20px;
    font-size: 12px;
    font-weight: 600;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 44px;

    .active {
      font-size: 14px;
      font-weight: 600;
      color: #45b26b;
      line-height: 15px;
    }

    .inActive {
      font-size: 14px;
      font-weight: 600;
      color: #ef466f;
      line-height: 15px;
    }

    .count {
      font-size: 12px;
      font-weight: 600;
      color: #777e90;
      text-transform: uppercase;
    }
  }
`;

export default function CardComponent({ item: data, openModal = () => {}, module, del = () => {} }) {
  const [openDrop, setOpenDrop] = useState(false);
  const [deleteModal, setDelete] = useState(false);

  const ref = useRef();

  useEffect(() => {
    const checkClickedOutside = (e) => {
      if (openDrop && ref.current && !ref.current.contains(e.target)) {
        setOpenDrop(false);
      }
    };
    document.addEventListener("click", checkClickedOutside);
    return () => {
      document.removeEventListener("click", checkClickedOutside);
    };
  }, [openDrop]);

  return (
    <StyledCard {...data}>
      <Modal active={deleteModal}>
        <DeleteModalBody
          confirmText={get(data, "name", "")}
          cancel={() => setDelete(false)}
          id={get(data, "id")}
          remove={(id) => {
            del(data);
          }}
        />
      </Modal>
      <div>
        <div className="title_row">
          <Title className="title">{get(data, "name")}</Title>
          <Dropdown button={<Icon icon="icon-triple-dots" onClick={() => setOpenDrop((state) => !state)} />}>
            <div className="dropdawn">
              <Button className="drop_btn edit_btn" onClick={() => openModal(data)}>
                <Icon icon="icon-edit" />
                Rename
              </Button>
              <Button className="drop_btn delete_btn" onCLick={() => setDelete(true)}>
                <Icon icon="icon-recycle" />
                Delete
              </Button>
            </div>
          </Dropdown>
        </div>
        <Text className="description">{get(data, "description")}</Text>
      </div>
      <div className="status">
        {get(data, "active", false) ? <Title className="active">ACTIVE</Title> : <Title className="inActive">IN ACTIVE</Title>}
        <Title className="count">
          {module && `${isNull(get(data, "moduleCount", "-"))? 0 : get(data, "moduleCount", "-") } modul / `}
          {data?.lessonCount ?? 0} dars
        </Title>
      </div>
    </StyledCard>
  );
}
