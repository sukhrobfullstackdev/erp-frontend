import React, { useEffect, useMemo, useState } from "react";
import { get, isEmpty } from "lodash";
import { connect } from "react-redux";
import ApiActions from "../../../../services/api/actions";
import Checkbox from "components/elements/checkbox";
import QuickControl from "components/QuickControl";
import CustomTable from "../../../../components/customTable";
import { withTranslation } from "react-i18next";
import Select from "../../../../components/elements/select/Select";
import { formatDate } from "../../../../utils";
import SearchAndAdd from "../../../hr/components/searchAndAdd";
import ActionsApi from "../../../../services/api/actions";
import CreateGroupOne, { Style } from "../../Components/createGroupOneModal";
import SettingsActions from "../../../settings/actions";
import Flex from "../../../../components/elements/flex";
import Button from "../../../../components/elements/button";
import FormDemo from "../../../../containers/Form/form-demo";
import Field from "../../../../containers/Form/field";
import { toast } from "react-toastify";

const ComponentMiddle = ({ t, group, timeTable, changeTimeTable }) => {
  const [state, setState] = useState({
    lessonStartTime: 0,
    lessonEndTime: 0,
    weekDays: [],
  });

  useEffect(() => {
    let timetable = get(timeTable, "options", [])?.find((item) => item?.id === get(timeTable, "value", null));
    setState({
      lessonStartTime: get(timetable, "lessonStartTime", 0),
      lessonEndTime: get(timetable, "lessonEndTime", 0),
      weekDays: get(timetable, "weekdays.value", []),
    });
  }, [timeTable]);

  return (
    <div className="head">
      <div className="card-box">
        <p className="title">{t("specialization") ?? "specialization"}</p>
        <p className="description">{get(group, "specialization.name", "")}</p>
      </div>
      <div className="card-box">
        <p className="title">{t("group_type") ?? "Guruh turi"}</p>
        <p className="description">{get(group, "groupType.name", "")}</p>
      </div>
      <div className="card-box">
        <p className="title">{t("group_name") ?? "Guruh nomi"}</p>
        <p className="description">{get(group, "name", "")}</p>
      </div>
      <div className="card-box">
        <p className="title">{t("timetable") ?? "Timetable"}</p>
        <p className="description">
          <Select
            isChangeDefaultValue={0}
            options={get(timeTable, "options", [])}
            defaultValue={get(timeTable, "value", null)}
            valueKey={"id"}
            labelKey={"name"}
            onChange={changeTimeTable}
          />
        </p>
      </div>
      <div className="card-box">
        <p className="title">{t("lesson_time") ?? "Dars vaqti"}</p>
        <p className="description">
          {formatDate(new Date(state.lessonStartTime), "HH:mm")} / {formatDate(new Date(state.lessonEndTime), "HH:mm")}
        </p>
      </div>
      <div className="card-box">
        <p className="title">{t("Days_of_the_week") ?? "Hafta kunlari"}</p>
        <p className="description">{state.weekDays.join(", ")}</p>
      </div>
    </div>
  );
};

