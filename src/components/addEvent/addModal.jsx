import React, { useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { get } from "lodash";
import { Col, Row } from "react-grid-system";
import { withTranslation } from "react-i18next";
import Field from "../../containers/Form/field";
import FormDemo from "../../containers/Form/form-demo";
import SettingsActions from "../../modules/settings/actions";
import ApiActions from "../../services/api/actions";
import Button from "../elements/button";
import Icon from "../elements/icon";

const Container = styled.div`
  .modal {
    &__body {
      width: 680px;
      min-height: 558px;
      padding: 30px;
      box-sizing: border-box;
    }
  }
  .title {
    text-transform: uppercase;
    color: #777e91;
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
  }

  button {
    padding: 5px 10px !important;
    font-size: 10px;
    width: 100%;
    border-radius: 6px;
    margin-top: 20px;
  }

  .form-textarea {
    min-height: 120px !important;
    color: #353945;
    font-weight: 500;
    font-size: 12px;
    line-height: 18px;
    ::placeholder {
      color: #b1b5c4;
      font-weight: 400;
      font-size: 12px;
      line-height: 18px;
    }
  }

  .form-input {
    color: #353945;
    font-weight: 500;
    font-size: 12px !important;
    line-height: 18px;
    ::placeholder{
      font-weight: 400;
    }
  }

  .form-textarea-label {
    font-size: 10px;
  }

  .dropzone {
    width: 100%;
    height: 240px;
    border: 1px solid #45b36b;
    box-sizing: border-box;
    border-radius: 8px;
    background: #e2f5e9;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    .uploadIcon .icon-upload {
      width: 53.65px !important;
    }
    .uploadIcon {
      width: 65px !important;
    }

    .dropzone-title {
      color: #45b36b;
      margin-top: 30px;
      font-weight: 500;
      font-size: 24px;
      line-height: 24px;
    }

    .dropzone-desc {
      color: #777e91;
      font-weight: normal;
      font-size: 10px;
      line-height: 15px;
      margin-top: 10px;
    }
    .cancelModalBtn {
      button {
        width: 100% !important;
      }
    }

    .saveModalBtn {
      button {
        width: 100% !important;
      }
    }
  }
`;

export const ModalBtn = styled.button`
  width: 140px;
  height: 60px;
  background-color: #45b36b;
  border-radius: 6px;
  color: #fff;
`;

function AddModal({ onClose = () => {}, fileModalUpload, addItemRequest, t }) {
  const [speakerAvatarId, setSpeakerModalId] = useState("");

  const create = ({ data, setError }) => {
    data.photoId = speakerAvatarId;
    addItemRequest({
      attributes: data,
      formMethods: {
        setError,
      },
      cb: {
        success: (res) => {},
        fail: (res) => {},
      },
    });
  };

  const uploadFile = (file) => {
    const formData = new FormData();
    formData.append("file", file);
    fileModalUpload({
      attributes: formData,
      formMethods: { setLoading: () => {} },
      cb: {
        success: ({ id }) => {
          setSpeakerModalId(id);
        },
      },
    });
  };

  return (
    <Container>
      <FormDemo formRequest={create}>
        <div className="title">Add spicker</div>
        <Row>
          <Col xs={5.37}>
            <Field type="dropzone" onChange={(file) => uploadFile(file)} name={"photoId"} params={{ required: true }}>
              <div className="dropzone">
                <Icon icon="icon-upload" color="#45B36B" size="xl" className="uploadIcon" />
                <p className="dropzone-title">{t("upload_image") ?? "Upload image"}</p>
                <p className="dropzone-desc">{t("max_image_size") ?? "MAX Image size"} 1920 x 1080</p>
              </div>
            </Field>
          </Col>
          <Col
            xs={6.63}
            style={{
              paddingLeft: "0 !important",
              marginTop: "15px",
            }}
          >
            <Field
              type="input"
              name={"firstName"}
              label={t("name") ?? "NAME"}
              placeholder = {`${t("enter_name_placeholder") ?? "Enter name"}...`}
              params={{ required: true }}
            />
            <Field
              type="input"
              name={"lastName"}
              label={t("surname") ?? "SURNAME"}
              placeholder = {`${t("enter_surname_placeholder") ?? "Enter surname"}...`}
              style={{ marginTop: "20.5px" }}
              params={{ required: true }}
            />
            <Field
              type="input"
              name={"position"}
              label={t("position") ?? "POSITION"}
              placeholder = {`${t("enter_position_placeholder") ?? "Enter position"}...`}
              style={{ marginTop: "20.5px" }}
              params={{ required: true }}
            />
          </Col>
        </Row>
        <Row style={{ marginTop: "20px" }}>
          <Col xs={12}>
            <Field
              type="textarea"
              name={"description"}
              label={t("description") ??  "DESCRIPTION"}
              placeholder = {`${t("enter_description_placeholder") ?? "Enter description"}...`}
              params={{ required: true }}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={8.8}></Col>
          <Col xs={3.2}>
            <Row>
              <Col xs={6} style={{ paddingRight: "4px" }}>
                <Button className="cancelModalBtn" outlineDanger onCLick={() => onClose()}>
                  {t("cancel") ?? "Cancel"}
                </Button>
              </Col>
              <Col xs={6} style={{ paddingLeft: "4px" }}>
                <Button type="submit" className="saveModalBtn"  success onCLick={() => onClose()}>
                  {t("save") ?? "Save"}
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </FormDemo>
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    speakerData: get(state, "api.data.speaker", {}),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fileModalUpload: ({ attributes, formMethods = {}, cb }) => {
      dispatch({
        type: SettingsActions.FILE_UPLOAD.REQUEST,
        payload: {
          attributes,
          formMethods,
          cb,
        },
      });
    },
    addItemRequest: ({ attributes, formMethods, cb }) => {
      dispatch({
        type: ApiActions.OPERATION_ADD.REQUEST,
        payload: {
          attributes,
          formMethods,
          cb,
          url: "sales/v1/speaker",
        },
      });
    },
  };
};

export default withTranslation("pdp")(connect(mapStateToProps, mapDispatchToProps)(AddModal));
