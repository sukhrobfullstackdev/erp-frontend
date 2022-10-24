import { get, includes, isEqual, isNil } from "lodash";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import { InitialLoader } from "../../../../components/loader";
import Tabs from "../../../../components/tabs";
import ApiActions from "../../../../services/api/actions";
import AddmissionPage from "./addmissionPage";
import CallsHistoryPage from "./callsHistoryPage";
import GroupsPage from "./groupsPage";
import SummaryPage from "./summaryPage";
const Styled = styled.div``;
const LeadFormContainer = ({
  searchLeadNumber,
  addLeadComment,
  isFetched = false,
  deleteItemRequest,
  getFormData,
  formData,
  addItemRequest,
  getDataOfLead,
  getPhoto,
  updateItemRequest,
  match,
  history,
  fileUpload,
  statusHistory = [],
  interestedCoursesHistory = [],
  ...props
}) => {
  const [indexOfRadio, setIndexOfRadio] = useState(0);
  const [loader, setLoader] = useState(false);
  const [leadState, setLeadState] = useState({
    editable: null,
    isCreate: null,
    active: false,
    loader: false,
    searchDefaultValue: null,
    numberField: null,
    isOpenSearchModal: false,
    phoneNumber: null,
    main: false,
    phoneNumberTypeId: null,
    myComments: [],
    myNumberRegex: null,
    canCreate: false,
    phoneNumbersId: [],
    formDateState: [],
  });
  const id = match.params.id;
  const allComments = get(formData, "result.data.summary.comments", []);
  const numberRegex = get(formData, "result.data.summary.regex", "[+][0-9]{8,18}");
  const getValueFromField = (data, name) => {
    if (includes(["phoneNumber", "phoneNumberTypeId", "main"], name)) {
      if (data) {
        if (isEqual(name, "phoneNumber")) setLeadState((s) => ({ ...s, phoneNumber: data }));
        if (isEqual(name, "phoneNumberTypeId")) setLeadState((s) => ({ ...s, phoneNumberTypeId: data }));
        if (isEqual(name, "main")) setLeadState((s) => ({ ...s, main: data }));
      }
    }
  };
  const setSearchField = (action) => {
    if (action) setLeadState((s) => ({ ...s, numberField: leadState.searchDefaultValue }));
  };

  useEffect(() => {
    if (!isNil(leadState.editable) && !leadState.isCreate && id) getFormData(id);
  }, []);

  useEffect(() => {
    setLeadState((s) => ({ ...s, formDateState: formData, myComments: allComments }));
  }, [formData]);

  useEffect(() => {
    if (!isNil(leadState.editable) && !leadState.isCreate) getFormData(id);
    if (!isNil(leadState.editable) && leadState.isCreate) getDataOfLead();
    setLeadState((s) => ({ ...s, myNumberRegex: numberRegex }));
  }, [leadState.editable]);

  useEffect(() => {
    setLeadState((s) => ({
      ...s,
      isCreate: false,
      editable: includes(match.url, "add") || includes(match.url, "edit"),
      isOpenSearchModal: includes(match.url, "add"),
    }));
  }, [match]);

  const addCommit = (commentText) => {
    if (includes(match.url, "edit")) {
      addLeadComment({
        attributes: { leadId: id, text: commentText },
        cb: {
          success: ({ data }) => {
            setLeadState((s) => ({
              ...s,
              myComments: [
                ...s.myComments,
                {
                  modifiedName: data.modifiedName,
                  id: data.id,
                  text: commentText,
                },
              ],
            }));
          },
          fail: (res) => {},
        },
      });
    } else {
      setLeadState((s) => ({
        ...s,
        myComments: [...s.myComments, { text: commentText }],
      }));
    }
  };
  const deleteComment = (ind, comment) => {
    if (includes(match.url, "edit")) {
      deleteItemRequest(
        {
          cb: {
            success: ({ message = "SUCCESS" }) => {
              setLeadState((s) => ({
                ...s,
                myComments: leadState.myComments.filter((value, index) => index != ind),
              }));
            },
            fail: () => {},
          },
        },
        comment.id
      );
    } else {
      setLeadState((s) => ({
        ...s,
        myComments: leadState.myComments.filter((value, index) => index != ind),
      }));
    }
  };

  const update = ({ data, setError }) => {
    let customFieldValues = [];
    for (let key of Object.keys(data.customFieldValues)) {
      if (key.indexOf("/") > -1 && data.customFieldValues[key] != null) {
        let nameAndId = key.split("/");
        customFieldValues.push({
          value: data.customFieldValues[key],
          customFieldId: nameAndId[1],
        });
      }
    }
    if (leadState.isCreate) {
      setLoader(true);
      let leadAdditionalPhoneNumber = [];
      let tempPhone = "";
      data.additionalPhoneNumbers.phoneNumbers.map((i, index) => {
        let keys = Object.keys(i);
        for (let j = 0; j < keys.length; j++) {
          if (
            keys[j].split("/")[0].startsWith("phoneNumber") &&
            !keys[j].split("/")[0].startsWith("phoneNumberTypeId") &&
            `${leadState.phoneNumbersId[index]}` == keys[j].split("/")[1]
          ) {
            tempPhone = i[keys[j]];
            if (!isNil(tempPhone)) {
              if (index == indexOfRadio) {
                leadAdditionalPhoneNumber.push({
                  phoneNumber: tempPhone,
                  main: true,
                  relationNameId: i.phoneNumberTypeId,
                });
              } else {
                leadAdditionalPhoneNumber.push({
                  phoneNumber: tempPhone,
                  main: false,
                  relationNameId: i.phoneNumberTypeId,
                });
              }
            }
          }
        }
      });
      const newData = {
        ...data,
        additionalPhoneNumbers: leadAdditionalPhoneNumber,
        comments: leadState.myComments,
        customFieldValues: customFieldValues.length > 0 ? customFieldValues : null,
      };
      addItemRequest({
        attributes: newData,
        formMethods: {},
        cb: {
          success: (res) => {
            setLeadState((s) => ({ ...s, loader: false }));
          },
          fail: (res) => {
            setLeadState((s) => ({ ...s, loader: false }));
          },
        },
      });
    } else {
      if (leadState.editable) {
        setLeadState((s) => ({ ...s, loader: true }));
        let leadAdditionalPhoneNumber = [];
        let tempPhone = "";
        data.additionalPhoneNumbers.phoneNumbers.map((i, index) => {
          let keys = Object.keys(i);
          for (let j = 0; j < keys.length; j++) {
            if (
              keys[j].split("/")[0].startsWith("phoneNumber") &&
              !keys[j].split("/")[0].startsWith("phoneNumberTypeId") &&
              `${leadState.phoneNumbersId[index]}` == keys[j].split("/")[1]
            ) {
              tempPhone = i[keys[j]];
              if (!isNil(tempPhone)) {
                if (index == indexOfRadio) {
                  leadAdditionalPhoneNumber.push({
                    phoneNumber: tempPhone,
                    main: true,
                    relationNameId: i.phoneNumberTypeId,
                  });
                } else {
                  leadAdditionalPhoneNumber.push({
                    phoneNumber: tempPhone,
                    main: false,
                    relationNameId: i.phoneNumberTypeId,
                  });
                }
              }
            }
          }
        });
        const newData = {
          ...data,
          additionalPhoneNumbers: leadAdditionalPhoneNumber,
          comments: leadState.myComments,
          customFieldValues: customFieldValues.length > 0 ? customFieldValues : null,
        };

        updateItemRequest(
          {
            attributes: newData,
            formMethods: {
              setError,
            },
            cb: {
              success: (res) => {
                setLeadState((s) => ({ ...s, formDateState: res, loader: false }));
              },
              fail: (res) => {
                setLeadState((s) => ({ ...s, loader: false }));
              },
            },
          },
          id
        );
      } else {
        history.push(`/sales/sales/lead/edit/${id}`);
        setLeadState((s) => ({ ...s, editable: !s.editable }));
      }
    }
  };
  if (loader || !isFetched) return <InitialLoader />;
  return (
    <Styled>
      <Tabs
        leftList={["SUMMARY", "CALLS HISTORY", "MESSAGE", "TASKS", "ACTION HISTORY", "ACADEMIC PROFILE", "INVOICE"]}
        rightList={["ADMISSIONS", "GROUPS", "PDP INFO", "COURSE", "EXAM", "EVENTS", "FAQ"]}
        leftContent={[
          <SummaryPage
            searchLeadNumber={searchLeadNumber}
            getValueFromField={getValueFromField}
            update={update}
            leadState={leadState}
            setLeadState={setLeadState}
            setIndexOfRadio={setIndexOfRadio}
            indexOfRadio={indexOfRadio}
            deleteComment={deleteComment}
            addCommit={addCommit}
            setSearchField={setSearchField}
          />,
          <CallsHistoryPage match={match} />,
          "left 2 Content",
          "left 3 Content",
          "left 4 Content",
          "left 5 Content",
          "left 6 Content",
          "left 7 Content",
        ]}
        rightContent={[
          <AddmissionPage />,
          <GroupsPage />,
          "right 3 Content",
          "right 4 Content",
          "right 5 Content",
          "right 6 Content",
          "right 7 Content",
        ]}
      />
    </Styled>
  );
};
const mapStateToProps = (state) => {
  return {
    formData: get(state, "api.lead-form-data.data", {}),
    searchLeadNumber: get(state, "api.lead-search-number.data.result.data", {}),
    isFetched: get(state, "api.lead-form-data.data.isFetched", false),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getDataOfLead: () => {
      dispatch({
        type: ApiActions.GET_DATA.REQUEST,
        payload: {
          url: "sales/v1/lead/get-lead-form",
          method: "get",
          storeName: "lead-form-data",
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
          url: "sales/v1/lead/add-new-lead",
        },
      });
    },
    getFormData: (id) => {
      dispatch({
        type: ApiActions.GET_DATA.REQUEST,
        payload: {
          url: `sales/v1/lead/get-full-info-of-lead-by-lead-id/${id}`,
          method: "get",
          storeName: "lead-form-data",
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
          url: `sales/v1/lead/edit-lead/${id}`,
          storeName: "lead-form-data",
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
          url: `sales/v1/comment/delete-comment/${id}`,
        },
      });
    },
    addLeadComment: ({ attributes, formMethods, cb }, id) => {
      dispatch({
        type: ApiActions.GET_DATA.REQUEST,
        payload: {
          config: attributes,
          formMethods,
          cb,
          url: `sales/v1/comment/add-comment`,
        },
      });
    },
  };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LeadFormContainer));
