import styled from "styled-components";

const QuickControlWrapper = styled.div`
  position: fixed;
  top: 130px;
  display: flex;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;

  button {
    background: transparent;
    padding: 12px;
    border-radius: 40px;
    height: 100%;
    outline: none;
    border: none;
  }

  .controls,
  .close {
    border-radius: 40px;
    padding: 6px;
  }

  .controls {
    background: #353945;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.16);
    margin-right: 16px;

    .control {
      &:hover {
        background-color: var(--green-back);
      }
    }
  }

  .close {
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.16);
    background-color: #ef466f;

    .close-btn {
      .icon {
        width: 32px !important;
        height: 32px !important;
      }
    }
  }
`;

export default QuickControlWrapper;
