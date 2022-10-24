import Checkbox from "components/elements/checkbox";
import QuickControl from "components/QuickControl";
import Search from "components/search";
import { get } from "lodash";
import moment from "moment";
import numeral from "numeral";
import React, { useEffect, useMemo, useState } from "react";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import CustomTable from "../../../../components/customTable";
import Field from "../../../../containers/Form/field";
import ApiActions from "../../../../services/api/actions";
import { formatDate } from "../../../../utils";
import CreateGroupOne, { Style } from "../../Components/createGroupOneModal";

const ComponentMiddle = ({ t, data }) => {
  return (
    <div className="head">
      <div className="card-box">
        <p className="title">{t("specialization") ?? "specialization"}</p>
        <p className="description">{get(data, "specialization.name", "")}</p>
      </div>
      <div className="card-box">
        <p className="title">{t("group_type") ?? "Guruh turi"}</p>
        <p className="description">{get(data, "groupType.name", "")}</p>
      </div>
      <div className="card-box">
        <p className="title">{t("admission_start_date") ?? "Admission boshlanish sanasi"} </p>
        <p className="description">{moment(get(data, "startDate", 0)).format("DD/MM/yyyy")}</p>
      </div>
      <div className="card-box">
        <p className="title">{t("admission_end_date") ?? "Admission tugash sanasi"}</p>
        <p className="description">{moment(get(data, "endDate", 0)).format("DD/MM/yyyy")}</p>
      </div>
      <div className="card-box">
        <p className="title">{t("lesson_time") ?? "Dars vaqti"}</p>
        <p className="description">
          {formatDate(new Date(get(data, "lessonStartTime")), "HH:mm")} /{" "}
          {formatDate(new Date(get(data, "lessonEndTime")), "HH:mm")}
        </p>
      </div>
      <div className="card-box">
        <p className="title">{t("Days_of_the_week") ?? "Hafta kunlari"}</p>
        <p className="description">{get(data, "weekdays", []).join(", ")}</p>
      </div>
    </div>
  );
};

