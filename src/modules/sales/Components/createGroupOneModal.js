import React, { memo } from "react";
import styled from "styled-components";
import FormDemo from "../../../containers/Form/form-demo";
import Field from "../../../containers/Form/field";
import Flex from "../../../components/elements/flex";
import Button from "../../../components/elements/button";

export const Style = styled.div`
  .modal__body {
    padding: 20px;
    min-width: 400px;
  }

  .form-input-container {
    height: 38px;
    border-radius: 6px;
    margin-top: 3px;
    margin-bottom: 20px;
  }

  .form-label {
    font-weight: 600;
    font-size: 10px;
    line-height: 12px;
    color: #a7adbf;
  }

  button {
    border-radius: 6px;
  }

  .save {
    margin-left: 10px;
  }
`;

const CreateGroupOne = ({ t, modalRequest, request, id, getData, submit, children }) => {
  const create = submit ?? (({ data }) => {
    request({
      attributes: data,
      url: `education/v1/group/student/manual/${id}`,
      method: "post",
      cb: {
        success: () => {
          getData();
          modalRequest({
            position: false,
            props: { onCloseDisabled: false },
            body: "",
          });
        },
        fail: (e) => "",
      },
    });
  })
  return (
    <FormDemo formRequest={create} mainClassName={"form"}>
      {children}
      <Flex justify={"flex-end"}>
        <Button
          danger={"1"}
          onCLick={() =>
            modalRequest({
              position: false,
              props: { onCloseDisabled: false },
              body: "",
            })
          }
        >
          {t("cancel") ?? "Cancel"}
        </Button>
        <Button className={"save"} success={"1"} type={"submit"}>
          {t("save") ?? "Save"}
        </Button>
      </Flex>
    </FormDemo>
  );
};

export default memo(CreateGroupOne);
