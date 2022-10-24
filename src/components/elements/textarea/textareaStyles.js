import styled, { css } from "styled-components";

export const TextareaStyled = styled.textarea`
  background: #fafafb;
  border: 0.5px solid #e6e8ec;
  box-sizing: border-box;
  border-radius: 6px;
  outline: none;
  padding: 5px;
  resize: none;
  color: var(--default);
  /* width */
  ::-webkit-scrollbar {
    width: 4px;
    border-radius: 12px;
    cursor: default;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
    cursor: default;
    border-radius: 0 12px 12px 0;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: rgba(177, 181, 195, 0.8);
    border-radius: 12px;
    cursor: default;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: rgba(177, 181, 195, 1);
    border-radius: 12px;
    cursor: default;
  }
  ${({ theme: { mode } }) =>
    mode == "dark" &&
    css`
      background: #141416;
      border: 0.5px solid #353945;
      color: var(--dark--default);
    `}
`;
