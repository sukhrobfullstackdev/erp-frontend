import CustomDatepickerForGlobal from "components/custom-datepicker/custom-datepicker-for-global";
import CustomDatepicker from "components/custom-datepicker/custom-datepicker";
import Field from "containers/Form/field";
// import DropdownForGloba  l from "components/elements/dropDown/dropdown_global";
import FormDemo from "containers/Form/form-demo";
// import React, { memo, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import MyComponent from "./Aslamjon";
import { connect } from "react-redux";
import Actions from "services/globalContextMenu/actions";
import { get } from "lodash";
import Sort from "../../../components/elements/sort/sort";

// const StyledTestPage = styled.div`
//   padding: 30px 38px;
//   .test {
//     width: 100px;
//     height: 100px;
//     background-color: red;
//   }
// `;

// const TestPage = ({ setDataToGlobalContextMenu, globalContextMenu }) => {
//   console.log("TestPage");

//   const [date, setDate] = useState(null);
//   useEffect(() => {
//     setDataToGlobalContextMenu({ storeName: "test", data: "testData" });
//   }, []);

//   // console.log(globalContextMenu);

//   return (
//     <StyledTestPage>
//       {/* <MyComponent /> */}
//       <FormDemo>
//         <Field
//           type="custom-select"
//           className="date"
//           name={"select"}
//           onChange={(e) => console.log(e)}
//           label={"select"}
//           isMulti
//           options={[
//             { label: "1", value: "1" },
//             { label: "2", value: "2" },
//             { label: "3", value: "3" },
//             { label: "4", value: "4" },
//           ]}
//           // defaultValue={date}
//           property={{
//             placeholder: "Enter date",
//             format: "yyyy-MM-dd",
//           }}
//           params={{ required: true }}
//         />
//       </FormDemo>
//       {/* <CustomDatepicker
//         type="custom-datepicker"
//         className="date"
//         isRange
//         name={"date"}
//         onChange={(e) => console.log(e)}
//         label={"DATE"}
//         defaultValue={date}
//         property={{
//           placeholder: "Enter date",
//           format: "yyyy-MM-dd",
//         }}
//       /> */}
//       {/* <CustomDatepickerForGlobal
//         type="custom-datepicker"
//         className="date"
//         isRange
//         name={"date"}
//         onChange={(e) => console.log(e)}
//         label={"DATE"}
//         defaultValue={date}
//         property={{
//           placeholder: "Enter date",
//           format: "yyyy-MM-dd",
//         }}
//       /> */}
//     </StyledTestPage>
//   );
// };

// const mapStateToProps = (state, ownProps) => {
//   return {
//     globalContextMenu: get(state, "contextMenu", {}),
//   };
// };

// const mapDispatchToProps = (dispatch, ownProps) => {
//   return {
//     setDataToGlobalContextMenu: ({ storeName, data }) => {
//       dispatch({
//         type: Actions.SET_DATA_IN_GLOBAL_CONTEXT.REQUEST,
//         payload: {
//           storeName,
//           data,
//         },
//       });
//     },
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(memo(TestPage));

import React from "react";

function testSort() {
  return (
    <div>
      <Sort number={10} column={"2"} sortFromView={(column, value) => console.log(column, value)} />
    </div>
  );
}

export default testSort;
