import React, { useState } from "react";
import styled from "styled-components";
import { Col, Row } from "react-grid-system";
import { get, isArray } from "lodash";
import ListTable from "../../../../../containers/ListView/components/ListTable";
import Box from "../../../../../components/elements/box";
import Icon from "../../../../../components/elements/icon";
import Button from "../../../../../components/elements/button";
import recycle from "../../../../../assets/icons/trash-icon.svg";
import edit2 from "../../../../../assets/icons/edit2.svg";
import { useHistory } from "react-router-dom";
import DeleteModalBody from "../../../../../containers/GridView/components/DeleteModalBody";
import Title from "../../../../../components/elements/title";
import Modal from "../../../../../components/elements/modal";

const ComponentBodyStyle = styled.div`
  h2 {
    &.title {
      font-weight: 600;
      font-size: 14px;
      line-height: 21px;
      color: #777e91;
      margin-left: 1px;
    }
  }
  button {
    width: 34px;
    height: 34px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 6px;

    .ui__icon__wrapper,
    img {
      width: 25px !important;
      height: 25px !important;

      .icon {
        width: 100% !important;
        height: 100% !important;
        -webkit-mask-size: auto;
        mask-size: auto;
      }
    }
  }
  .action_btn button {
    &:hover {
      background: #f4f5f6;
    }
  }
`;
const ComponentBody = ({ data = [], deleteItem, ...rest }) => {
  const [openModal, setOpenModal] = useState(false);
  const [removeConfirm, setRemoveConfirm] = useState({
    id: null,
    text: null,
  });
  const SetOpenModal = (id, name) => {
    setOpenModal(true);
    setRemoveConfirm({ id, name });
  };
  const emptyRemoveText = () => {
    setRemoveConfirm({ id: null, text: null });
  };
  const closeModal = () => {
    setOpenModal(false);
    emptyRemoveText();
  };
  const remove = () => {
    deleteItem({ data, closeModal }, get(removeConfirm, "id"));
  };
  const history = useHistory();
  const modalTitle = "ROLE";
  return (
    <ComponentBodyStyle>
      <Box gray>
        <Row>
          <Col xs={12}>
            <Modal active={openModal} onClose={closeModal}>
              <Title className="title" sm semiBold>
                {`DELETE ${modalTitle}`}
              </Title>
              <DeleteModalBody
                item={data}
                remove={remove}
                cancel={closeModal}
                id={get(removeConfirm, "id", null)}
                hasModal={true}
                confirmText={get(removeConfirm, "name", "-")}
              />
            </Modal>
            <ListTable columns={["Role name", "Description", "Action"]}>
              {data &&
                isArray(data) &&
                data.map((item) => (
                  <tr>
                    <td className={"semi-bold text-uppercase"}>{get(item, "name")}</td>
                    <td>{get(item, "description")}</td>
                    <td>
                      <Button onCLick={() => history.push(`/role/copy/${get(item, "id")}`)} className={"action_btn mr-5"}>
                        <Icon icon={"icon icon-copy"} color="#353945" />
                      </Button>
                      <Button onCLick={() => history.push(`/role/edit/${get(item, "id")}`)} className={"action_btn mr-5"}>
                        <img src={edit2} alt="edit2" />
                      </Button>
                      <Button onCLick={() => SetOpenModal(get(item, "id"), "Yes, Delete")} className={"action_btn mr-5"}>
                        <img src={recycle} alt="trash" />
                      </Button>
                    </td>
                  </tr>
                ))}
            </ListTable>
          </Col>
        </Row>
      </Box>
    </ComponentBodyStyle>
  );
};

export default ComponentBody;