const ListContainer = ({
  t,
  match: {
    params: { id },
  },
  request,
  getData,
  data,
  modalRequest,
  ...rest
}) => {
  const [selectedIds, setSelectedIds] = useState({});
  const [search, setSearch] = useState("");

  const updateData = () => {
    getData(id);
  };

  useEffect(() => {
    updateData();
  }, []);

  const changeItem = (value, id) => {
    setSelectedIds((selectedIds) => {
      let data = { ...selectedIds, [id]: value };
      if (!value) delete data[id];
      return data;
    });
  };

  const submit = ({ data: { groupId } }) => {
    let data = { groupId, admissionId: id, studentIdList: Object.keys(selectedIds) };
    request({
      attributes: data,
      url: `education/v1/group/student/multiple`,
      method: "post",
      cb: {
        success: () => {
          modalRequest({
            position: false,
            props: { onCloseDisabled: false },
            body: "",
          });
          toast.success(t("saved") ?? "Saved");
          updateData();
          setSelectedIds({});
        },
        fail: (e) => "",
      },
    });
  };

  const openModal = (data) => {
    modalRequest({
      position: true,
      props: { onCloseDisabled: true, Style },
      body: (
        <CreateGroupOne {...{ t, modalRequest, request, id: get(data, "admission.id", null), submit }}>
          <div className="mb-20">
            <Field
              type={"custom-select"}
              options={data}
              labelKey={"name"}
              valueKey={"id"}
              name={"groupId"}
              label={t("group") ?? "Group"}
            />
          </div>
        </CreateGroupOne>
      ),
    });
  };

  const submitDelete = () => {
    request({
      attributes: Object.keys(selectedIds),
      url: `education/v1/admission/student/${id}`,
      method: "put",
      cb: {
        success: () => {
          modalRequest({
            position: false,
            props: { onCloseDisabled: false },
            body: "",
          });
          toast.success(t("successfully_deleted") ?? "Successfully deleted");
          updateData();
          setSelectedIds({});
        },
        fail: (e) => "",
      },
    });
  };

  const submitInvoice = () => {
    request({
      attributes: Object.keys(selectedIds),
      url: `education/v1/admission/invoice/${id}`,
      method: "post",
      cb: {
        success: () => {
          modalRequest({
            position: false,
            props: { onCloseDisabled: false },
            body: "",
          });
          toast.success(t("successfully_generated_invoices") ?? "Successfully generated invoices");
          updateData();
          setSelectedIds({});
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
        <CreateGroupOne {...{ t, modalRequest, request, id: get(data, "admission.id", null), submit }}>
          <div className="mt-20 mb-20">
            <b>{message}</b>
          </div>
        </CreateGroupOne>
      ),
    });
  };

  const btns = [
    {
      icon: "icon-folderGroupPlus",
      name: "Add students to group",
      onClick: () => {
        request({
          url: `education/v1/group/group-type-and-specialization?groupTypeId=${get(
            data,
            "admission.groupType.id",
            -1
          )}&specializationId=${get(data, "admission.specialization.id", -1)}`,
          method: "get",
          cb: {
            success: (data) => {
              openModal(get(data, "data", []));
            },
            fail: (e) => "",
          },
        });
      },
    },
    {
      icon: "icon-documents-file",
      name: "Remove student from admission",
      onClick: () => {
        openModalDialog({ message: t("do_you_want_to_delete") ?? "Do you want to delete it?", submit: submitDelete });
      },
    },
    {
      icon: "icon-documentsFileEdit",
      name: "Generate invoices",
      onClick: () => {
        openModalDialog({
          message: t("do_you_want_to_generate_invoices") ?? "Do you want to generate invoices?",
          submit: submitInvoice,
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
            accessor: "student.firstName",
            width: 200,
          },
          {
            Header: "INVOICE NUMBER",
            accessor: "invoiceNumber",
            width: 200,
          },
          {
            Header: "INVOICE AMOUNT",
            accessor: "invoiceAmount",
            width: 200,
            Cell: ({ value, row }) => {
              return numeral(value).format("0,0");
            },
          },
          {
            Header: "LOAN INV AMOUNT",
            accessor: "invoiceLeftAmount",
            width: 200,
            customColumn: ({ cell }) => {
              const value = cell.render("Cell").props.value;
              const style = { color: "#EF466F" };

              return <p style={value < 0 ? style : {}}>{numeral(value).format("0,0")}</p>;
            },
          },
          {
            Header: "PAID INV AMOUNT",
            accessor: "invoicePaidAmount",
            width: 200,
            Cell: ({ value, row }) => {
              return numeral(value).format("0,0");
            },
          },
        ],
      },
    ],
    [selectedIds]
  );

  const filter = (data, search) => {
    if (search.trim() === "") return data;

    return data.filter((item) => {
      return item.student.firstName.toLowerCase().includes(search.toLowerCase());
    });
  };

  return (
    <>
      {(Object.values(selectedIds).length && (
        <QuickControl
          btns={btns}
          onClose={() => {
            setSelectedIds({});
          }}
        />
      )) ||
        ""}
      <div className="headPanel">
        <Search changeSearchHandling={setSearch} />
      </div>
      <ComponentMiddle
        {...{
          t,
          data: get(data, "admission", {}),
        }}
      />
      <CustomTable columns={columns} data={filter(get(data, "studentInvoices", []), search)} />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    data: get(state, "api.admission-one.data.result.data", {}),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getData: (id) => {
      dispatch({
        type: ApiActions.GET_DATA.REQUEST,
        payload: {
          url: `education/v1/admission/student/${id}`,
          method: "get",
          storeName: "admission-one",
        },
      });
    },
    modalRequest: ({ position, body, props }) => {
      dispatch({
        type: ApiActions.GLOBAL_MODAL.REQUEST,
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
  };
};

export default withTranslation("pdp")(connect(mapStateToProps, mapDispatchToProps)(ListContainer));
