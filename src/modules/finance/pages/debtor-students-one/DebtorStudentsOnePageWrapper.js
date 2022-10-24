import styled from "styled-components";

const DebtorStudentsOnePageWrapper = styled.div`
  .pageContainer {
    background-color: white;
    border: 1px solid #f4f5f6;
    border-radius: 12px;
    margin: 20px auto;
    max-width: 1000px;
    padding: 30px;
    /* font-size: 14px; */

    .logo {
      margin-top: 20px;
      height: 36px;
    }

    .head-title {
      font-weight: 600;
      font-size: 14px;
      color: #353945;
      margin: 30px 0 16px 0;
    }

    .card-head {
      border-radius: 8px;
      background-color: #fcfcfd;
      padding: 20px 40px;

      hr {
        background-color: #f4f5f6;
      }

      .head {
        display: flex;
        justify-content: space-between;
        /* gap: 40px; */

        .card-box {
          /* width: 240px; */
          /* margin: 20px 0; */
          padding: 20px;
          font-family: Poppins;
          height: 100%;

          &:first-child {
            padding-left: 0px;
          }

          .title {
            font-weight: 600;
            font-size: 13px;
          }

          .description {
            font-size: 15px;
            color: #777e91;
          }
        }
      }
    }

    table {
      width: 100%;
      /* padding: 20px 50px; */
      border-collapse: separate;
      border-spacing: 0 4px;
      margin: 0 -10px;

      thead {
        background-color: #edeff2;
        border-radius: 8px;
      }

      tr {
        margin: 4px 0;
        border-radius: 8px;

        td,
        th {
          padding: 10px;
          text-align: left;
          font-size: 14px;
        }

        th {
          font-weight: 500;
        }

        td {
          font-weight: 400;
          background: #f8f9fa;
        }

        th:nth-child(1),
        td:nth-child(1) {
          border-radius: 8px 0px 0px 8px;
        }

        th:nth-last-child(1),
        td:nth-last-child(1) {
          border-radius: 0px 8px 8px 0px;
        }
      }
    }

    .line {
      display: flex;
      justify-content: space-between;

      p {
        margin: 6px 0;
      }
    }
    .active {
      background: var(--green-back);
    }

    .tabs {
      &__list {
        background: none;
        justify-content: inherit;
        height: auto;
        &__left {
          background: #f4f5f6;
          border-radius: 6px;
          height: 35px;
          align-items: center;
        }
        &__tab {
          min-width: 62px;
          height: 29px;
          margin: 0 3px;
          &.active {
            background: #45b36b;
            border-radius: 4px;
          }
        }
      }

      &__content {
        display: none;
      }
    }
  }
  .form-date-container {
    margin-left: 10px;
    .date__icon {
      top: 18%;
    }
    .datepicker__input {
      width: 150px;
      height: 35px;
      min-width: 30px;
      background: #f4f5f6;
      border-radius: 6px;
      //color: #f4f5f6;
      &::placeholder {
        //color: #f4f5f6;
      }
    }
  }
  .form-input-container {
    width: 232px;
    height: 35px;
    border-radius: 6px;
    margin: 30px 0 62px;
    input {
      font-weight: 400;
      font-size: 12px !important;
      line-height: 15px;
      &::placeholder {
        font-size: 12px;
      }
    }
    button {
      min-width: 49px;
      height: 28px;
      border-radius: 4px;
      padding: 0;
      margin-right: 3px;
      font-weight: 500;
      font-size: 12px;
      line-height: 15px;
    }
  }
  .first-row-of-footer {
    font-size: 18px;
    font-weight: 500;
  }
`;

export default DebtorStudentsOnePageWrapper;
