import React from "react";
import { SelectPicker } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import styled from "styled-components";

const Styled = styled.div`
  .test {
    padding: 20px;
  }
  .rs-picker-toggle .rs-btn .rs-btn-default {
    border: none;
  }

  .rs-picker-toggle.rs-btn .rs-picker-toggle-clean {
    display: none;
  }
  .rs-picker-toggle-wrapper .rs-picker-toggle.rs-btn {
    padding: 5px 5px 5px 13px;
  }
  .rs-picker-toggle-textbox {
    padding: 0;
  }
  .rs-picker-toggle.rs-btn .rs-picker-toggle-caret {
    right: 5px;
  }
  .rs-picker-default .rs-picker-toggle.rs-btn .rs-picker-toggle-caret,
  .rs-picker-default .rs-picker-toggle.rs-btn .rs-picker-toggle-clean {
    top: 5px;
    color: rgba(53, 57, 69, 1);
  }
`;

const SearchSelect = ({
  menuClassName,
  mainStyle,
  renderItemStyle,
  renderValueStyle,
  renderMenuStyle,
  renderMenuGroupStyle,
  ...props
}) => {
  return (
    <Styled>
      {/* <SelectPicker {...props} /> */}
      {true && (
        <SelectPicker
          {...props}
          style={{ ...mainStyle }}
          menuClassName={menuClassName}
          renderMenu={(menu) => {
            return <div style={{ ...renderMenuStyle }}>{menu}</div>;
          }}
          renderMenuItem={(label, item) => {
            return <div style={{ ...renderItemStyle }}>{label}</div>;
          }}
          renderMenuGroup={(label, item) => {
            return <div style={{ ...renderMenuGroupStyle }}>{label}</div>;
          }}
          renderValue={(value, item, selected) => {
            return <span style={{ ...renderValueStyle }}>{selected}</span>;
          }}
        />
      )}
    </Styled>
  );
};

export default SearchSelect;
