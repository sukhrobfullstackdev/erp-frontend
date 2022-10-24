import React from "react";
import styled from "styled-components";
import FormDemo from "../../../../containers/Form/form-demo";
import Field from "../../../../containers/Form/field";
import Icon from "../../../../components/elements/icon";

const StyledLink = styled.div`
  background-color: #fff;
  padding: 20px;
  .title {
    font-size: 16px;
    font-weight: 500;
    color: #777e90;
    margin-bottom: 20px;
  }
  .link_container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .form-label {
      display: none;
    }
    .form-input-container {
      border-radius: 6px;
      border: 1px solid #f4f5f6;
      .form-input {
        font-size: 14px;
        font-weight: 400;
        padding: 10px;
        min-width: 500px;
      }
    }
    .focused {
      border: 1px solid #45b36b;
    }
    .link {
      display: flex;
      align-items: center;
      background: #fcfcfd;
      border: 1px solid #f4f5f6;
      border-radius: 6px;
      min-height: 40px;
      padding: 8px;
      :focus,
      :active {
        border: 1px solid #45b36b;
      }
      .icon {
        width: 20px;
        height: 20px;
      }
      .icon-add-plus {
        width: 15px;
        height: 15px;
      }
      .form-input-container {
        border: none;
        height: 100%;
        .form-input {
          padding: 2px;
          height: 100%;
        }
      }
    }
  }
`;

const Link = () => {
  return (
    <StyledLink>
      <div className="title">USEFUL LINKS</div>
      <FormDemo>
        <div className="link_container">
          <Field type="input" name="description" property={{ placeholder: "Description" }} />
          <div className="link">
            <Field type="input" name="link" property={{ placeholder: "Useful links" }} />
            <Icon icon="icon-copy2" />
            <Icon icon="icon-add-plus" />
          </div>
        </div>
      </FormDemo>
    </StyledLink>
  );
};

export default Link;
