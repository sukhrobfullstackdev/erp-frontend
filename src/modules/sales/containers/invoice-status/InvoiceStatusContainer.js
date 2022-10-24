import InvoiceHeaderCard from "modules/sales/containers/invoice-status/components/invoice-head-card";
import React, { memo, useCallback, useEffect, useState } from "react";
import InvoiceStatusItem from "./components/invoice-status-item";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";
import Modal from "components/elements/modal";
import styled from "styled-components";
import AddStatus from "./components/AddStatus";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import ApiActions from "services/api/actions";
import { toast } from "react-toastify";
import DeleteModalBody from "containers/GridView/components/DeleteModalBody";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const InvoiceStatusStyle = styled.div`
  position: relative;
  padding: 30px 0;
  min-height: 92vh;
  width: 100% !important;
  overflow-x: auto;
  background: #f5f5f5;

  .invoice__status__container {
    padding: 0 40px;
  }

  .invoice__status__body {
    display: flex;
    flex-wrap: nowrap;
    min-height: 400px;
    padding-bottom: 40px;
    margin-right: 40px;
  }

  .invoice__col {
    width: 300px;
    min-width: 300px;
    display: flex;
    margin: 0 12px;
    flex-direction: column;
    gap: 25px;

    &.add__status__col {
      width: 340px;
      min-width: 340px;
      display: flex;
      justify-content: flex-start;
    }
  }

  .config__modal__body {
    padding: 15px;
    padding-bottom: 24px;
    .modal__title {
      font-weight: 600;
      font-size: 18px;
      margin-bottom: 24px;
    }

    .modal__content {
      display: flex;
      flex-wrap: wrap;
      gap: 30px;
      justify-content: center;
    }
  }

  .add__status {
    width: 300px;
    min-width: 300px;
    border: 1px solid #e6e8ec;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    text-transform: uppercase;
    font-weight: 600;
    color: #b1b5c4;
    background-color: #fff;
    cursor: pointer;
    margin-right: 20px;
  }
`;

const InvoiceStatusContainer = ({ match: {}, request, t }) => {
  const [invoiceModal, setInvoiceModal] = useState(null);
  const [deleteModal, setDeleteModal] = useState(null);
  const [data, setData] = useState({
    statuses: [],
    options: [],
    configs: [],
  });

  const getAllData = useCallback(() => {
    request({
      url: `sales/v1/invoice-status/for-manage`,
      method: "get",
      cb: {
        success: (res) => {
          setData(res.data);
        },
        fail: (err) => console.log(err),
      },
    });
  }, [setData]);

  useEffect(() => {
    getAllData();
  }, []);

  const submitCrud = useCallback((data) => {
    request({
      url: `sales/v1/invoice-status/crud`,
      method: "post",
      cb: {
        success: (res) => {
          toast.success("SUCCESSFULLY " + data.crudOption);
          setData(res.data);
        },
        fail: (err) => {
          getAllData();
          toast.error(err.message);
        },
      },
      attributes: data,
    });
  }, []);

  const deleteStatus = useCallback(
    (id) => {
      submitCrud({
        crudOption: "DELETE_STATUS",
        id,
      });
    },
    [submitCrud]
  );

  const addStatus = useCallback(
    (data) => {
      submitCrud({
        crudOption: "CREATE_STATUS",
        addStatus: data,
      });
    },
    [submitCrud]
  );

  const editStatus = useCallback(
    (id, data) => {
      submitCrud({ crudOption: "EDIT_STATUS", editStatus: data, id });
    },
    [submitCrud]
  );

  const creatConfig = useCallback(
    (statusId, config) => {
      submitCrud({ crudOption: "CREATE_CONFIG", requiredField: { statusId, config } });
    },
    [submitCrud]
  );

  const deleteConfig = useCallback(
    (id) => {
      submitCrud({ crudOption: "DELETE_CONFIG", id });
    },
    [submitCrud]
  );
  const changeStatusIndex = useCallback(
    (id, data) => {
      console.log(data);
      submitCrud({ crudOption: "CHANGE_ORDER_INDEX", id, changeOrderIndex: data });
    },
    [submitCrud]
  );

  const onDragEnd = (result) => {
    const newItems = Array.from(data.statuses);
    const [removed] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, removed);

    const bottom = newItems[result.destination.index + 1]?.orderIndex || null;
    const top = newItems[result.destination.index - 1]?.orderIndex || null;

    if (result.destination.index !== result.source.index) {
      setData({ ...data, statuses: newItems });
      changeStatusIndex(result.draggableId, { bottom, top });
    }
  };

  return (
    <InvoiceStatusStyle>
      <SimpleBar className="invoice__status__container">
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable_invoice_status" direction="horizontal">
            {(provided) => (
              <div {...provided.droppableProps} className="invoice__status__body" ref={provided.innerRef}>
                {data.statuses.map((status, index) => (
                  <Draggable key={status.id} draggableId={`${status.id}`} index={index}>
                    {(provided, snapshot) => (
                      <div
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        snapshot={snapshot}
                        className="invoice__col"
                      >
                        <InvoiceHeaderCard
                          {...status}
                          remove={{ deleteModal: setDeleteModal, deleteFunction: deleteStatus }}
                          editStatus={editStatus}
                        />
                        {data.configs.map((config, index) => (
                          <InvoiceStatusItem
                            {...config}
                            key={config.id ?? index}
                            active={
                              config.continuous && status.type !== "LOST"
                                ? status.orderIndex >= data.statuses.find((s) => s.id === config.statusId).orderIndex
                                : status.id === config.statusId
                            }
                            remove={{ deleteModal: setDeleteModal, deleteFunction: deleteConfig }}
                            isHeadItem={status.id === config.statusId}
                          />
                        ))}
                        <InvoiceStatusItem
                          {...status}
                          isEmpty={true}
                          key={index}
                          addConfig={(statusId) => setInvoiceModal(statusId)}
                          active={false}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}

                <div className="invoice__col add__status__col">
                  <AddStatus addStatus={addStatus} />
                </div>
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </SimpleBar>

      {/* Config Modal */}
      <Modal width={1200} active={invoiceModal} onClose={() => setInvoiceModal(null)}>
        <div className="config__modal__body">
          <h3 className="modal__title">Config</h3>
          <div className="modal__content">
            {data.options.map((option, i) => (
              <InvoiceStatusItem
                key={option.config ?? i}
                {...option}
                active={true}
                addConfig={(config) => {
                  creatConfig(invoiceModal, config);
                  setInvoiceModal(null);
                }}
                itemType="modal_item"
              />
            ))}
          </div>
        </div>
      </Modal>

      {/* Delete Modal */}
      <Modal active={deleteModal} onClose={() => setDeleteModal(null)}>
        <DeleteModalBody
          confirmText={deleteModal?.name}
          cancel={() => setDeleteModal(null)}
          id={1}
          remove={() => {
            setDeleteModal(null);
            deleteModal?.deleteFunction(deleteModal?.id);
          }}
        />
      </Modal>
    </InvoiceStatusStyle>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
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

export default withTranslation("pdp")(connect(null, mapDispatchToProps)(memo(InvoiceStatusContainer)));
