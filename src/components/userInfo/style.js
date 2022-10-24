import styled from "styled-components";

export const Container = styled.div`
  width: 90%;
  margin: 0 auto;
  padding: 20px 0;
  body {
    position: relative;
  }
  .modal {
    align-items: flex-end;
    margin-bottom: 20px;
    background: none;
    top: 0;
    bottom: 0;
    transition: 40ms;
  }
  .modal__body {
    width: 100%;
    padding: 0;
    margin-left: 100px;
  }
  .justify {
    justify-content: start;
  }
`;

export const MainButton = styled.button`
  width: 260px;
  height: 64px;
  background: #353945;
  box-shadow: 0px 24px 24px -16px rgba(15, 15, 15, 0.2);
  border-radius: 12px;
  margin-left: auto;
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 24px;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  position: absolute;
  bottom: 108px;
  right: 38px;
`;

export const ModalTop = styled.div`
  height: 72px;
  background-color: inherit;
  border-bottom: 0.5px solid #e6e8ec;
  box-sizing: border-box;
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  border-radius: 10px 10px 0 0;

  .add-lead-btn {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-weight: 600;
    font-size: 14px;
    line-height: 14px;
    text-align: center;
    color: #f4f5f6;
    background: #45b36b;
    border-radius: 8px;
    padding: 13px;
  }

  .hide-modal-btn {
    background: #e6e8ec;
    border-radius: 8px;
    padding: 14.5px;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