const ListContainer = ({
  t,
  match: {
    params: { id },
  },
  name,
  specializationList,
  groupTypeList,
  getFormData,
  formData,
  branches,
  specialization,
  groupType,
  entities,
  getData,
  groupOne,
  modalRequest,
  request,
  fileUpload,
  ...rest
}) => {
  const [selectedIds, setSelectedIds] = useState({});
  const [search, setSearch] = useState("");

  const updateData = () => getData(id);

  useEffect(() => {
    updateData();
  }, []);

  const submitDelete = () => {
    request({
      attributes: Object.keys(selectedIds),
      url: `education/v1/group/student/return/${get(groupOne, "timeTable.value", null)}`,
      method: "put",
      cb: {
        success: () => {
          modalRequest({
            position: false,
            props: { onCloseDisabled: false },
            body: "",
          });
          setSelectedIds({});
          updateData();
        },
        fail: (e) => "",
      },
    });
  };

  const submitInvoice = () => {
    request({
      attributes: Object.keys(selectedIds),
      url: `education/v1/group/invoice/${get(groupOne, "timeTable.value", null)}`,
      method: "post",
      cb: {
        success: () => {
          modalRequest({
            position: false,
            props: { onCloseDisabled: false },
            body: "",
          });
          updateData();
          setSelectedIds({});
        },
        fail: (e) => "",
      },
    });
  };

  const submitStartOrStop = (isStart) => {
    request({
      attributes: {
        studentIdList: Object.keys(selectedIds),
        timeTableId: get(groupOne, "timeTable.value", null),
        status: isStart ? "ACTIVE" : "LEFT",
      },
      url: `education/v1/time-table/student/status/multiple`,
      method: "patch",
      cb: {
        success: () => {
          modalRequest({
            position: false,
            props: { onCloseDisabled: false },
            body: "",
          });
          setSelectedIds({});
          updateData();
        },
        fail: (e) => "",
      },
    });
  };

  const openModalDialog = ({ message, submit }) => {
    modalRequest({
      position: true,
      props: { onCloseDisabled: true, Style },
      body: (
        <CreateGroupOne {...{ t, modalRequest, request, id: get(groupOne, "timeTable.value", null), submit }}>
          <div className="mt-20 mb-20">
            <b>{message}</b>
          </div>
        </CreateGroupOne>
      ),
    });
  };

  const btns = [
    {
      icon: "icon-documentsFileEdit",
      name: "Generate Invoices",
      onClick: () => {
        openModalDialog({
          message: t("do_you_want_to_generate_invoices") ?? "Do you want to generate invoices?",
          submit: submitInvoice,
        });
      },
    },
    {
      icon: "icon-folderGroup",
      name: "Delete students",
      onClick: () => {
        openModalDialog({ message: t("do_you_want_to_delete") ?? "Do you want to delete it?", submit: submitDelete });
      },
    },
    {
      icon: "icon-handSelectStop",
      name: "Stop students",
      onClick: () => {
        openModalDialog({ message: t("do_you_want_to_stop") ?? "Do you want to stop?", submit: () => submitStartOrStop(false) });
      },
    },
    {
      icon: "icon-polygon",
      name: "Start Students",
      onClick: () => {
        openModalDialog({
          message: t("do_you_want_to_start") ?? "Do you want to start it?",
          submit: () => submitStartOrStop(true),
        });
      },
    },
  ];

  let columns = useMemo(
    () => [
      {
        Header: "Name",
        clickRow: (row) => {
          changeItem(!selectedIds[row.userId], row.userId);
        },
        columns: [
          {
            Header: "#",
            accessor: "number",
            width: 100,
            customColumn: ({ value, rowIndex, cell, ...rest }) => {
              const isChecked = selectedIds[cell.row.original.userId];
              return isChecked ? (
                <Checkbox onChange={(v) => changeItem(v, cell.row.original.userId)} defaultValue={isChecked} />
              ) : (
                rowIndex + 1
              );
            },
          },
          {
            Header: "FIO",
            accessor: "student",
            width: 200,
            Cell: ({ value, row }) => {
              return `${get(value, "firstName", "")} ${get(value, "lastName", "")}`;
            },
          },
          {
            Header: "INVOICE NUMBER",
            accessor: "invoiceNumber",
            width: 200,
            Cell: ({ value, row }) => {
              return value;
            },
          },
          {
            Header: "INVOICE AMOUNT",
            accessor: "invoiceAmount",
            width: 200,
          },
          {
            Header: "LOAN INV AMOUNT",
            accessor: "invoiceLeftAmount",
            width: 200,
          },
          {
            Header: "PAID INV AMOUNT",
            accessor: "invoicePaidAmount",
            width: 200,
            Cell: ({ value, row }) => {
              return value;
            },
          },
          {
            Header: "STUDENT STATUS",
            accessor: "studentStatus",
            width: 200,
            Cell: ({ value, row }) => {
              return value;
            },
          },
        ],
      },
    ],
    [selectedIds]
  );

  const changeItem = (value, id) => {
    setSelectedIds((selectedIds) => {
      let data = { ...selectedIds, [id]: value };
      if (!value) delete data[id];
      return data;
    });
  };

  const changeTimeTable = (itemId) => getData(id, itemId);

  const openModal = () => {
    modalRequest({
      position: true,
      props: { onCloseDisabled: true, Style },
      body: (
        <CreateGroupOne
          {...{
            t,
            modalRequest,
            request,
            id: get(groupOne, "timeTable.value", null),
            getData: () => getData(id, get(groupOne, "timeTable.value", null)),
          }}
        >
          <Field type={"input"} name={"firstName"} label={t("firstName") ?? "First Name"} />
          <Field type={"input"} name={"lastName"} label={t("lastName") ?? "Last Name"} />
          <Field type={"input"} name={"phoneNumber"} label={t("phoneNumber") ?? "Phone Number"} property={{ type: "number" }} />
        </CreateGroupOne>
      ),
    });
  };

  const uploadFile = (file) => {
    const formData = new FormData();
    formData.append("file", file);
    fileUpload({
      url: `education/v1/group/student/excel?timeTableId=${get(groupOne, "timeTable.value", null)}`,
      attributes: formData,
      cb: {
        success: () => {
          toast.info("File uploaded");
          getData(id);
        },
        fail: (e) => "",
      },
    });
  };

  const filter = (data, search) => {
    if (search.trim() === "") return data;

    return data.filter((item) => {
      return item.student.firstName.toLowerCase().includes(search.toLowerCase());
    });
  };

  return (
    <>
      <SearchAndAdd buttonText={""} changeSearchHandling={setSearch}>
        <FormDemo>
          <Field type={"file"} name={"file"} onChange={uploadFile} hideLabel>
            <Button bg={"#141416"} success={"1"}>
              {t("upload_excel") ?? "+ Upload Excel"}
            </Button>
          </Field>
        </FormDemo>
        <Button className={"create"} success={"1"} onCLick={openModal}>
          {t("create") ?? "Create"}
        </Button>
      </SearchAndAdd>
      {!isEmpty(selectedIds) && <QuickControl btns={btns} onClose={() => setSelectedIds({})} />}
      <ComponentMiddle
        {...{
          t,
          group: get(groupOne, "group", {}),
          timeTable: get(groupOne, "timeTable", {}),
          changeTimeTable,
        }}
      />
      <CustomTable columns={columns} data={filter(get(groupOne, "studentInvoices", []), search)} />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    groupOne: get(state, "api.group-one.data.result.data", {}),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getData: (id, timeTableId) => {
      dispatch({
        type: ApiActions.GET_DATA.REQUEST,
        payload: {
          url: `education/v1/group/student?groupId=${id}${timeTableId ? `&timeTableId=${timeTableId}` : ""}`,
          method: "get",
          storeName: "group-one",
        },
      });
    },
    modalRequest: ({ position, body, props }) => {
      dispatch({
        type: ActionsApi.GLOBAL_MODAL.REQUEST,
        payload: { position, body, props },
      });
    },
    request: ({ url, method = "get", cb, attributes }) => {
      dispatch({
        type: ApiActions.REQUEST.REQUEST,
        payload: {
          attributes,
          method,
          url,
          cb,
        },
      });
    },
    fileUpload: ({ url, attributes, formMethods = {}, cb }) => {
      dispatch({
        type: SettingsActions.FILE_UPLOAD.REQUEST,
        payload: { url, attributes, formMethods, cb },
      });
    },
  };
};

export default withTranslation("pdp")(connect(mapStateToProps, mapDispatchToProps)(ListContainer));
