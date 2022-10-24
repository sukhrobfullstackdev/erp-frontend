import styled from "styled-components";
import classNames from "classnames";
import { isArray, isString, get } from "lodash";
import Icon from "../../../../components/elements/icon";

const CardStyle = styled.div`
  background: #fcfcfd;
  border: 1px solid #e6e8ec;
  box-sizing: border-box;
  border-radius: 4px;
  transition: 0.3s;
  height: 200px;
  max-height: 200px;
  cursor: pointer;
  .card {
    &__head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 16px;
      &__title {
        font-weight: 500;
        font-size: 14px;
        line-height: 21px;
        color: #ef466f;
        text-transform: uppercase;
      }
      &__date {
        font-weight: 500;
        font-size: 12px;
        line-height: 18px;
        color: #353945;
        margin-right: 10px;
      }
      &__right {
        display: flex;
        align-items: center;
      }
    }
    &__body {
      padding: 16px;
      // #F4F5F6
      border-top: 1px solid rgba(244, 245, 246, 1);
      &__options {
        font-weight: 500;
        font-size: 12px;
        line-height: 18px;
        color: #353945;
        margin-bottom: 13px;
        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  }
  &.CANCELLED {
    background: #fff7f9;
    border: 1px solid #ef466f;
    .card__body {
      border-top: 1px solid #f8d9e0;
    }
  }
  &:hover {
    background: #ffffff;
  }
`;

const Card = ({ title, status = "STARTED", date = "", description = [], className = "", onClick }) => (
  <CardStyle
    onClick={onClick}
    className={classNames("card", {
      [className]: className,
      [status]: status,
    })}
  >
    <div className="card__head">
      <div className="card__head__left">
        <div className="card__head__title">{title}</div>
      </div>
      <div className="card__head__right">
        <div className="card__head__date">{date}</div>
        <Icon
          icon={
            status === "CANCELLED"
              ? "icon-x"
              : status === "STARTED"
              ? "icon-check3"
              : status === "COMPLETED"
              ? "icon-check3"
              : status === "NOT_LEARNED"
              ? "icon-check3"
              : ""
          }
          color={
            status === "STARTED" ? "#00B533" : status === "COMPLETED" ? "#00B533" : status === "CANCELLED" ? "#FF4842" : "#B1B5C4"
          }
        />
      </div>
    </div>
    <div className="card__body">
      {isArray(description) &&
        description.map((item, index) => (
          <div className="card__body__options" key={isString(item) ? item : get(item, "id", index)}>
            {index + 1}. {item.name}
          </div>
        ))}
    </div>
  </CardStyle>
);

export default Card;
