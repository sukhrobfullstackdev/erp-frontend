import { get, isEqual, isNull } from "lodash";
import React, { memo, useState } from "react";
import { Col, Row } from "react-grid-system";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import Button from "../../../../../components/elements/button";
import Dropdown from "../../../../../components/elements/dropDown";
import Icon from "../../../../../components/elements/icon";
import Square from "./square";
import { Styled } from "./style";
import Modal from "../../../../../components/elements/modal";
import Field from "../../../../../containers/Form/field";
import FormDemo from "../../../../../containers/Form/form-demo";
import Flex from "../../../../../components/elements/flex";
import CustomField from "./CustomField";
import ActionsApi from "../../../../../services/api/actions";
import CustomFieldModal from "./customFieldModal";
import { Style } from "./customFieldStyle";
import Message from "components/elements/message";
import ApiActions from "../../../../../services/api/actions";

const BodyStudentsData = ({
  studentsData,
  activeStudent,
  setActiveStudent,
  changeCellParticipated,
  participatedLessonWithIndexAndBoolean,
  changeStudentStatus,
  match,
  changeStateAfterUpdateData,
  modalRequest,
  postStudentInvoice,
  t,
  selectedLessonContentId,
  setSelectedLessonContentId,
  modalMoveStudents,
  moveStudents,
}) => {
  const [modalOpened, setModalOpened] = useState(false);
  const [actionTypeForStudent, setActionTypeForStudent] = useState(null);
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const [selectedStudentForAction, setSelectedStudentForAction] = useState(null);
  const [insertModal, setInsertModal] = useState({
    invoice: false,
    moveStudent: false,
  });
  const [selectedIds, setSelectedIds] = useState([]);
  const [groups, setGroups] = useState([]);
  const [groupId, setGroupId] = useState("");

  const clickStudentData = (index) => {
    setActiveStudent(activeStudent === index ? null : index);
    setSelectedLessonContentId(null);
  };

  const openStopAndPlayModal = (type, student) => {
    setModalOpened(true);
    setActionTypeForStudent(type);
    setSelectedStudentForAction(student);
  };

  const colors = { ABSENT: "red", PARTICIPATED: "green", LEFT: "grey" };

  const getCellType = (lessonIndex, attendance) => {
    return participatedLessonWithIndexAndBoolean && get(participatedLessonWithIndexAndBoolean, "index", -1) === lessonIndex
      ? get(participatedLessonWithIndexAndBoolean, "checked", false)
        ? "green"
        : "red"
      : get(colors, get(attendance, "status", ""), "disabled");
  };

  const getOpacity = (lessonContentId, attendance) => {
    return get(attendance, "status", "") === "" ? "" : selectedLessonContentId === lessonContentId ? "" : "opaque";
  };

  const getClassName = (lessonIndex) => {
    return isNull(activeStudent) ? "" : activeStudent !== lessonIndex ? "parantDisabled" : "";
  };

  const changeStudentStatusHandling = (student, status, lessonNumber) => {
    if (lessonNumber) {
      changeStudentStatus(
        {
          timeTableId: get(match, "params.timeTableId"),
          studentId: get(student, "id"),
          lessonNumber,
          status,
        },
        {
          success: (res) => {
            setActionTypeForStudent(null);
            setSelectedStudentForAction(null);
            setModalOpened(false);
            toast.success(get(res, "message", ""));
            changeStateAfterUpdateData(
              {
                data: {
                  result: {
                    data: get(res, "data", {}),
                  },
                },
              },
              "timeTableData"
            );
          },
        }
      );
    }
  };
  const modalSubmitHandling = ({ data }) => {
    changeStudentStatusHandling(selectedStudentForAction, actionTypeForStudent, get(data, "lessonNumber", 0));
  };

  const body = (ids) => (
    <>
      <CustomFieldModal
        customFieldUrl={"education/v1/time-table-student/add-custom-field"}
        ids={ids}
        getUrl={"education/v1/time-table-student/custom-fields/"}
        url={"education/v1/time-table-student/add-custom-field-value-list/"}
        onClose={() =>
          modalRequest({
            position: false,
            props: { onCloseDisabled: false },
            body: "",
          })
        }
      />
    </>
  );

  const handleClick = (ids) => {
    modalRequest({
      position: true,
      props: { onCloseDisabled: false, Style },
      body: body(ids),
    });
  };

  const getInvoiceValue = (item) => setSelectedIds(item);

  const sendStudentInvoice = ({ student, index }) => {
    setInsertModal((s) => ({ ...s, invoice: true, student, index }));
  };

  const sendStudentInvoiceInfo = (studentId) => {
    selectedIds.length === 0
      ? toast.warning("Choose timeTable!")
      : postStudentInvoice(
          selectedIds,
          {
            success: (res) => {
              toast.success(res.message);
              setInsertModal((s) => ({ ...s, invoice: false }));
            },
            fail: (e) => "",
          },
          studentId
        );
  };

  const getMoveStudent = (studentId) => {
    setInsertModal((s) => ({ ...s, moveStudent: true, studentId }));
    modalMoveStudents({
      success: (res) => {
        setGroups(res.data);
      },
      fail: (e) => "",
    });
  };

  const moveStudent = (studentId, fromTimeTableId, toGroupId) => {
    moveStudents(
      {
        success: (res) => {
          toast.success(res.message);
          setInsertModal((s) => ({ ...s, moveStudent: false }));
        },
        fail: (e) => "",
      },
      {
        studentId,
        fromTimeTableId,
        toGroupId,
      }
    );
  };

  return (
    <Styled yes="1" no="1">
      {get(studentsData, "result.data.students", [])?.map((student, index) => (
        <div key={get(student, "id", "sd" + index)} className="lesson__table__row">
          <div className="lesson__table__col first">
            <div
              className={`col-user ${activeStudent === index && "colActiveUser"} ${
                isEqual(get(student, "timeTableStatus", ""), "LEFT") && "leftStudent"
              }`}
              onClick={() => !dropDownOpen && clickStudentData(index)}
            >
              <div className="d-flex">
                <span className="col-user-index">{index + 1}</span>
                <div className="col-user-info">
                  <span className="col-user-name">{student.fullName}</span>
                  <span className="col-user-number">{student.phoneNumber}</span>
                </div>
              </div>
              <Dropdown
                isFixed={"1"}
                onChange={setDropDownOpen}
                button={
                  <Button className="btn" semiBold>
                    <Icon icon="icon-more-dots" />
                  </Button>
                }
              >
                <div className="dropdown">
                  {isEqual(get(student, "timeTableStatus", ""), "ACTIVE") && (
                    <div className="dropdown-card" onClick={() => openStopAndPlayModal("LEFT", student)}>
                      {t("time_table_stop_student") ?? "Stop student"}
                    </div>
                  )}
                  {isEqual(get(student, "timeTableStatus", ""), "LEFT") && (
                    <div className="dropdown-card" onClick={() => openStopAndPlayModal("ACTIVE", student)}>
                      {t("time_table_play_student") ?? "Play student"}
                    </div>
                  )}
                  <div className="dropdown-card">Action 3</div>
                  <div className="dropdown-card" onClick={() => handleClick(student.id)}>
                    Custom Field
                  </div>
                  <div className="dropdown-card" onClick={() => sendStudentInvoice({ student, index })}>
                    generate Invoice
                  </div>
                  <div className="dropdown-card" onClick={() => getMoveStudent(student.id)}>
                    Move
                  </div>
                </div>
              </Dropdown>
            </div>
          </div>
          <div className={`lesson__table__parent ${!isNull(activeStudent) && activeStudent !== index && "parantDisabled"}`}>
            <div className="lesson__table__col date">
              <span className="lesson__table__col__number user ">
                {student.numberOfAttendLessons}/{student.numberOfCanAttendLessons}
              </span>
            </div>
          </div>
          {get(studentsData, "result.data.lessons.options", []).map((lesson, lessonIndex) => {
            let attendance = get(student, `attendances[${lessonIndex}]`, {});
            return (
              <CustomField
                key={student.id + get(lesson, "lessonContentId")}
                id={student.id + get(lesson, "lessonContentId")}
                studentAttendanceId={get(student, `attendances[${lessonIndex}].id`, "")}
                className="context_menu"
              >
                <Square
                  onClick={() => changeCellParticipated(get(attendance, "id", ""))}
                  lessonStatus={get(attendance, "lessonStatus", "")}
                  className={`lesson__table__parent ${getClassName(index)}`}
                  type={getCellType(lessonIndex, attendance)}
                  opacity={getOpacity(get(lesson, "lessonContentId", ""), attendance)}
                />
              </CustomField>
            );
          })}
        </div>
      ))}
      <Modal active={insertModal.invoice || insertModal.moveStudent} onClose={() => setInsertModal({})}>
        <FormDemo>
          <Field
            type={insertModal.invoice ? "custom-select" : "custom-select"}
            {...(insertModal.invoice ? { isMulti: "s" } : {})}
            options={insertModal.invoice ? get(studentsData, "result.data.timeTable.options", []) : groups}
            valueKey={"id"}
            labelKey={"name"}
            maxShowSelected={2}
            className="invoice"
            defaultValue={insertModal.invoice ? " " : "  "}
            name={insertModal.invoice ? "invoice" : "moveStudent"}
            label={insertModal.invoice ? "generate Invoice" : "Move student"}
            placeholder={insertModal.invoice ? "Select timeTable" : "Select group"}
            onChange={(item) => (insertModal.invoice ? getInvoiceValue(item) : setGroupId(item))}
          />
        </FormDemo>
        <div className="invoiceBtn">
          <Button outlineDanger onCLick={() => setInsertModal({})}>
            Cancel
          </Button>
          <Button
            outline_success
            onCLick={() =>
              insertModal.invoice
                ? sendStudentInvoiceInfo(get(insertModal.student, "id", insertModal.index))
                : moveStudent(insertModal.studentId, get(studentsData, "result.data.timeTable.value", []), groupId)
            }
          >
            {insertModal.invoice ? "Send" : "Move"}
          </Button>
        </div>
      </Modal>
      <Modal active={modalOpened} onClose={() => setModalOpened(false)} className="modal lessonModal">
        <FormDemo formRequest={modalSubmitHandling}>
          <Row>
            <Col xs={12} className={"mb-15"}>
              <Field
                type={"input"}
                name={"lessonNumber"}
                label={
                  isEqual(actionTypeForStudent, "ACTIVE")
                    ? t("which_lesson_starting_time_table") ?? "Which lesson starting student?"
                    : t("which_lesson_stopping_time_table") ?? "Which lesson stopping student?"
                }
                params={{ required: true }}
                property={{ type: "number" }}
              />
            </Col>
            <Col xs={12}>
              <Flex justify={"flex-end"} align={"center"}>
                <Button outlineDanger className="cancelBtn" onCLick={() => setModalOpened(false)}>
                  Cancel
                </Button>
                <Button success className="addBtn" type={"submit"}>
                  Save
                </Button>
              </Flex>
            </Col>
          </Row>
        </FormDemo>
      </Modal>
    </Styled>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    modalRequest: ({ position, body, props }) => {
      dispatch({
        type: ActionsApi.GLOBAL_MODAL.REQUEST,
        payload: { position, body, props },
      });
    },
    postStudentInvoice: (attributes, cb, studentId) => {
      dispatch({
        type: ApiActions.REQUEST.REQUEST,
        payload: {
          method: "post",
          attributes,
          cb,
          url: `education/v1/time-table/invoice/multiple-generate/${studentId}`,
        },
      });
    },
    modalMoveStudents: (cb) => {
      dispatch({
        type: ApiActions.REQUEST.REQUEST,
        payload: {
          method: "get",
          cb,
          url: `education/v1/group/id-and-name`,
        },
      });
    },
    moveStudents: (cb, attributes) => {
      dispatch({
        type: ApiActions.REQUEST.REQUEST,
        payload: {
          method: "put",
          attributes,
          cb,
          url: `education/v1/time-table/student/move`,
        },
      });
    },
  };
};

export default connect(null, mapDispatchToProps)(withTranslation("pdp")(memo(BodyStudentsData)));
