import React, { useEffect, useState } from "react";
import { get } from "lodash";
import { connect } from "react-redux";
import { Editor } from "react-draft-wysiwyg";
import { Col, Row } from "react-grid-system";
import { withTranslation } from "react-i18next";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { ContentState, convertFromHTML, EditorState } from "draft-js";
import { getSelectOptionsListFromListData } from "../../utils";
import SettingsActions from "../../modules/settings/actions";
import FormDemo from "../../containers/Form/form-demo";
import ApiActions from "../../services/api/actions";
import Button from "components/elements/button";
import Field from "../../containers/Form/field";
import Modal from "components/elements/modal";
import { Container } from "./eventStyle";
import Icon from "../elements/icon";
import AddModal from "./addModal";

const EventModalBody = ({ addOrEdit, cancel, item, event, openModal, fileUpload, addItemRequest, t }) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [avatarId, setAvatarId] = useState("");
  const [descText, setDescText] = useState("");
  const [active, setActive] = useState(false);

  useEffect(() => {
    setEditorState(
      EditorState.createWithContent(ContentState.createFromBlockArray(convertFromHTML(get(item, "description", ""))))
    );
    setDescText(get(item, "description", ""));
  }, [item]);

  const create = ({ data, setError }) => {
    data.description = descText.trim();
    data.photoId = avatarId;
    data.speakers = data.speakers.map((item) => ({ id: item }));

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

  const onContentStateChange = (contentState) => {
    contentState.blocks.forEach((val) => {
      setDescText(" " + val.text);
    });
  };

  const uploadFile = (file) => {
    const formData = new FormData();
    formData.append("file", file);
    fileUpload({
      attributes: formData,
      formMethods: { setLoading: () => {} },
      cb: {
        success: ({ id }) => {
          setAvatarId(id);
        },
      },
    });
  };
  return (
    <Container>
      <FormDemo formRequest={create}>
        <div className="allWrapper">
          <div className="upperInputForms">
            <Row className="allForm">
              <Col xs={4} className="dropzoneUrlWrapper">
                <Field
                  type="dropzone"
                  name={"photoId"}
                  onChange={(file) => uploadFile(file)}
                  className="fieldDrop"
                  params={{ required: true }}
                  defaultValue={get(item, "photoId")}
                >
                  <div className="dropzone">
                    <Icon icon="icon-upload" color="#45B36B" size="xl" className="uploadIcon" />
                    <p className="dropzone-title">{t("upload_image") ?? "Upload image"}</p>
                    <p className="dropzone-desc">{t("max_image_size") ?? "MAX Image size"} 1920 x 1080</p>
                  </div>
                </Field>
                <div className="urlInput">
                  <Field
                    type="input"
                    name={"url"}
                    label={"URL"}
                    className="url"
                    property={{
                      placeholder: "Enter url",
                      type: "url",
                    }}
                    params={{ required: true }}
                    defaultValue={get(item, "url")}
                  />
                </div>
              </Col>
              <Col xs={8} className="titleDesc">
                <Field
                  type="input"
                  name={"title"}
                  className="titleInput"
                  label={t("title") ?? "TITLE"}
                  placeholder = {`${t("enter_name_placeholder") ?? "Enter name"}...`}
                  params={{ required: true }}
                  defaultValue={get(item, "title")}
                />
                <div className="desc">
                  <label>{t("description") ?? "Description"}</label>
                  <div className="desc-pattern">
                    <Editor
                      editorState={editorState}
                      toolbarClassName="toolbarClassName"
                      wrapperClassName="wrapperClassName"
                      editorClassName="editorClassName"
                      onEditorStateChange={setEditorState}
                      onContentStateChange={onContentStateChange}
                      toolbar={{
                        options: ["inline", "fontFamily", "textAlign", "list", "link", "image", "emoji", "history"],
                        inline: {
                          options: ["bold", "italic", "underline"],
                        },
                        list: { options: ["ordered"] },
                        textAlign: {
                          options: ["left", "center"],
                        },
                        link: { options: ["link"] },
                      }}
                    />
                  </div>
                </div>
              </Col>
            </Row>
          </div>
          <div className="downInputForms">
            <Row className="upperInputs">
              <Col xs={4}>
                <Field
                  type="custom-datepicker"
                  className="date"
                  name={"date"}
                  label={t("date") ?? "DATE"}
                  defaultValue={get(item, "date")}
                  placeholder = {`${t("enter_date_placeholder") ?? "Enter date"}...`}
                  property={{
                    format: "yyyy-MM-dd",
                  }}
                  params={{ required: true }}
                />
              </Col>
              <Col xs={4}>
                <Field
                  type="custom-datepicker"
                  className="date"
                  name={"startTime"}
                  label={t("start_time") ?? "START TIME"}
                  defaultValue={get(item, "startTime")}
                  placeholder = {`${t("enter_time_placeholder") ?? "Enter time"}...`}
                  property={{
                    format: "HH:mm",
                  }}
                  params={{ required: true }}
                />
              </Col>
              <Col xs={4}>
                <Field
                  type="custom-datepicker"
                  className="date"
                  name={"endTime"}
                  label={t("end_time") ?? "END TIME"}
                  defaultValue={get(item, "endTime")}
                  placeholder = {`${t("enter_time_placeholder") ?? "Enter time"}...`}
                  property={{
                    format: "HH:mm",
                  }}
                  params={{ required: true }}
                />
              </Col>
            </Row>
            <Row className="downInputs">
              <Col>
                <Field
                  type="input"
                  className="date"
                  name="capacity"
                  label={t("number_of_places") ?? "NUMBER OF PlACES"}
                  defaultValue={String(get(item, "capacity", ""))}
                  placeholder = {`${t("enter_number_placeholder") ?? "Enter number"}...`}
                  property={{
                    type: "number",
                  }}
                  params={{ required: true }}
                />
              </Col>
              <Col>
                <Field
                  type="input"
                  className="date"
                  name="price"
                  label={t("prices") ?? "PRICES"}
                  defaultValue={String(get(item, "price", ""))}
                  placeholder = {`${t("enter_price_placeholder") ?? "Enter price"}...`}
                  property={{
                    type: "number",
                  }}
                  params={{ required: true }}
                />
              </Col>
              <Col>
                <Field
                  type="custom-select"
                  isMulti
                  options={get(event, "result.data.speakers.options", [])}
                  vlaueKey={"id"}
                  labelKey={"fullName"}
                  maxShowSelected={1}
                  className="date"
                  name={"speakers"}
                  label={t("speaker") ?? "SPEAKER"}
                  placeholder={`${t('select_placeholder') ?? "Select"}...`}
                  params={{ required: true }}
                  defaultValue={get(item, "speakers", []).map((item) => item.id)}
                  CustomIcon={() => (
                    <div className={"select__header__iconContainer"} >
                      <Icon
                        mainClassName="select__header__bottomArrow"
                        className="select__header__bottomArrow"
                        iconClassName="select__header__bottomArrow"
                        icon={"icon-bottom-arrow"}
                        color="#353945"
                      />
                      <div className="plusBtn" onClick = {() =>setActive(true)}>+</div>
                    </div>
                  )}

                  // Select defaultValue notog`ri chiqyabti

                />
              </Col>
            </Row>
            <Row className="lowestInputs">
              <Col xs={4}>
                <Field
                  options={getSelectOptionsListFromListData(get(event, "result.data.routes.options", []), "label", "value")}
                  defaultValue={get(item, "route")}
                  type="custom-select"
                  className="date secondSelect"
                  name={"route"}
                  label={t("route") ?? "ROUTE"}
                  placeholder={`${t('select_placeholder') ?? "Select"}...`}
                  params={{ required: true }}
                />
              </Col>
              <Col xs={4}>
                <Field
                  type="input"
                  className="date"
                  name={"address"}
                  label={t("address") ?? "ADDRESS"}
                  defaultValue={get(item, "address")}
                  placeholder = {`${t("enter_address_placeholder") ?? "Enter address"}...`}
                  params={{ required: true }}
                />
              </Col>
              <Col xs={4}>
                <Field
                  type="custom-datepicker"
                  className="date"
                  name={"announcementTime"}
                  label={t("date_of_announcement") ?? "DATE OF ANNOUNCEMENT"}
                  defaultValue={get(item, "announcementTime")}
                  params={{ required: true }}
                />
              </Col>
            </Row>
            <Row className="canSaveBtn">
              <Col xs={8}></Col>
              <Col xs={4}>
                <Row className="saveCancelBtns">
                  <Col xs={6}>
                    <Button className="cancelBtn" onClick={cancel}>
                      {t("cancel") ?? "Cancel"}
                    </Button>
                  </Col>
                  <Col xs={6}>
                    <Button className="cancelBtn saveBtn" type={"submit"}>
                     {t("save") ?? "Save"}
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
        </div>
      </FormDemo>
      <Modal className="speaker_modal" active={active} onClose={() => setActive(false)}>
        <AddModal onClose={() =>setActive(false)}/>
      </Modal>
    </Container>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    fileUpload: ({ attributes, formMethods = {}, cb }) => {
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
          url: "sales/v1/event",
        },
      });
    },
  };
};

export default withTranslation("pdp")(connect(mapDispatchToProps)(EventModalBody));
