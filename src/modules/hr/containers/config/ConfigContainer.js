import React from "react";
import WorkingDay from "../../components/wokingDay";
import FormDemo from "../../../../containers/Form/form-demo";
import Title from "../../../../components/elements/title";
import { connect } from "react-redux";
import { useEffect } from "react";
import { get } from "lodash";
import ApiActions from "../../../../services/api/actions";

const data = [
  {
    title: "Dushanba",
    name: "dushanba",
    checked: true,
  },
  {
    title: "Seshanba",
    name: "seshanbq",
    checked: true,
  },
  {
    title: "Chorshanba",
    name: "chorshanba",
    checked: true,
  },
  {
    title: "Payshanba",
    name: "payshanba",
    checked: true,
  },
  {
    title: "Juma",
    name: "juma",
    checked: true,
  },
  {
    title: "Shanba",
    name: "shanba",
    checked: true,
  },
  {
    title: "Yakshanba",
    name: "yakshanba",
    checked: true,
  },
];

const ConfigContainer = ({ getAllWorkingDays, changeWorkDayActive, workingDays }) => {
  useEffect(() => {
    getAllWorkingDays();
  }, []);
  return (
    <FormDemo>
      <div className={"work_day_container"}>
        <div className={"work_title"}>Working days</div>
        <div className={"work_day"}>
          {workingDays.map((item) => (
            <WorkingDay
              key={item.name}
              changeWorkDayActive={changeWorkDayActive}
              id={item.uuid}
              active={item.active}
              title={item.name}
              name={item.name}
              editable={true}
            />
          ))}
        </div>
      </div>
    </FormDemo>
  );
};
const mapStateToProps = (state) => {
  return {
    workingDays: get(state, "api.working-days.data.result.data", []),
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    changeWorkDayActive: (id) => {
      dispatch({
        type: ApiActions.GET_DATA.REQUEST,
        payload: {
          url: `staff/v1/work-day/change/active/${id}`,
          method: "get",
        },
      });
    },
    getAllWorkingDays: () => {
      dispatch({
        type: ApiActions.GET_DATA.REQUEST,
        payload: {
          url: `staff/v1/work-day/get-all`,
          method: "get",
          storeName: "working-days",
        },
      });
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ConfigContainer);
