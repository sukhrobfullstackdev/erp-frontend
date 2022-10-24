import React, { memo, useState } from "react";
import styled from "styled-components";
import { Col, Row } from "react-grid-system";
import { get, isArray, isNil } from "lodash";
import ComponentTable from "./../../../../../../containers/GridView/components/ComponentTable";
import Modal from "../../../../../../components/elements/modal";
import Title from "../../../../../../components/elements/title";
import DeleteModalBody from "../../../../../../containers/GridView/components/DeleteModalBody";
import Box from "../../../../../../components/elements/box";
import ReactTooltip from "react-tooltip";

const ComponentBodyStyle = styled.div`
  .box {
    padding: 30px 38px 20px;
    .col-box {
      padding-left: 10px !important;
      padding-right: 10px !important;
    }
  }
  .content__box {
    background: #ffffff;
    box-shadow: 0px 8px 16px -8px rgba(15, 15, 15, 0.2);
    border-radius: 10px;
    padding: 20px;
    min-height: 82vh;
    .head,
    .row-of-courses {
      border-radius: 6px;
      font-weight: 500;
      padding: 0 15px;
      height: 40px;
      display: flex;
      align-items: center;
    }
    .head {
      background: #353945;
      font-size: 16px;
      line-height: 24px;
      color: #fcfcfd;
      margin-bottom: 3px;
      font-weight: 400;
    }
    .row-of-courses {
      background: #fcfcfd;
      font-size: 14px;
      line-height: 21px;
      color: #23262f;
      margin-bottom: 6px;
    }
    .center {
      display: flex;
      justify-content: center;
      margin-top: 35%;
      font-weight: normal;
      font-size: 20px;
      line-height: 30px;
      color: #b1b5c4;
    }
    .title {
      cursor: pointer;
    }
  }
  .noDegree {
    color: #777e91;
  }
`;

const ComponentBody = ({
  data = [],
  update = () => {},
  remove = () => {},
  addOrEdit = () => {},
  setOpenModal = () => {},
  getOneRequest = () => {},
  Form,
  ModalBody = DeleteModalBody,
  hasModal = false,
  open = false,
  closeModal = () => {},
  item = {},
  removeConfirm = {},
  columns = [],
  row = [],
  modalTitle = "",
  redirect = {},
  callToRender = () => {},
  ...rest
}) => {
  const [lastIndex, setLastIndex] = useState(null);
  const ModalBodyItem = isNil(get(removeConfirm, "id", null)) ? ModalBody : DeleteModalBody;

  let items = data.map(({ ...row }, index) => ({
    ...row,
    number: index + 1,
    status: row["active"] ? "active" : "in active",
    action: "action",
    degree: !row["noDegree"] ? "DEGREE" : <span className="noDegree">NO DEGREE</span>,
    name: (
      <span className={"title"} onClick={() => clickTitle(index)}>
        {row["name"]}
      </span>
    ),
  }));

  const clickTitle = (index) => {
    setLastIndex(index);
  };

  return (
    <ComponentBodyStyle {...rest}>
      <ReactTooltip id="td" />
      <Box sm gray className={"box"}>
        <Row>
          <Col xs={7} className="col-box">
            <Modal active={open} onClose={closeModal}>
              <Title className="title" sm semiBold>
                {isNil(get(removeConfirm, "id", null))
                  ? !isNil(get(item, "entityName", null) || get(item, "result", null))
                    ? `EDIT ${modalTitle}`
                    : `ADD ${modalTitle}`
                  : `DELETE ${modalTitle}`}
              </Title>
              {!isNil(get(item, "entityName", null) || get(item, "result", null)) ? (
                get(item, "isFetched", false) ? (
                  <ModalBodyItem
                    item={get(item, "result.data", {})}
                    btnText={"Edit"}
                    addOrEdit={(id, data) => addOrEdit(id, data)}
                    cancel={closeModal}
                    remove={remove}
                    id={get(removeConfirm, "id", null)}
                    confirmText={get(removeConfirm, "name", "-")}
                  />
                ) : (
                  "Loading ...."
                )
              ) : (
                <ModalBodyItem
                  item={get(item, "result.data", {})}
                  addOrEdit={(id, data) => addOrEdit(id, data)}
                  cancel={closeModal}
                  remove={remove}
                  id={get(removeConfirm, "id", null)}
                  btnText={"Add"}
                  confirmText={get(removeConfirm, "name", "-")}
                />
              )}
            </Modal>
            <div className="content__box">
              <ComponentTable data={items} columns={columns} remove={setOpenModal} update={getOneRequest} redirect={redirect} />
            </div>
          </Col>
          <Col xs={5} className="col-box">
            <div className="content__box">
              <div className={"head"}>{get(items[lastIndex], "name", "")}</div>
              {isArray(get(items[lastIndex], "courses", [])) &&
                get(items[lastIndex], "courses", []).map((item, index) => (
                  <div className={"row-of-courses"} key={get(item, "name", index + 1)}>
                    {index + 1}. {get(item, "name", "")}
                  </div>
                ))}
              {isNil(lastIndex) && <div className={"center"}>INFO NO FOUND</div>}
            </div>
          </Col>
        </Row>
      </Box>
    </ComponentBodyStyle>
  );
};

export default memo(ComponentBody);
