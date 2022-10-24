import React, { useState } from "react";
import { isArray } from "lodash";
import { Col, Row } from "react-grid-system";
import Dropdown from "../../../../components/elements/dropDown/dropdown";
import SearchAndAdd from "../../components/searchAndAdd";
import Button from "./../../../../components/elements/button/index";
import Icon from "./../../../../components/elements/icon/index";
import FilterDialog from "./../../../academy/components/filterDialog";
import DataGrid from "../../../../containers/DataGrid";
import Modal from "./../../../../components/elements/modal/modal";
import ViewRowReport from "./../../components/viewRowReport";
import Flex from "./../../../../components/elements/flex/index";
import FormDemo from "../../../../containers/Form/form-demo";
import Field from "../../../../containers/Form/field";
import Label from "./../../../../components/elements/label/label";

const buttons = [
  <>
    <Icon icon="icon-list" /> List
  </>,
  <>
    <Icon icon="icon-board" /> Board
  </>,
  <>
    <Icon icon="icon-grid-alt" /> Table
  </>,
];

export default function TableContainer({ columns, data, viewOptions = ["Small", "Medium", "Large", "Huge"] }) {
  const [check, setCheck] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [selectBtn, setSelectBtn] = useState(0);
  return (
    <>
      <SearchAndAdd buttonText="">
        <Modal active={isOpen} onClose={() => setIsOpen((state) => !state)}>
          <Row>
            <Col xs={9} className="view__left">
              <ViewRowReport title="Annual report" />
              <ViewRowReport title="Monthly report" />
              <ViewRowReport title="Weekly report" />
              <ViewRowReport title="Daily report" />
              <FormDemo mainClassName="view__left__form">
                <Field sm className="personalPublic" type="checkbox" name="personalPublic" label="Personal public" />
                <Button className="addNewList" success>
                  {" "}
                  Add new list
                </Button>
              </FormDemo>
            </Col>
            <Col xs={3} className="view__right">
              <div className="view__right__container">
                <div className="view__right__container__top">
                  <Label className="view__right__container__top__label">
                    <Icon icon="icon-list" />
                    <FormDemo>
                      <Field
                        className="view__right__container__top__label__input"
                        property={{
                          placeholder: "Enter name...",
                        }}
                        hideLabel
                        type="input"
                        name="enterName"
                      />
                    </FormDemo>
                  </Label>
                </div>
                <div className="view__right__container__body">
                  <div className="view__right__container__body__title">View</div>
                  {isArray(buttons) &&
                    buttons.map((val, ind) => (
                      <Button
                        className={`view__right__container__body__button ${selectBtn === ind && "selected"}`}
                        onClick={() => setSelectBtn(ind)}
                      >
                        {" "}
                        {val}{" "}
                      </Button>
                    ))}
                </div>
              </div>
            </Col>
          </Row>
        </Modal>
        <Button className="plus" onClick={() => setIsOpen((state) => !state)} success>
          {" "}
          <Icon size="sm" icon="icon-add-plus" color="white" /> View
        </Button>
        <Dropdown
          button={
            <Button className="viewIcon" lightButton>
              {" "}
              <Icon size="sm" icon="icon-view-icon" color="#777E91" />{" "}
            </Button>
          }
        >
          {isArray(viewOptions) &&
            viewOptions.map((val, ind) => (
              <div
                onClick={() => setCheck(ind)}
                key={ind + new Date().getTime()}
                className={`options ${check === ind && "check"}`}
              >
                {val}
              </div>
            ))}
        </Dropdown>
        <Dropdown
          className="dropDown__filter"
          button={
            <Button className="filterBtn" outline_success>
              Filter <Icon size="sm" icon="icon-filter" color="#45B36B" />{" "}
            </Button>
          }
        >
          <FilterDialog />
        </Dropdown>
      </SearchAndAdd>
      <DataGrid {...{ columns, data }} />
    </>
  );
}
