import styled from "styled-components";

export const FilterStyled = styled.div`
  .filter {
    &__body {
      width: 260px;
      background: #ffffff;
      border: 1px solid #e6e8ec;
      box-sizing: border-box;
      box-shadow: 0px 40px 32px -24px rgba(15, 15, 15, 0.12);
      border-radius: 8px;
      padding: 8px 12px 10px;
      &__title {
        font-weight: 600;
        font-size: 10px;
        line-height: 24px;
        color: #b1b5c4;
      }
      &__body {
        &__filterContainer {
          display: flex;
          &__where {
            font-weight: 500;
            font-size: 10px;
            line-height: 15px;
            color: #353945;
          }
          &__option {
          }
          &__is {
          }
          &__name {
          }
          &__and {
          }
          &__date {
          }
          &__mutliSelect {
          }
        }
      }
      &__footer {
        display: flex;
        justify-content: space-between;
        margin-top: 14px;
        &__template {
          display: flex;
          align-items: center;
          background: #fafafb;
          border: 0.5px solid #e6e8ec;
          box-sizing: border-box;
          border-radius: 6px;
          font-weight: 500;
          font-size: 10px;
          line-height: 15px;
          color: #777e91;
          cursor: pointer;
          padding: 6.5px 8px 6.5px 9.5px;
          transition: 0.3s;

          &:hover,
          &.active {
            background: rgba(69, 179, 107, 0.1);
            border: 0.5px solid #45b36b;
            color: #45b36b;
            .ui__icon__wrapper {
              .icon-file {
                background-color: rgba(69, 179, 107, 1);
              }
            }
          }
          &:hover {
            background: rgba(69, 179, 107, 0.2);
            .ui__icon__wrapper {
              .icon-file {
                background-color: rgba(69, 179, 107, 0.8);
              }
            }
          }
          .ui__icon__wrapper {
            width: 12px;
            height: 12px;
            .icon-file {
              width: 11px;
              height: 11px;
            }
          }
        }
      }
    }
  }
`;
