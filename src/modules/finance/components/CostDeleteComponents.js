import React, { useState } from "react";
import styled from "styled-components";
import Modal from "../../../components/elements/modal";
import Title from "../../../components/elements/title";
import Icon from "../../../components/elements/icon";
import Button from "../../../components/elements/button";

const DeleteComponents = styled.div`
  .modal__body {
    padding: 20px;
    border-radius: 12px;
    overflow: hidden;
    .body {
      background-color: #fcfcfd;
      border: 1px solid #e6e8ec;
      border-radius: 6px;
      padding: 18px;
      margin: 20px 0px;

      &_title {
        display: flex;
        align-items: center;
        padding: 6px 0px 6px 8px;
        background: rgba(239, 70, 111, 0.1);
        border-radius: 6px;
        margin-bottom: 18px;
        h2 {
          margin-left: 10px;
        }
      }
    }

    .footer {
      display: flex;
      align-items: center;
      justify-content: right;

      button {
        line-height: 18px;
        border-radius: 8px;
        padding: 8px 12px;
        margin-left: 10px;
      }
    }
  }
`;

const CostDeleteComponents = ({ openModal, setOpenModal }) => {
  return (
    <DeleteComponents>
      <Modal width={620} active={openModal} onClose={setOpenModal}>
        <Title semiBold sm cl={"#777E91"} lHeight={21}>
          DELETE
        </Title>
        <div className="body">
          <div className="body_title">
            <Icon icon={"icon-strong-info"} size={"xmd"} color={"#EF466F"} />
            <Title medium xs lHeight={18}>
              You are about to permanently delete this project
            </Title>
          </div>
          <div className="text">
            <Title regular fs={13} lHeight={20}>
              I have a unity package with my folder structure pre-setup, but meant to be empty, in order to export the folders I
              put a file "Delete This File.txt" into every bottom folder in the structure to allow unity to export the folders,
              but I want to write a script that runs on startup which deletes these files, but i can't seem to get the script to
              find all the files throughout the various folders. How do i do this?
            </Title>
          </div>
        </div>
        <div className="footer">
          <Button xs outlineDanger>
            Cancel
          </Button>
          <Button xs danger>
            Yes, delete
          </Button>
        </div>
      </Modal>
    </DeleteComponents>
  );
};

export default CostDeleteComponents;

// <Button success onCLick={() => closeModal()}>onClick</Button>

// const [openModal,setOpenModal] = useState(false);
// const closeModal = () => {
//     setOpenModal(!openModal)
// }
