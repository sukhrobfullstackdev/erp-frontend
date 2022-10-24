import { get, isEmpty, isEqual } from "lodash";
import React, { useEffect, useState } from "react";
import Field from "../../../../../containers/Form/field";
import FormDemo from "../../../../../containers/Form/form-demo";
import { getSelectOptionsListFromListData } from "../../../../../utils";
import { Col, Row } from "react-grid-system";
import Flex from "../../../../../components/elements/flex";
import Button from "../../../../../components/elements/button";
import Modal from "../../../../../components/elements/modal";
import styled from "styled-components";
import Message from "components/elements/message";
import { toast } from "react-toastify";
import MiniLoader from "../../../../../components/loader/mini-loader";

const Style = styled.div`
  .editWeekDays,
  .editHoursModal,
  .editMentorModal {
    padding: 5px 10px;
    height: 100%;
    display: flex;
    align-items: center;
    border-radius: 5px 0 0 5px;
    opacity: 0.8;
  }

  .select__body {
    left: 10px !important;
  }
`;

const TimetableSelect = ({
  timeTableData,
  selectTimeTable,
  selectedTimeTable,
  match,
  history,
  t,
  mentors,
  sendInvoice,
  editTimeTable,
}) => {
  const [modalOpenState, setModalOpenState] = useState({
    editWeekDaysModal: false,
    editHoursModal: false,
    editMentorModal: false,
    editGanarateInvoice: false,
    editMove: false,
  });
  const [editingTimeTable, setEditingTimeTable] = useState(null);
  const [timeTableId, setTimeTableId] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (
      !isEmpty(timeTableData) &&
      get(timeTableData, "result", "") &&
      get(match, "params.id") &&
      !get(match, "params.timeTableId")
    ) {
      let historyUrl = get(history, "location.pathname", "");
      historyUrl =
        historyUrl.lastIndexOf("/") === historyUrl.length - 1 ? historyUrl.substring(0, historyUrl.length - 1) : historyUrl;
      history.push(`${historyUrl}/${get(selectedTimeTable, "id")}`);
    }
  }, [selectedTimeTable]);

  const DropDownOptions = ({ optionsIndex, value, label }) => {
    return (
      <>
        <div
          className={"editWeekDays"}
          onClick={() => {
            openEditModal({ editWeekDaysModal: true }, optionsIndex);
          }}
        >
          {t("select_weekdays") ?? "Select weekdays"}
        </div>
        <div className={"editHoursModal"} onClick={() => openEditModal({ editHoursModal: true }, optionsIndex)}>
          {t("select_lesson_hour") ?? "Select lesson hour"}
        </div>
        <div className={"editMentorModal"} onClick={() => openEditModal({ editMentorModal: true }, optionsIndex)}>
          {t("select_mentor") ?? "Select mentor"}
        </div>
        <div
          className={"editMentorModal"}
          onClick={() => {
            openEditModal({ editGanarateInvoice: true }, optionsIndex);
            setTimeTableId(value);
          }}
        >
          {t("generate_invoice") ?? "Generate invoice"}
        </div>
      </>
    );
  };

  const modalSubmitHandling = ({ data }) => {
    if (editingTimeTable) {
      let attr = {};
      let url = "";

      if (get(modalOpenState, "editWeekDaysModal", false)) {
        url = "weekday";
        attr = { weekdays: get(data, "name", []) };
      } else if (get(modalOpenState, "editHoursModal", false)) {
        url = "lesson-time";
        attr = {
          lessonStartTime: get(data, "name", ""),
          lessonEndTime: get(data, "endHour", ""),
        };
      }

      url = get(modalOpenState, "editMentorModal", false)
        ? `mentor?mentorId=${Object.keys(mentors).join("")}&timeTableId=${get(editingTimeTable, "id", "")}`
        : url + "/" + get(editingTimeTable, "id", "");

      if (!isEmpty(String(get(data, "name")))) {
        setLoading(true);
        editTimeTable(attr, url, {
          success: (res) => {
            toast.success(res.message);
            setModalOpenState({});
            setLoading(false);
          },
          fail: (e) => setLoading(false),
        });
      } else toast.warning("You have not chosen value!");
    }
  };

  const openEditModal = (editType, timeTableIndex) => {
    setModalOpenState({ ...modalOpenState, ...editType });
    setEditingTimeTable(get(timeTableData, "result.data.timeTable.options", [])[timeTableIndex]);
  };

  const makeOptions = () => {
    if (get(modalOpenState, "editWeekDaysModal", false)) {
      return getSelectOptionsListFromListData(get(editingTimeTable, "weekdays.value", []));
    } else if (get(modalOpenState, "editMentorModal", false)) {
      return getSelectOptionsListFromListData(Object.values(mentors));
    }

    return [];
  };

  const getDefaultValue = () => {
    if (get(modalOpenState, "editWeekDaysModal", false)) {
      return get(editingTimeTable, "weekdays.value", []);
    } else if (get(modalOpenState, "editMentorModal", false)) {
      return get(editingTimeTable, "mentor.id", "");
    } else return "";
  };

  const sendInvoiceInfo = () => {
    sendInvoice(timeTableId, {
      success: (res) => {
        toast.success(res.message);
        setModalOpenState({});
      },
      fail: (err) => "",
    });
  };

  return (
    <Style>
      <FormDemo>
        <Field
          type="custom-select"
          options={get(timeTableData, "result.data.timeTable.options", [])}
          hideLabel
          nullable={false}
          defaultValue={get(selectedTimeTable, "id")}
          name={"select"}
          isSearchable={true}
          onChange={(val) => !isEqual(get(selectedTimeTable, "id"), val) && selectTimeTable(val)}
          valueKey="id"
          labelKey="name"
          action={{
            create: true,
            edit: true,
            url: "url",
            items: [DropDownOptions],
          }}
          isFixed={"1"}
        />
      </FormDemo>
      <Modal
        active={
          modalOpenState.editHoursModal ||
          modalOpenState.editWeekDaysModal ||
          modalOpenState.editMentorModal ||
          modalOpenState.editGanarateInvoice
        }
        onClose={() => setModalOpenState({})}
        className="modal lessonModal"
      >
        {modalOpenState.editGanarateInvoice ? (
          <>
            <Message
              status="info"
              message="generate Invoice"
              yes={() => sendInvoiceInfo()}
              no={() => setModalOpenState({})}
              close={() => setModalOpenState({})}
              confirm
            />
          </>
        ) : (
          <FormDemo formRequest={modalSubmitHandling}>
            <Row>
              <Col xs={12} className={"mb-15"}>
                <Field
                  type={
                    get(modalOpenState, "editHoursModal", false)
                      ? "clock"
                      : get(modalOpenState, "editWeekDaysModal", false)
                      ? "custom-select"
                      : get(modalOpenState, "editMentorModal", false) && "custom-select"
                  }
                  name={"name"}
                  options={makeOptions()}
                  defaultValue={getDefaultValue()}
                  nullable={false}
                  isMulti={get(modalOpenState, "editWeekDaysModal", false)}
                  label={
                    get(modalOpenState, "editHoursModal", false)
                      ? t("select_lesson_hour") ?? "Select lesson hour"
                      : get(modalOpenState, "editWeekDaysModal", false)
                      ? t("select_weekdays") ?? "Select weekdays"
                      : get(modalOpenState, "editMentorModal", false) && (t("select_mentor") ?? "Select mentor")
                  }
                  params={{ required: true }}
                />
                {get(modalOpenState, "editHoursModal", false) && (
                  <Field
                    type={"clock"}
                    name={"endHour"}
                    label={t("select_lesson_hour") ?? "Select lesson hour"}
                    params={{ required: true }}
                  />
                )}
              </Col>
              <Col xs={12}>
                <Flex justify={"flex-end"} align={"center"}>
                  <Button outlineDanger className="cancelBtn" onCLick={() => setModalOpenState({})}>
                    Cancel
                  </Button>
                  <Button success className="addBtn" type={"submit"}>
                    {loading ? <MiniLoader /> : "Save"}
                  </Button>
                </Flex>
              </Col>
            </Row>
          </FormDemo>
        )}
      </Modal>
    </Style>
  );
};

export default TimetableSelect;
