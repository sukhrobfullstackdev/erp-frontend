import React, { useState } from "react";
import styled, { css } from "styled-components";
import Modal from "../../../components/elements/modal";
import Title from "../../../components/elements/title/title";
import Text from "../../../components/elements/text";
import Input from "../../../components/elements/input/input";
import Button from "../../../components/elements/button";
import FormDemo from "../../../containers/Form/form-demo";
import Field from "../../../containers/Form/field";
import Icon from "../../../components/elements/icon";

const StyledModal = styled.div`
  .title {
    color: #777e91;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
  }
  .label {
    color: #a7adbf;
    line-height: 12px;
    font-size: 10px;
    font-weight: 600;
    margin-bottom: 6px;
  }
  .modal {
    &__body {
      width: ${({ sample }) => (sample ? "700px" : "620px")};
      padding: 20px;
      height: ${({ holidays }) => (holidays ? "content" : "186px")} ${({ sample }) => (sample ? "content" : "")};
    }
  }
  .inputContainer {
    width: ${({ sample }) => (sample ? "100%" : "580px")};
    height: 38px;
  }
  .buttonRow {
    display: flex;
    justify-content: ${({ sample }) => (sample ? "space-between" : "flex-end")};
    margin-top: ${({ sample }) => (sample ? "26px" : "15px")};
  }
  .buton {
    button {
      border-radius: 8px;
      margin: 0 0 0 10px;
      font-size: 12px;
      padding: 8px 12px;
      line-height: 18px;
    }
  }
  .ui__icon__wrapper {
    margin-left: 12px;
    .icon-question {
      width: 17px !important;
      height: 17px !important;
    }
  }
  .check {
    button {
      display: flex;
      :hover {
        color: #353945;
      }
      form {
        margin-right: 9px;
      }
    }
  }
  .input_div {
    justify-content: space-between;
    margin-bottom: 20px;
    .inputContainer {
      width: ${({ sample }) => (sample ? "320px" : "580px")};
    }
  }
  .d-flex {
    display: flex;
    align-items: center;
  }
  .selector {
    margin-bottom: 25px;
  }
  .calendar {
    position: absolute;
    z-index: 9;
    background-color: #fff;
    padding: 10px;
    border-radius: 10px;
    display: ${({ calendar }) => (calendar ? "block" : "none")};
  }
  .calendar_btn {
    margin: 10px 0 50px;
    .buton:first-child {
      button {
        font-size: 14px;
        align-items: center;
      }
    }
  }
`;

const ModalContainer = ({
  modal = false,
  setModal = () => {},
  id = null,
  text = "-",
  sample = false,
  selector = false,
  holidays = false,
}) => {
  const [active, setActive] = useState(false);
  const [privilege, setPrivilege] = useState(false);
  const [calendar, setCalendar] = useState(false);
  return (
    <StyledModal sample={sample} calendar={calendar} holidays={holidays}>
      {sample ? (
        <Modal active={modal} onClose={() => setModal(false)}>
          <Title className="title" semiBold sm>
            ILLNESS SAMPLE
          </Title>
          {selector ? (
            <div className="selector">
              <Text className="label" xs>
                SELECTED PRIVILEGE
              </Text>
              <FormDemo>
                <Field
                  type={"select"}
                  name={"select"}
                  label={""}
                  checked={active}
                  onChange={(e) => setActive(e.target.checked)}
                />
              </FormDemo>
            </div>
          ) : (
            <div className="d-flex input_div">
              <div>
                <Text className="label" xs>
                  dan
                </Text>
                <Input className="input" />
              </div>
              <div>
                <Text className="label" xs>
                  gacha
                </Text>
                <Input className="input" />
              </div>
            </div>
          )}
          <Text className="label" xs>
            Enter the percentage
          </Text>
          <Input className="input" />
          <div className="buttonRow">
            <div className="d-flex">
              <Button className="buton check" lightButton onClick={() => setPrivilege((state) => !state)}>
                <FormDemo>
                  <Field
                    type={"checkbox"}
                    name={"checkbox"}
                    label={""}
                    checked={privilege}
                    onChange={(e) => setPrivilege(e.target.checked)}
                  />
                </FormDemo>
                Privilege
              </Button>
              <Icon icon="icon-question" />
            </div>
            <div className="d-flex">
              <Button className="buton check" lightButton onClick={() => setActive((state) => !state)}>
                <FormDemo>
                  <Field
                    type={"checkbox"}
                    name={"checkbox"}
                    label={""}
                    checked={active}
                    onChange={(e) => setActive(e.target.checked)}
                  />
                </FormDemo>
                Active
              </Button>
              <Icon icon="icon-question" />
              <Button className="buton" outlineDanger onClick={() => setModal(false)}>
                Cancel
              </Button>
              <Button className="buton" success>
                Save
              </Button>
            </div>
          </div>
        </Modal>
      ) : (
        <Modal
          active={modal}
          onClose={() => {
            setModal(false);
            setCalendar(false);
          }}
        >
          <Title className="title" sm semiBold>
            ADD{" "}
            {holidays ? (
              "HOLIDAYS"
            ) : (
              <>
                PRIVILEGE TYPE <Icon icon="icon-question" />
              </>
            )}
          </Title>
          <Text className="label" xs>
            {holidays ? "TITLE" : "TYPE NAME"}
          </Text>
          <Input className="input" />
          {holidays ? (
            <>
              <div className="calendar">
                <FormDemo>
                  <Field type={"datepicker"} name={"datepicker"} label={""} checked={active} />
                </FormDemo>
                <Button className="buton cancel_btn" outlineDanger onClick={() => setCalendar(false)}>
                  Cancel
                </Button>
              </div>
              <div className="d-flex calendar_btn">
                <Button className="buton check" lightButton onCLick={() => setCalendar((state) => !state)}>
                  Calendar <Icon icon="icon-date" />
                </Button>
                <Button className="buton check" lightButton onClick={() => setActive((state) => !state)}>
                  <FormDemo>
                    <Field
                      type={"checkbox"}
                      name={"checkbox"}
                      label={""}
                      checked={active}
                      onChange={(e) => setActive(e.target.checked)}
                    />
                  </FormDemo>
                  Monthly payment
                </Button>
              </div>
            </>
          ) : (
            <></>
          )}
          <div className="buttonRow d-flex">
            <Button className="buton check" lightButton onClick={() => setActive((state) => !state)}>
              <FormDemo>
                <Field
                  type={"checkbox"}
                  name={"checkbox"}
                  label={""}
                  checked={active}
                  onChange={(e) => setActive(e.target.checked)}
                />
              </FormDemo>
              Active
            </Button>
            {holidays ? <Icon icon="icon-question" className="icon" /> : <></>}
            <Button className="buton cancel_btn" outlineDanger onClick={() => setModal(false)}>
              Cancel
            </Button>
            <Button className="buton" success>
              Save
            </Button>
          </div>
        </Modal>
      )}
    </StyledModal>
  );
};

export default ModalContainer;
