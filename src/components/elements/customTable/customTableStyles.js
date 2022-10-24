import styled, { css } from "styled-components";

export const DefaultCustomTableStyled = styled.div`
  width: max-content;
  .thead,
  .tr {
    display: flex;
    width: 100%;
  }
  .tbody {
    display: inline-block;
    width: 100%;
  }
  ${({ maxWidth }) =>
    maxWidth.dataWidth &&
    css`
      ${() => {
        let tmp = ``;
        let fullWidth = eval(Object.values(maxWidth.dataWidth).join("+"));
        maxWidth.dataWidth &&
          Object.keys(maxWidth.dataWidth).forEach((val) => {
            let widthPer = (100 * maxWidth.dataWidth[val]) / fullWidth;
            tmp += `.td[data-index=${val}] {
                width: ${widthPer}%;
            }`;
          });
        return tmp;
      }}
    `}
  ${({ center }) =>
    center &&
    css`
      .td {
        text-align: center;
      }
    `}
    ${({ border }) =>
    border &&
    css`
      .thead {
        .td {
          border-top: 1px solid black;
        }
      }
      .td {
        &:first-child {
          border-left: 1px solid black;
        }
        border-right: 1px solid black;
        border-bottom: 1px solid black;
      }
    `}
`;
export const CustomTableStyled = styled.div`
  .table {
    width: 1000px;
    .td {
      span {
        margin-right: 10px;
      }
    }
    .thead {
      .tr {
        background: #23262f;
        border-radius: 4px;
        .td {
          display: flex;
          align-items: center;
          font-weight: 500;
          font-size: 10px;
          line-height: 15px;
          color: #f4f5f6;
          padding: 12px 0px 13px 0px;
          &:first-child {
            padding-left: 16px;
          }
          &:last-child {
            padding-right: 12px;
            /* width: 30%; */
            display: flex;
            justify-content: flex-end;
          }
          span {
            margin-left: 5px;
          }
        }
      }
    }
    .tbody {
      margin: 10px 0 0;
      .tr {
        background: #fcfcfd;
        border-radius: 4px;
        margin: 0 0 7px;
        /* padding: 10px 10px 9px 19px; */
        /* box-sizing: border-box; */
        .td {
          font-weight: 500;
          font-size: 10px;
          line-height: 15px;
          color: #353945;
          padding: 10px 0px 9px 0px;
          box-sizing: border-box;
          &:first-child {
            padding-left: 19px;
          }
          &:last-child {
            /* width: 30%; */
            padding-right: 10px;
            display: flex;
            justify-content: flex-end;
          }
          .action {
            display: flex;
            span {
              display: flex;
              justify-content: center;
              align-items: center;
              width: 22px;
              height: 22px;
              margin: 0;
              background: rgba(244, 245, 246, 1);
              border-radius: 5px;
              cursor: pointer;
              transition: 0.2s;
              &:hover {
                background: rgba(234, 235, 236, 0.9);
              }
              &:first-child {
                margin-right: 4px;
              }
            }
          }
        }
      }
    }
  }
`;
