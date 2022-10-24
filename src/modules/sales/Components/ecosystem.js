import React, { useState } from "react";
import styled from "styled-components";
import { get, isArray } from "lodash";
import Button from "components/elements/button";
import Flex from "components/elements/flex";
import Text from "components/elements/text";
import Tabs from "components/tabs";
import Radio from "../../hr/components/Radio";
import Field from "containers/Form/field";
import FormDemo from "containers/Form/form-demo";
import DifferentImg from "../../../assets/images/Diferrent-color.png";
import Ios from "../../../assets/images/ios.png";
import Middle from "../../../assets/images/middle.png";
import Senior from "../../../assets/images/senior.png";
import Icon from "../../../components/elements/icon";
import Modal from "../../../components/elements/modal";
import Title from "../../../components/elements/title";
import { getSelectOptionsListFromData } from "../../../utils";

const StyledEcoSystem = styled.div`
  background: #353945;
  border-radius: 6px;
  display: flex;
  .header {
    padding: 0 30px 15px;
    border-bottom: 1px solid #777e91;
    display: flex;
    justify-content: space-between;
  }
  .first_header {
    padding-left: 0;
  }
  .left_part {
    display: flex;
    padding: 30px 0 30px 30px;
    border-right: 1px solid #777e91;
    width: 64%;
    img {
      border-radius: 2px;
      width: 268px;
      height: 240px;
    }
    &_info {
      margin-left: 30px;
      &_content {
        padding: 15px 30px 0 0;
        p {
          margin-bottom: 45px;
        }
        .tag {
          min-width: 122px;
          background: #23262f;
          border-radius: 3px;
          padding: 7px;
          display: flex;
          justify-content: center;
          font-weight: 500;
          font-size: 10px;
          line-height: 15px;
          color: #fcfcfd;
          .ui__icon__wrapper {
            width: 16px;
            height: 16px;
            margin-right: 10px;
            .icon {
              width: 16px;
              height: 16px;
            }
          }
        }
        .blue {
          background-color: #3772ff;
          font-size: 12px;
        }
        .purple {
          background-color: #9757d7;
        }
      }
    }
  }
  .right_part {
    padding: 30px 30px 30px 0;
    width: 46%;
    &_content {
      padding: 40px 0 0 40px;
      /* width: 690px; */
      .speacker {
        margin-right: 50px;
        text-align: center;
        img {
          border-radius: 50%;
          width: 80px;
          height: 80px;
        }
        p {
          margin: 29px 0 1px;
        }
      }

      .plusIcon {
        width: 60px;
        height: 60px;
        margin-left: 40px;
        cursor: pointer;
        background: #45b36b;
        border-radius: 50%;
        font-size: 30px;
        color: #fcfcfd;
        padding-bottom: 5px;
      }
    }
  }
  .modal__body {
    padding: 20px;
    box-shadow: 0px 40px 32px -24px rgba(15, 15, 15, 0.12);
    border-radius: 8px;
    width: 340px;
    .tabs__list {
      margin: 20px 0 14px;
    }
    .tabs__list__left {
      background: #fcfcfd;
      border: 1px solid #f4f5f6;
      border-radius: 6px;
      padding: 3px;
      .tabs__list__tab {
        font-weight: 500;
        font-size: 12px;
        line-height: 18px;
        min-width: 147px;
        justify-content: center;
        margin: 0;
        padding: 7px;
        height: fit-content;
        border-radius: 4px;
      }
      .active {
        background: #45b36b;
      }
    }
    .radio {
      :last-child {
        margin-bottom: 20px;
      }
    }
    .radio-section {
      border-radius: 6px;
      height: fit-content;
      margin-bottom: 5px;
      .select__header__content {
        font-weight: 400;
        font-size: 12px;
        line-height: 18px;
      }
      .radio-section-input {
        width: 55%;
        .form-input-container {
          margin-bottom: 0;
          .form-input {
            font-weight: 400;
            padding: 10px;
            height: fit-content !important;
          }
        }
      }
    }
    .form-label {
      font-weight: 600;
      font-size: 10px;
      line-height: 12px;
      color: #777e91;
      margin-bottom: 8px;
    }
    .form-input-container {
      border-radius: 6px;
      margin-bottom: 20px;
      .form-input {
        font-weight: 500;
        font-size: 12px;
        line-height: 18px;
      }
    }
    .form-date-container {
      .datepicker__input {
        font-weight: 500 !important;
        font-size: 12px !important;
        line-height: 18px;
        height: fit-content;
        border-radius: 6px;
        margin-bottom: 40px;
      }
      .date__icon {
        top: 15%;
      }
    }
    .second_tab {
      .fio {
        .form-input-container {
          margin-bottom: 12px;
        }
      }
      .phoneNumber {
        .form-input-container {
          margin-bottom: 36px;
        }
      }
    }
    .register_btn,
    .cancel_btn,
    .invoice {
      button {
        font-weight: 500;
        font-size: 12px;
        line-height: 18px;
        border-radius: 6px;
      }
    }
    .cancel_btn {
      margin: 0 8px 0 16px;
    }
  }
`;

