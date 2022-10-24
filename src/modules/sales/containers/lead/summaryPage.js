import React from "react";
import FormDemo from "containers/Form/form-demo";
import Summary from "./components/Summary";
import StatusHistory from "./components/StatusHistory";
import InterestedCoursesHistory from "./components/InterestedCoursesHistory";
import CustomLead from "components/customFieldWithCollapse/customFieldWithCollapse";
import LeadModal from "components/userInfo/leadModal";
import UserInfo from "components/userInfo";
import Button from "components/elements/button";
import { get } from "lodash";

const SummaryPage = ({
  getValueFromField,
  update,
  leadState,
  setLeadState,
  setIndexOfRadio,
  indexOfRadio,
  deleteComment,
  addCommit,
  searchLeadNumber,
  setSearchField,
}) => {
  return (
    <FormDemo
      getValueFromField={getValueFromField}
      formRequest={update}
      footer={
        <Button className="submitBtn" success type={"submit"}>
          {leadState.isCreate ? "Create" : leadState.editable ? "Save" : "Edit"}
        </Button>
      }
    >
      <button
        onClick={(e) => {
          e.preventDefault();
          setLeadState((s) => ({ ...s, active: !s.active }));
        }}
      >
        res
      </button>
      <Summary
        {...{
          data: get(leadState.formDateState, "result.data.summary", {}),
        }}
        leadState={leadState}
        setLeadState={setLeadState}
        setIndexOfRadio={setIndexOfRadio}
        indexOfRadio={indexOfRadio}
        deleteComment={deleteComment}
        addCommit={addCommit}
      />
      <StatusHistory data={get(leadState.formDateState, "result.data.statusHistories", [])} />
      <InterestedCoursesHistory data={get(leadState.formDateState, "result.data.interestedCourseHistories", [])} />
      <CustomLead data={get(leadState.formDateState, "result.data.customFields", [])} />
      {!leadState.canCreate && (
        <div className="leadModal">
          <LeadModal leadState={leadState} setLeadState={setLeadState} firstTime={true} setSeachField={setSearchField} />
        </div>
      )}
      <UserInfo setSeachField={setSearchField} setLeadState leadState searchLeadNumber={searchLeadNumber} />
    </FormDemo>
  );
};

export default SummaryPage;
