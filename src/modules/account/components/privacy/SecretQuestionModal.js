import React, { useState } from "react";
import styled from "styled-components";
import Button from "../../../../components/elements/button";
import Modal from "../../../../components/elements/modal";
import Title from "../../../../components/elements/title";
import Text from "../../../../components/elements/text";
import Field from "../../../../containers/Form/field";
import Flex from "../../../../components/elements/flex";
import { Link } from "react-router-dom";
import FormDemo from "../../../../containers/Form/form-demo";

const SecretQuestionStyle = styled.div`
  .modal {
    &__body {
      min-width: 540px;
      border-radius: 16px;
      padding: 50px 40px 40px;
      .form-input-container {
        margin: 30px 0px 14px;
        background: #f4f5f6;

        &:after {
          background: #f4f5f6;
        }
        .form-input {
          background: #f4f5f6;
          font-weight: 400;
          font-size: 14px;
          line-height: 21px;
          border-radius: 12px;
          padding: 13px 14px;
          &::placeholder {
            color: #777e91;
          }
        }
      }
      .hint_title {
        margin-bottom: 10px;
      }

      .forgot-password {
        font-weight: 500;
        font-size: 12px;
        line-height: 18px;
      }
      .btn {
        width: 50%;
        margin-top: 50px;
        button {
          width: 100%;
          height: 50px;
          border-radius: 8px;
          font-weight: 400;
          font-size: 14px;
          line-height: 21px;
        }
      }

      .cancel {
        margin-right: 14px;

        button {
          border: 1px solid #e6e8ec;
          font-weight: 500;
          &:hover {
            border: 1px solid #e6e8ec;
            color: #777e91;
            background: #ebebec;
          }
        }
      }
    }
  }
`;

const SecretQuestionModal = () => {
  const [openModal, setOpenModal] = useState(false);

  const ClickButton = () => {
    setOpenModal(!openModal);
  };
  return (
    <SecretQuestionStyle>
      <FormDemo>
        <Button success onCLick={() => ClickButton()}>
          Click
        </Button>
        <Modal active={openModal} onClose={() => setOpenModal(false)}>
          <Flex justify={"center"}>
            <Title fs={20} semiBold lHeight={30}>
              Secret question confirm
            </Title>
          </Flex>
          <Field
            hideLabel
            type={"input"}
            property={{
              placeholder: "Enter a two-step security password",
              type: "password",
            }}
            name={"password"}
          />
          <Title className={"hint_title"} semiBold xs lHeight={18}>
            Hint : Why you serious
          </Title>
          <Link to={"#"} className={"forgot-password"}>
            {" "}
            Forgot your two-step security password ?{" "}
          </Link>
          <Flex justify={"space-between"}>
            <Button className={"btn cancel"} bg={"#F4F5F6"} color={"#777E91"}>
              Cancel
            </Button>
            <Button className={"btn"} success>
              Confirm
            </Button>
          </Flex>
        </Modal>
      </FormDemo>
    </SecretQuestionStyle>
  );
};

export default SecretQuestionModal;
