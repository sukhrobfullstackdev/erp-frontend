import { connect } from "react-redux";
import React, { memo } from "react";
import { get } from "lodash";
import ReactDOM from "react-dom";
import styled from "styled-components";
import ActionsApi from "services/api/actions";
import Modal from "../elements/modal";

const Styled = styled.div`
  .modal {
    &__body {
      padding: 0;
      border-radius: 4px;
      min-height: 15px;
    }
  }
`;

const modalRoot = document.getElementById("modal-root");

const GlobalModal = ({ getModalData: { position = false, body = "", props = {} }, setGlobalModal }) => {
  const onCloseDisabled = get(props, "onCloseDisabled", false);
  const Style = get(props, "Style", Styled);

  return ReactDOM.createPortal(
    <Style>
      <Modal active={position} onClose={() => !onCloseDisabled && setGlobalModal({ position: !position, body })}>
        {body}
      </Modal>
    </Style>,
    modalRoot
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    getModalData: get(state, `api.global-modal`, ""),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setGlobalModal: ({ storeName = "global-modal", position, body }) => {
      dispatch({
        type: ActionsApi.GLOBAL_MODAL.REQUEST,
        payload: { position, body },
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(memo(GlobalModal));