const EcoSystem = ({}) => {
  const [openModal, setOpenModal] = useState(false);
  const RadioContent = {
    options: [
      { id: 1, name: "Father" },
      { id: 2, name: "Brother" },
    ],

    phoneNumbers: [
      { phoneNumber: "(308) 555-0121", main: true, relationNameId: null },
      {
        phoneNumber: "(907) 555-0101",
        main: false,
        relationNameId: null,
      },
    ],
  };
  return (
    <StyledEcoSystem>
      <div className="left_part">
        <img src={DifferentImg} alt="event img" />
        <div className="left_part_info">
          <div className="header first_header">
            <Title md medium lHeight="27" cl="#FCFCFD">
              ECOSYSTEM
            </Title>
          </div>
          <div className="left_part_info_content">
            <Text sm cl="#FCFCFD">
              Metacognitive strategies, which involved thinking about (or knowledge of) the learning process, planning for
              learning, monitoring learning while it is taking place, or self-evaluation of learning after the task had been
              completed.
              <br />
              Cognitive strategies, which involved mental manipulation or transformation of materials or tasks, intended to
              enhance comprehension, acquisition, or retention.
            </Text>
            <Flex justify="space-between">
              <div className="tag">
                <Icon icon="icon-date" color="#B1B5C3" />
                13 / 02 / 2022
              </div>
              <div className="tag">
                <Icon icon="icon-clock" color="#B1B5C3" />
                16 : 00 / 18 : 30
              </div>
              <div className="tag">
                <Icon icon="icon-userImg" color="#B1B5C3" />
                28 / 40
              </div>
              <div className="tag blue">
                <Icon icon="icon-money" color="#FCFCFD" />
                300.000 SO’M
              </div>
              <div className="tag purple">
                <Icon icon="icon-location" color="#E6E8EC" />
                EVENT ZONE
              </div>
            </Flex>
          </div>
        </div>
      </div>
      <div className="right_part">
        <div className="header">
          <Title md medium lHeight="27" cl="#FCFCFD">
            SPICKERS
          </Title>
          <Title md medium lHeight="27" cl="#FCFCFD">
            PYTHON
          </Title>
        </div>
        <Flex justify="space-between" align="flex-end" className="right_part_content">
          <div className="speacker">
            <img src={Senior} alt="speacker" />
            <Text xs cl="#FCFCFD">
              Senior Developer
            </Text>
            <Title md regular lHeight="27" cl="#E4D7CF">
              Bessie Cooper
            </Title>
          </div>
          <div className="speacker">
            <img src={Ios} alt="speacker" />
            <Text xs cl="#FCFCFD">
              iOS Developer
            </Text>
            <Title md regular lHeight="27" cl="#E4D7CF">
              Darlene Robertson
            </Title>
          </div>
          <div className="speacker">
            <img src={Middle} alt="speacker" />
            <Text xs cl="#FCFCFD">
              Middle Developer
            </Text>
            <Title md regular lHeight="27" cl="#E4D7CF">
              Theresa Webb
            </Title>
          </div>
          <Flex className="plusIcon" justify="center" align="center" onClick={() => setOpenModal(true)}>
            +
          </Flex>
        </Flex>
      </div>
      <Modal active={openModal} onClose={() => setOpenModal(false)}>
        <FormDemo>
          <Title sm lHeight="21" semiBold cl="#777E90">
            ADD TO EVENT
          </Title>
          <Tabs
            leftList={["TO THIS USER", "OTHER USER"]}
            rightList={[]}
            leftContent={[
              <>
                {isArray(RadioContent.phoneNumbers) &&
                  RadioContent.phoneNumbers.map((value, index) => (
                    <Radio
                      className="radio"
                      options={getSelectOptionsListFromData(get(RadioContent, "options", []), "id", "name")}
                      key={index}
                      isEditable
                      value={value}
                      name={`additionalPhoneNumbers[${index}]`}
                    />
                  ))}
                <Field type="input" name="custom phoneNumber" label="CUSTOM PHONE NUMBER" placeholder="Enter phone number..." />
                <Field type="custom-datepicker" name="DEADLINE" label="DEADLINE" />
              </>,
              <div className="second_tab">
                <Field className="fio" type="input" name="FIO" label="FIO" placeholder="Enter name..." />
                <Field
                  className="phoneNumber"
                  type="input"
                  name="phoneNumber"
                  label="PHONE NUMBER"
                  placeholder="Enter phone number..."
                />
                <Field type="custom-datepicker" name="DEADLINE_2" label="DEADLINE" placeholder="Enter date" />
              </div>,
            ]}
          />
          <Flex className="modal_footer">
            <Field className="invoice" type="checkbox" inBtn label="Generate invoice" />
            <Button className="cancel_btn" outlineDanger>
              Cancel
            </Button>
            <Button className="register_btn" success>
              Register
            </Button>
          </Flex>
        </FormDemo>
      </Modal>
    </StyledEcoSystem>
  );
};

export default EcoSystem;
