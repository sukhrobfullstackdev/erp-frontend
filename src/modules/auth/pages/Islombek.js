import React from "react";
import FilterDialog from "../../academy/components/filterDialog";
import LeadPage from "../../../modules/leads/pages/LeadsPage";
import Summary from "../../sales/containers/lead/components/Summary";
import Field from "../../../containers/Form/field";
import FormDemo from "../../../containers/Form/form-demo";
import styled from "styled-components";
import Emoji from "../../../components/elements/emoji/index";
import AddColumn from "../../../components/addColumn";
const Styled = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 99999;
  background: red;
  padding: 0 0 0 50px;
`;
const Islombek = () => {
  return (
    <Styled>
      {/* <FormDemo> */}
      {/* <FilterDialog /> */}
      {/* <LeadCard /> */}
      {/* <Summary /> */}
      {/* <Field styled={true} menuClassName='salomenkksdfe' menuClass='menuclass' type={'new-select'} renderMenuStyle={{ background: 'yellow' }} style={{ background: 'green' }} mainStyle={{ background: 'black' }} renderItemStyle={{ color: 'red', padding: '10px', background: 'blue' }} renderValueStyle={{ color: 'blue' }} group data={[{ label: 'dsds', value: 'aaa' }, { label: 'sdsds', value: 'qww' }]} /> */}

      {/* <TaskView /> */}
      {/* </FormDemo> */}
      {/* <LeadPage /> */}
      {/* <Emoji /> */}
      <AddColumn />
    </Styled>
  );
};

export default Islombek;
