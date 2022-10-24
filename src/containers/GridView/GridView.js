import React, { memo, useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import { get, isEmpty, isNil, isNull } from "lodash";
import { InitialLoader } from "../../components/loader";
import Normalizer from "../../services/normalizer";
import ApiActions from "../../services/api/actions";
import ComponentDefaultBody from "./components/ComponentBody";
import ComponentDefaultHead from "./components/ComponentHead";
import { toast } from "react-toastify";

let requestStatus = true;

const GridView = ({
  ComponentHead = ComponentDefaultHead,
  ComponentBody = ComponentDefaultBody,
  ModalBody,
  callToRender,
  callToRenderTrigger,
  drawToRender,
  scheme,
  isFetched,
  entities,
  addItemRequest,
  deleteItemRequest,
  getOneRequest,
  item,
  updateItemRequest,
  getOneTrigger,
  columns,
  row,
  modalTitle = "",
  hasModal = {},
  redirect = {},
  filterSelects = [],
  selectedId,
  getAllOptions,
  dataForModal = {},
  selectOptions,
  disabledOnClose = false,
  getOneTriggerInApi,
  rightContent,
  buttonText = "Create new",
  hideSearch = false,
  searchFields,
  hideHeader = false,
  ComponentMiddle,
  dataForBody,
  ...rest
}) => {
  const [removeConfirm, setRemoveConfirm] = useState({
    id: null,
    text: null,
  });
  const [data, setData] = useState([]);

  const [state, setState] = useState({
    openModal: false,
    requestStatus: true,
    modalButtonDisabled: false,
  });

  useEffect(() => {
    if (!isNull(selectedId)) callToRender({});
    else setData([]);
  }, [selectedId]);

  useEffect(() => {
    setData(Normalizer.Denormalize(drawToRender, [scheme], entities));
  }, [drawToRender]);

  const addOrEdit = (id = null, { data, setError }) => {
    if (isNil(id)) {
      add({ attributes: { ...data }, formMethods: { setError } });
    } else {
      update({ id, attributes: { ...data }, formMethods: { setError } });
    }
  };
  const add = ({ attributes, formMethods }) => {
    setState((s) => ({ ...s, modalButtonDisabled: true }));
    addItemRequest({
      attributes,
      formMethods,
      cb: {
        success: ({ message = "SUCCESS" }) => {
          toast.success(message);
          setState((s) => ({ ...s, requestStatus: true, openModal: false, modalButtonDisabled: false }));
          requestStatus = true;
          emptyRemoveText();
          callToRender({});
        },
        fail: () => {
          requestStatus = false;
          setState((s) => ({ ...s, requestStatus: false, modalButtonDisabled: false }));
        },
      },
    });
  };
  const update = ({ id, attributes, formMethods }) => {
    setState((s) => ({ ...s, modalButtonDisabled: true }));
    updateItemRequest({
      id,
      attributes,
      formMethods,
      cb: {
        success: ({ message = "SUCCESS" }) => {
          toast.success(message);
          setState((s) => ({ ...s, requestStatus: true, openModal: false, modalButtonDisabled: false }));
          requestStatus = true;
          emptyRemoveText();
          callToRender();
        },
        fail: (res) => {
          requestStatus = false;
          setState((s) => ({ ...s, requestStatus: false, modalButtonDisabled: false }));
        },
      },
    });
  };
  const remove = (id) => {
    deleteItemRequest({
      id,
      formMethods: {},
      cb: {
        success: ({ message = "SUCCESS" }) => {
          emptyRemoveText();
          toast.success(message);
          callToRender();
          setState((s) => ({ ...s, openModal: false }));
        },
        fail: () => {},
      },
    });
  };
  const openModalOrLink = () => {
    getOneTrigger();
    setState((s) => ({ ...s, openModal: true }));
    getOneTriggerInApi();
  };
  const emptyRemoveText = () => setRemoveConfirm({ id: null, text: null });

  const search = useCallback((str) => {
    // console.log(str)
  }, []);

  let DenormalizeData = Normalizer.Denormalize(drawToRender, [scheme], entities);
  // item = Normalizer.Denormalize(item, {result: {data: scheme}}, entities);

  const searchFromView = (value, column) => {
    value = String(value).toLowerCase().trim();
    let res = DenormalizeData.filter((item) => {
      let temp = false;
      column.forEach((v) =>
        String(get(item, `${v.customField}`, ""))
          .toLowerCase()
          .includes(value)
          ? (temp = true)
          : null
      );
      return temp;
    });
    if (isEmpty(value)) setData(Normalizer.Denormalize(drawToRender, [scheme], entities));
    else setData(res);
  };

  if (!isFetched) return <InitialLoader />;

  return (
    <>
      {!hideHeader && (
        <ComponentHead
          className="grid-view-header"
          {...{
            hideSearch,
            buttonText,
            search,
            openModalOrLink,
            rightContent,
            searchFields,
            searchFromView,
          }}
        />
      )}
      {ComponentMiddle}
      <ComponentBody
        ModalBody={ModalBody}
        remove={remove}
        removeConfirm={removeConfirm}
        open={state.openModal}
        setOpenModal={(id, name) => {
          setState((state) => ({ ...state, openModal: true }));
          setRemoveConfirm({ id, name });
        }}
        closeModal={() => {
          setState((state) => ({ ...state, openModal: false }));
          emptyRemoveText();
        }}
        data={data}
        addOrEdit={addOrEdit}
        getOneRequest={(id) => {
          getOneRequest(id);
          setState((state) => ({ ...state, openModal: true }));
        }}
        item={item}
        columns={columns}
        row={row}
        modalTitle={modalTitle}
        hasModal={hasModal}
        redirect={redirect}
        filterSelects={filterSelects}
        {...{
          ...dataForBody,
          disabledOnClose,
          callToRender,
          getAllOptions,
          dataForModal: {
            getAllOptions,
            selectOptions,
            modalButtonDisabled: state.modalButtonDisabled,
            openModal: state.openModal,
            status: requestStatus,
            ...dataForModal,
          },
        }}
      />
    </>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    drawToRender: get(state, `normalizer.data.${ownProps.storeName}.result.data`, []),
    isFetched: get(state, `normalizer.data.${ownProps.storeName}.isFetched`, true),
    entities: get(state, "normalizer.entities", {}),
    item: get(state, `api.${ownProps.entityName}-one.data`, {}),
    // selectOptions: get(state, `api.${ownProps.optionsStoreName}.data`, {}),
    selectOptions: (storeName) => get(state, `api.${storeName}.data`, {}),
  };
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    callToRender: (params) => {
      const storeName = ownProps.storeName;
      const entityName = ownProps.storeName;
      const scheme = { data: [ownProps.scheme] };
      dispatch({
        type: ApiActions.GET_ALL.REQUEST,
        payload: {
          url: get(ownProps, "url.list", "#"),
          baseUrl: ownProps.baseUrl,
          config: {
            params: {
              ...params,
              ...ownProps.params,
            },
          },
          scheme,
          storeName,
          entityName,
        },
      });
    },
    callToRenderTrigger: () => {
      const storeName = ownProps.storeName;
      const entityName = ownProps.entityName;
      dispatch({
        type: ApiActions.GET_ALL.TRIGGER,
        payload: {
          storeName,
          entityName,
        },
      });
    },
    addItemRequest: ({ attributes, formMethods, cb }) => {
      const storeName = ownProps.storeName;
      const entityName = ownProps.entityName;
      const scheme = { data: ownProps.scheme };
      dispatch({
        type: ApiActions.OPERATION_ADD.REQUEST,
        payload: {
          attributes,
          formMethods,
          cb,
          url: get(ownProps, "url.add", "#"),
          config: {
            ...ownProps.params,
          },
          scheme,
          storeName,
          entityName,
        },
      });
    },
    updateItemRequest: ({ id, attributes, formMethods, cb }) => {
      const storeName = ownProps.storeName;
      const entityName = ownProps.entityName;
      const scheme = { data: ownProps.scheme };
      dispatch({
        type: ApiActions.OPERATION_UPDATE.REQUEST,
        payload: {
          attributes,
          formMethods,
          cb,
          url: `${get(ownProps, "url.update", "#")}/${id}`,
          config: {
            ...ownProps.params,
          },
          scheme,
          storeName,
          entityName,
          isChangeListState: false,
        },
      });
    },
    deleteItemRequest: ({ id, formMethods, cb }) => {
      const storeName = ownProps.storeName;
      const entityName = ownProps.entityName;
      const scheme = ownProps.scheme;
      dispatch({
        type: ApiActions.OPERATION_DELETE.REQUEST,
        payload: {
          id,
          formMethods,
          cb,
          url: `${get(ownProps, `url.delete`, "#")}/${id}`,
          config: {
            ...ownProps.params,
          },
          scheme,
          storeName,
          entityName,
        },
      });
    },
    getOneRequest: (id) => {
      const storeName = `${ownProps.entityName}-one`;
      // const entityName = ownProps.entityName;
      // const scheme = {data: ownProps.scheme};
      dispatch({
        type: ApiActions.GET_DATA.REQUEST,
        payload: {
          url: `${get(ownProps, "url.one")}/${id}`,
          storeName,
          method: "get",
        },
      });
    },
    getOneTrigger: () => {
      const storeName = `${ownProps.entityName}-one`;
      dispatch({
        type: ApiActions.GET_ONE.TRIGGER,
        payload: {
          storeName,
        },
      });
    },
    getOneTriggerInApi: () => {
      const storeName = `${ownProps.entityName}-one`;
      dispatch({
        type: ApiActions.TEMP_DATA.REQUEST,
        payload: {
          storeName,
          item: { data: null },
        },
      });
    },
    getAllOptions: ({ cb, storeName, url }) => {
      // storeName = `${ownProps.optionsStoreName}`;
      // url = get(ownProps, 'url.selectOptions', '#');
      dispatch({
        type: ApiActions.GET_DATA.REQUEST,
        payload: {
          storeName,
          cb,
          method: "get",
          url,
        },
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(memo(GridView));
