import React, { useState } from "react";
import Field from "../../../containers/Form/field";
import classNames from "classnames";

const PayrollCheckbox = ({ checkable, i, id }) => {
  const [checked, setChecked] = useState(false);
  return (
    <div>
      <span className={classNames("orderNumber", { checked: checked })}>{i + 1}</span>
      {checkable && (
        <Field
          defaultValue={false}
          onChange={() => setChecked((state) => !state)}
          name={`${id}`}
          className="order-checkbox"
          type="checkbox"
        />
      )}
      {/* <input class onChange={(e) => setCheckbox(e.target.value)} type={'checkbox'}/> */}
    </div>
  );
};

export default PayrollCheckbox;
