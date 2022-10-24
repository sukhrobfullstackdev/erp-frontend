import React, { memo, useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { toast } from "react-toastify";
import errorImg from "../../assets/icons/error2.svg";
import { withTranslation } from "react-i18next";
import Field from "../../containers/Form/field";

const Styled = styled.div`
  height: 100%;

  input {
    padding: 0px 12px;
    cursor: default;
    height: 100%;
  }

  ${({ focus }) =>
    focus &&
    css`
      border: 1px solid #45b36b;

      input {
        cursor: text;
      }
    `}

  ${({ valid }) =>
    !valid &&
    css`
    input {
      width: 89% !important;
    }import Field from '../../containers/Form/field';


    border: 1px solid #EF466F;
  `}
`;

const EmailField = ({
  updateItemRequest = () => {},
  setLoading = () => {},
  initialValue = "",
  rowId = null,
  id = null,
  editable = false,
  t,
  viewId,
  ...rest
}) => {
  const [value, setValue] = useState(initialValue ?? "");
  const [isEditable, setIsEditable] = useState(false);
  const [valid, setValid] = useState(true);
  const [focus, setFocus] = useState(false);

  useEffect(() => {
    setValue(initialValue ?? "");
  }, [initialValue]);

  const onChange = (e) => {
    setValue(e.target.value);
    if (e.target.value === "") setValid(true);
  };

  const onBlur = () => {
    setValue(initialValue ?? "");
    setIsEditable(false);
    setFocus(false);
  };

  const handleEditable = () => {
    setIsEditable(editable);
    setFocus(true);
  };

  const handleEnter = (event) => {
    if (event.keyCode === 13) {
      if (/.+@.+\.[A-Za-z]+$/.test(value)) {
        setValid(true);
        setLoading(true);
        updateItemRequest({
          id: rowId,
          // viewId,
          attributes: { [id]: value },
          cb: {
            success: () => {
              setLoading(false);
              toast.success("SUCCESSFULLY UPDATED");
            },
            fail: () => {
              setLoading(false);
            },
          },
        });
      } else {
        setValid(false);
      }
    }
  };
  return (
    <Styled {...{ valid, focus, ...rest }}>
      <Field type={"regex-input"} />
      {!valid && (
        <img
          src={errorImg}
          alt={"error"}
          data-tip={t("invalid-email-address-entered") ?? "invalid email address entered"}
          data-place={"top"}
          data-effect={"solid"}
          data-for={"errorToolTip"}
        />
      )}
    </Styled>
  );
};

export default withTranslation("pdp")(memo(EmailField));
