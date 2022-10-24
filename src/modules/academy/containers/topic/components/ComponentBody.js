import React, { memo } from "react";
import styled from "styled-components";
import { Col, Row } from "react-grid-system";
import { get, isArray, isNil } from "lodash";
import ComponentTable from "../../../../../containers/GridView/components/ComponentTable";
import DeleteModalBody from "../../../../../containers/GridView/components/DeleteModalBody";
import Modal from "../../../../../components/elements/modal";
import Title from "../../../../../components/elements/title";
import Box from "../../../../../components/elements/box";
import Label from "../../../../../components/elements/label";
import Select from "../../../../../components/elements/select/Select";
import { withTranslation } from "react-i18next";

const ComponentBodyStyle = styled.div`
  padding: 15px;
  background-color: #fff;
  margin-top: 30px;
  border-radius: 8px;

  .modal__body {
    min-height: 0;
    padding: 20px;

    h2 {
      &.title {
        font-weight: 600;
        font-size: 14px;
        line-height: 21px;
        color: #777e91;
        margin-left: 1px;
      }
    }
    .form-textarea-label {
      font-weight: 600;
      font-size: 10px;
      line-height: 12px;
      text-transform: uppercase;
      color: #a7adbf;
      margin-bottom: 6px;
    }
    .form-textarea {
      font-weight: 500;
      font-size: 12px;
      line-height: 18px;
      color: #353945;
      height: 130px;
      min-height: 130px;
      resize: none;
    }
  }
`;
const Style = styled(Box)`
  &.box {
    padding: 40px 38px 0;
    height: calc(100% - 50px);
    .label {
      margin-bottom: 6px;
    }
    .select {
      &__header {
        height: 46px;
      }
    }
  }
`;

const ComponentBody = ({
  t,
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
  filterSelects = [],
  dataForModal,
  courseId,
  coursePartId,
  ...rest
}) => {
  const ModalBodyItem = isNil(get(removeConfirm, "id", null)) ? ModalBody : DeleteModalBody;

  let items = [];

  if (courseId && coursePartId)
    items = data.map(({ ...row }, index) => ({
      ...row,
      number: index + 1,
      status: row["active"] ? "active" : "in active",
      action: "action",
    }));

  return (
    <Style sm gray className={"box"}>
      <Row>
        {filterSelects &&
          isArray(filterSelects) &&
          filterSelects.map(({ id, options = [], label = "", defaultValue = null, onChange = () => {} }) => (
            <Col key={id} xs={3}>
              <Label className={"label"}>{label}</Label>

              <Select
                isSearchable={true}
                defaultValue={defaultValue}
                options={options}
                onChange={onChange}
                nullable={false}
                defaultHideAnimation={false}
              />
            </Col>
          ))}
      </Row>
      <Row>
        <Col xs={12}>
          <ComponentBodyStyle {...rest}>
            <Modal active={open}>
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
                    hasModal={hasModal}
                    id={get(removeConfirm, "id", null)}
                    confirmText={get(removeConfirm, "name", "-")}
                    {...dataForModal}
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
                  hasModal={hasModal}
                  confirmText={get(removeConfirm, "name", "-")}
                  {...dataForModal}
                />
              )}
            </Modal>
            <ComponentTable data={items} columns={columns} remove={setOpenModal} update={getOneRequest} hasModal={hasModal} />
          </ComponentBodyStyle>
        </Col>
      </Row>
    </Style>
  );
};

export default withTranslation("pdp")(memo(ComponentBody));
