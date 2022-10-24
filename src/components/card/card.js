import React from "react";
import { CardStyled } from "./cardStyle";
import { Col, Row } from "react-grid-system";
import { isArray } from "lodash";
import Button from "../elements/button";
import styled from "styled-components";
import Icon from "../elements/icon";
import plus from "../../assets/images/plus-white.png";
import classNames from "classnames";
import { useHistory } from "react-router-dom";
const ContainerSty = styled.div`
  width: 856px;
  background: #f4f5f6;
  border: 1px solid #e6e8ec;
  border-radius: 12px;
  box-sizing: border-box;
  margin: 0;

  .container__row__border {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 20px;
    box-sizing: border-box;
    height: 54px;
    border-bottom: 1px solid #e6e8ec;
    background: #353945;
    border-radius: 12px 12px 3px 3px;
  }
  .container__header__text {
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
    color: #fff;
  }
  .container__header__btn {
    width: 68px;
    height: 30px;
    background: #45b36b;
    border-radius: 6px;
    color: #f4f5f6;
    font-weight: 600;
    font-size: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .container__main {
    min-height: 245px;
    display: flex;
    justify-content: space-between;
    padding: 16px 16px 22px 16px;
    box-sizing: border-box;
    margin: 0px auto;
    overflow-y: hidden;
    justify-content: ${({ justify }) => justify || "start"};
    margin-left: ${({ justify }) => justify || "0"};
    &::-webkit-scrollbar {
      width: 7px;
      height: 11px;
      padding: 5px;
    }

    &::-webkit-scrollbar-track {
      /* display: none; */
      padding: 5px;
    }

    &::-webkit-scrollbar-thumb {
      background: rgba(119, 126, 144, 1);
      padding: 5px;
      border-radius: 5px;
      transition: 0.2s;
    }

    &::-webkit-scrollbar-thumb:hover {
      background: rgba(119, 126, 144, 0.8);
    }
  }
`;

const Card = ({
  dataArray,
  title = "MAIN PHONE",
  isBtn = false,
  addDefaultValue,
  showLeadModal,
  isCard = false,
  setLeadState,
  ...props
}) => {
  const history = useHistory();

  return (
    <ContainerSty {...props}>
      <span className="container__row__border">
        <div className="container__header__text">{title}</div>
        {isBtn && (
          <button
            className="container__header__btn"
            onClick={(e) => {
              e.preventDefault();
              addDefaultValue(false);
              showLeadModal("additional");
            }}
          >
            <img src={plus} alt="plus" width="20px" height="20px" style={{ marginRight: "4px", marginLeft: "-4px" }} />
            ADD
          </button>
        )}
      </span>
      <span className="container__main">
        {isArray(dataArray) &&
          dataArray.map((value, index) => (
            <CardStyled
              key={index}
              onClick={(e) => {
                e.preventDefault();
                history.push(`/sales/sales/lead/edit/${value.id}`);
                setLeadState((s) => ({ ...s, active: false }));
              }}
            >
              <div
                className={classNames("cardContainer", {
                  pile: value.enabled == false,
                })}
              >
                {value.clientNo ? <div className="card__header"></div> : <div className="card__headerNo"></div>}
                <Row
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Col md={5}>
                    {value.studentImg ? (
                      <img className="card__img" src={value.studentImg} />
                    ) : (
                      <Icon className="card__img" icon={"icon-userImg"} />
                    )}
                  </Col>
                  <Col md={7} style={{ padding: 0 }}>
                    <span className="card__firstName">{value.firstName}</span>
                    <span className="card__phone">{value.phoneNumber}</span>
                    {value.clientNo ? (
                      <span className="card__ourClient">OUR CLIENT</span>
                    ) : (
                      <span className="card__notRegis">NOT REGISTR</span>
                    )}
                  </Col>
                </Row>
                <div className="card__footer">
                  {value.who && value.who.value && (
                    <Button className="btnstyle" light_success={value.who.color} outlineDanger={!value.who.color}>
                      {value.who.value}
                    </Button>
                  )}
                  <span className="card_fot_count">{value.countRes}</span>
                </div>
              </div>
            </CardStyled>
          ))}
      </span>
    </ContainerSty>
  );
};
export default Card;
