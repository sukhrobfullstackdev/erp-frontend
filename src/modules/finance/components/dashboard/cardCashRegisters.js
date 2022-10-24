import { memo } from "react";
import styled from "styled-components";
import { isString } from "lodash";

const Style = styled.div`
  width: 100%;
  height: 104px;

  background: #ffffff;
  box-shadow: 0 0 10px 2px rgba(12, 12, 12, 0.03);
  border-radius: 18px;
  padding: 20px 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-weight: 500;

  .name {
    font-size: 16px;
    line-height: 24px;
    color: #777e91;
  }

  .amount {
    font-size: 20px;
    line-height: 30px;
    color: #353945;
  }
`;

const CardCashRegisters = ({ name, amount, currencyType, ...rest }) => {
  if (!isString(amount)) amount = String(amount);

  amount = new Intl.NumberFormat("fr-FR", { currency: "UZS" }).format(amount);

  return (
    <Style {...rest}>
      <div className="name">{name}</div>
      <div className="amount">
        {amount} {currencyType}
      </div>
    </Style>
  );
};

export default memo(CardCashRegisters);
