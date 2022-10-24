import React, { useEffect, useMemo, useState } from "react";
import { connect } from "react-redux";
import { get, isEmpty } from "lodash";
import { InitialLoader } from "../../components/loader";
import Normalizer from "../../services/normalizer";
import ApiActions from "../../services/api/actions";
import { toast } from "react-toastify";
import { getSelectOptionsListFromData } from "../../utils";

const ListView = ({
  ComponentHead,
  ComponentBody,
  callToRender,
  callToRenderTrigger,
  drawToRender,
  scheme,
  isFetched,
  entities,
  addItemRequest,
  addTitle = "ADD",
  getDataSelectOptions,
  getDataSelectOptionsUrl,
  storeNameForSelect,
  options,
  getDataById,
  buttonHoverText,
  updateItemRequest,
  deleteItemRequest,
  changeOrderUrl,
  ...rest
}) => {
  const [selected, setSelected] = useState("");

  useEffect(() => {
    if (getDataSelectOptionsUrl) getDataSelectOptions();
    else callToRender();
  }, []);

  useEffect(() => {
    if (selected && getDataSelectOptionsUrl) getDataById(selected);
  }, [selected]);

  let selectOptions =
    !isEmpty(get(options, "result.data", [])) && getSelectOptionsListFromData(get(options, "result.data", []), "id", "name");

  let data = useMemo(() => Normalizer.Denormalize(drawToRender, [scheme], entities), [drawToRender]);

  const changeListOrder = ({ data, request }) => {
    request({
      attributes: { ...data },
      formMethods: {},
      cb: {
        success: ({ message = "SUCCESS" }) => {
          toast.success(message);
        },
      },
    });
  };

  if (!isFetched && !getDataSelectOptionsUrl) return <InitialLoader />;
  // else if (!options.isFetched) return <InitialLoader/>;

  const add = ({ data, setError, closeModal }) => {
    data.courseId = selected;
    addItemRequest({
      attributes: data,
      formMethods: { setError },
      cb: {
        success: ({ message = "SUCCESS" }) => {
          toast.success(message);
          closeModal();
        },
        fail: () => {},
      },
    });
  };

  const update = ({ data, setError }, id) => {
    updateItemRequest(
      {
        attributes: data,
        formMethods: { setError },
        cb: {
          success: ({ message = "SUCCESS" }) => {
            toast.success(message);
            if (getDataSelectOptionsUrl) getDataById(selected);
            else callToRender();
          },
          fail: () => {},
        },
      },
      id
    );
  };

  const deleteItem = ({ data, setError }, id) => {
    deleteItemRequest(
      {
        attributes: data,
        formMethods: { setError },
        cb: {
          success: ({ message = "SUCCESS" }) => {
            toast.success(message);
            if (getDataSelectOptionsUrl) getDataById(selected);
            else callToRender();
          },
          fail: () => {},
        },
      },
      id
    );
  };
  return (
    <>
      <ComponentHead
        tip={buttonHoverText}
        add={add}
        addTitle={addTitle}
        selected={selected}
        buttonBindSelect={!!getDataSelectOptionsUrl}
      />
      <ComponentBody
        {...{
          data,
          changeOrder: changeListOrder,
          options: selectOptions,
          setSelected,
          update,
          deleteItem,
          changeOrderUrl,
        }}
      />
    </>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    drawToRender: get(state, `normalizer.data.${ownProps.storeName}.result.data`, []),
    isFetched: get(state, `normalizer.data.${ownProps.storeName}.isFetched`, false),
    entities: get(state, "normalizer.entities", []),
    options: get(state, `api.${ownProps.storeNameForSelect}.data`, []),
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
          url: ownProps.url,
          baseUrl: ownProps.baseUrl,
          config: {
            params,
            ...ownProps.params,
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
    getDataSelectOptions: () => {
      dispatch({
        type: ApiActions.GET_DATA.REQUEST,
        payload: {
          url: ownProps.getDataSelectOptionsUrl,
          method: "get",
          storeName: ownProps.storeNameForSelect,
        },
      });
    },
    getDataById: (id, params) => {
      const storeName = ownProps.storeName;
      const entityName = ownProps.storeName;
      const scheme = { data: [ownProps.scheme] };
      dispatch({
        type: ApiActions.GET_ALL.REQUEST,
        payload: {
          url: `${ownProps.getDataWithSelectUrl}/${id}`,
          baseUrl: ownProps.baseUrl,
          config: {
            params,
            ...ownProps.params,
          },
          scheme,
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
          url: get(ownProps, "addUrl", "#"),
          config: {
            ...ownProps.params,
          },
          scheme,
          storeName,
          entityName,
        },
      });
    },
    updateItemRequest: ({ attributes, formMethods, cb }, id) => {
      dispatch({
        type: ApiActions.OPERATION_UPDATE.REQUEST,
        payload: {
          attributes,
          formMethods,
          cb,
          url: `${ownProps.editUrl}/${id}`,
        },
      });
    },
    deleteItemRequest: ({ attributes, formMethods, cb }, id) => {
      dispatch({
        type: ApiActions.OPERATION_DELETE.REQUEST,
        payload: {
          attributes,
          formMethods,
          cb,
          url: `${ownProps.deleteUrl}/${id}`,
        },
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListView);
