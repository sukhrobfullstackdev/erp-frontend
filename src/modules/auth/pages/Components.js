import React, { useEffect, useState } from "react";
import { isArray } from "lodash";
import styled from "styled-components";

import Status from "../../../components/elements/status";

import Button from "../../../components/elements/button";
import CardOfSpecialization from "../../../components/elements/cardOfSpecialization/cardOfSpecialization";
import Input from "../../../components/elements/input";
import Title from "../../../components/elements/title";
import LeadCard from "../../../components/lead/lead-card";
import Flex from "../../../components/elements/flex";
import DropZone from "../../../components/elements/dropzone/dropzone";
import { Col, Row } from "react-grid-system";
import Filter from "../../../components/elements/filter/filter";
import LanguageBar from "../../../components/elements/language-bar/language-bar";
import LoginWith from "../../../components/elements/loginWith";
import Modal from "../../../components/elements/modal";
import Select2 from "../../../components/elements/select/select2";
import Select from "../../../components/elements/select";
import TabsComponent from "../../../components/elements/tabs";
import Textarea from "../../../components/elements/textarea";
import Message from "../../../components/elements/message";
import DeleteModule from "../../../components/elements/deleteModule";
import SavePrivetView from "./../../../components/savePrivetView";
import DiscountForSpecialists from "../../../components/discountsForSpecialists";
import Tabs from "../../../components/tabs";
import Box from "../../../components/elements/box";
import Form from "./../../../containers/Form/form";
import Field from "../../../containers/Form/field";
import FormDemo from "../../../containers/Form/form-demo";
import { useDispatch } from "react-redux";
import { checkTab } from "utils";
import Card from "../../../components/card";
import NewCard from "../../../components/newCard";

import studentImage from "../../../assets/images/staticMan.png";
import Account from "components/elements/account";
import StatusHistory from "modules/sales/containers/lead/components/StatusHistory";
import CustomDatepicker from "components/custom-datepicker";
import SelectForGlobal from "components/elements/select/SelectForGlobal";

const SelectStyle = styled.div`
  .dropdown {
    min-width: 260px;
  }
`;

const modules = [
  {
    id: 1,
    head: {
      name: "Want to pay",
      status: "want to pay",
      statusColor: "#9757D7",
    },
    body: [
      {
        id: 1,
        name: "Jenny Wilson",
        phone: "+998 99 067-39-46",
        priority: "yellow",
        call: true,
        message: true,
      },
    ],
  },
  {
    id: 2,
    head: {
      name: "Registred",
      status: "registred",
      statusColor: "#4BC9F0",
    },
    body: [
      {
        id: 1,
        name: "Ronald Richards",
        phone: "+998 99 067-39-46",
        priority: "green",
        call: true,
        message: true,
      },
      {
        id: 2,
        name: "Jane Cooper",
        phone: "+998 99 067-39-461",
        priority: "purple",
        call: true,
        message: true,
      },
      {
        id: 3,
        name: "Kathryn Murphy",
        phone: "+998 99 067-39-46",
        priority: "pink",
        call: true,
        message: true,
      },
    ],
  },
  {
    id: 3,
    head: {
      name: "Need to think",
      status: "need to think",
      statusColor: "#FFD166",
    },
    body: [
      {
        id: 1,
        name: "Leslie Alexander",
        phone: "+998 99 067-39-46",
        priority: "pink",
        call: true,
        message: true,
      },
    ],
  },
  {
    id: 4,
    head: {
      name: "Interested",
      status: "interested",
      statusColor: "#3772FF",
    },
    body: [
      {
        id: 1,
        name: "Floyd Miles",
        phone: "+998 99 067-39-46",
        priority: "pink",
        call: true,
        message: true,
      },
    ],
  },
];

const columns = [
  {
    key: "title",
    title: "# Title",
    dataIndex: "title",
  },
  {
    key: "section",
    title: "Section",
    dataIndex: "section",
  },
  {
    key: "status",
    title: "Status",
    dataIndex: "status",
  },
  {
    key: "action",
    title: "Action",
    dataIndex: "action",
  },
];

const data = [
  {
    key: "1",
    title: "Mentor",
    section: "Academic",
    status: true,
    action: true,
  },
  {
    key: "2",
    title: "Support",
    section: "Admin",
    status: true,
    action: true,
  },
  {
    key: "3",
    title: "Assistent",
    section: "Academic",
    status: false,
    action: true,
  },
  {
    key: "4",
    title: "Security",
    section: "Academic",
    status: true,
    action: true,
  },
];

const selectData = {
  currentValueIndex: 0,
  value: {},
  fieldType: "select",
  label: "",
  values: [
    { value: "ecma", label: "Ecma", color: "rgba(75,201,240,1)" },
    { value: "pdp", label: "PDP", color: "rgba(75,201,240,1)" },
    { value: "pdp", label: "PDP", color: "rgba(75,201,240,1)" },
  ],
};

const colourOptions = [
  {
    value: "ios development",
    label: "IOS Development",
    color: "rgba(151,87,215,1)",
    isFixed: true,
  },
  {
    value: "java",
    label: "Java",
    color: "rgba(239,79,111,1)",
    isDisabled: false,
  },
  { value: "react js", label: "React JS", color: "rgba(55,114,255,1)" },
  {
    value: "python",
    label: "Python",
    color: "rgba(0,181,51,1)",
    isFixed: true,
  },
  { value: "database", label: "Database", color: "rgba(75,201,240,1)" },
  { value: "android", label: "Android", color: "rgba(177,181,196,1)" },
  { value: "green", label: "Green", color: "rgb(54,179,126)" },
  { value: "forest", label: "Forest", color: "rgb(0,135,90)" },
  { value: "slate", label: "Slate", color: "#253858" },
  { value: "silver", label: "Silver", color: "#666666" },
];

const dataArray = [
  {
    firstName: "James Brown",
    phoneNumber: "+998 99 670-75-75",
    clientNo: true,
    studentImg: studentImage,
    who: {
      color: true,
      value: "Brother",
    },
    countRes: "LN0163",
  },
  {
    firstName: "Frank Sinatra",
    phoneNumber: "+998 99 670-60-60",
    clientNo: false,
    studentImg: "",
    who: {
      color: false,
      value: "Father",
    },
    countRes: "LN0163",
  },
];
const testData = [
  {
    testName: "Test",
  },
  {
    testName: "Draging-Drop",
  },
  {
    testName: "Multi test",
  },
];

const customOption = ({ value, label, color }) => <div>{label}</div>;

export default function Components({ location: { pathname } }) {
  const dispatch = useDispatch();
  useEffect(() => {
    checkTab(dispatch, pathname, "Components page");
  }, []);

  const [buttonData, setButtonData] = useState({});
  const [cardActive, setcCardActive] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isClose, setIsClose] = useState(false);
  const [allData, setAllData] = useState({});

  return (
    <Box sm>
      <Row>
        <Col xs={12}>
          <Title>Date Picker</Title>
          <br />
          <CustomDatepicker />
        </Col>
        <Col xs={12}>
          <Title>Messages</Title>
          <br />
          <Flex justify="space-between">
            <Message message={"This is a info message!"} status="info" />
            <Message message={"This is a success message!"} status="success" />
            <Message message={"This is a warning message!"} status="warning" />
            <Message message={"This is a error message!"} status="error" />
          </Flex>{" "}
          <br />
          <Flex justify="space-between">
            {!isClose && (
              <Message message={"This is a info message!"} status="info" close={() => setIsClose((state) => !state)} />
            )}
            {!isClose && (
              <Message message={"This is a success message!"} status="success" close={() => setIsClose((state) => !state)} />
            )}
            {!isClose && (
              <Message message={"This is a warning message!"} status="warning" close={() => setIsClose((state) => !state)} />
            )}
            {!isClose && (
              <Message message={"This is a error message!"} status="error" close={() => setIsClose((state) => !state)} />
            )}
          </Flex>{" "}
          <br />
          <Flex justify="space-between">
            <Message message={"This is a info message!"} status="info" yes={() => {}} no={() => {}} />
            <Message message={"This is a success message!"} status="success" yes={() => {}} no={() => {}} />
            <Message message={"This is a warning message!"} status="warning" yes={() => {}} no={() => {}} />
            <Message message={"This is a error message!"} status="error" yes={() => {}} no={() => {}} />
          </Flex>{" "}
          <br />
          <Flex justify="space-between">
            <Message message={"This is a info message!"} status="info" yes={() => {}} no={() => {}} confirm />
            <Message message={"This is a success message!"} status="success" yes={() => {}} no={() => {}} confirm />
            <Message message={"This is a warning message!"} status="warning" yes={() => {}} no={() => {}} confirm />
            <Message message={"This is a error message!"} status="error" yes={() => {}} no={() => {}} confirm />
          </Flex>{" "}
          <br /> <br />
          <Row>
            <Col md={1}></Col>
            <Col md={5}>
              {" "}
              <DiscountForSpecialists options={colourOptions} />{" "}
            </Col>
            <Col md={5}>
              {" "}
              <DeleteModule
                value={allData.deleteModule}
                onChange={(e) =>
                  setAllData((state) => ({
                    ...state,
                    deleteModule: e.target.value,
                  }))
                }
              />{" "}
            </Col>
            <Col md={1}></Col>
          </Row>{" "}
          <br />
          <Row>
            <Col md={1}></Col>
            <Col md={4}>
              {" "}
              <SavePrivetView
                value={allData.savePrivet}
                onchange={(e) =>
                  setAllData((state) => ({
                    ...state,
                    savePrivet: e.target.value,
                  }))
                }
              />{" "}
            </Col>
          </Row>{" "}
          <br />
          <Title>Inputs</Title>
          <Flex justify="space-between">
            <Input placeholder="enter phone number" />
            <Input password placeholder="enter phone number" />
            <Input valid placeholder="enter phone number" />
            <Input error placeholder="enter phone number" />
          </Flex>{" "}
          <br />
          <Flex justify="space-between">
            <Input disabled placeholder="enter phone number" />
            <Input checked placeholder="enter phone number" />
            <Input mask placeholder="enter phone number" />
            {/* <Input focused placeholder="enter phone number" /> */}
          </Flex>{" "}
          <br />
          <Title>Selects</Title>
          <Flex justify="space-around">
            {/*<Select2 {...{*/}
            {/*    width: 350,*/}
            {/*    // colourOptions: selectData.values,*/}
            {/*    // defaultValue: selectData.values[selectData.currentValueIndex],*/}
            {/*    colourOptions,*/}
            {/*    multi: "isMulti"*/}
            {/*}} />*/}
            {/*<Select2 {...{*/}
            {/*    width: 350,*/}
            {/*    // colourOptions: selectData.values,*/}
            {/*    // defaultValue: selectData.values[selectData.currentValueIndex],*/}
            {/*    colourOptions, customOption*/}
            {/*}} />*/}
            {/*/!* <Select data={dataSelect} /> *!/*/}
            {/*/!* <Textarea /> *!/*/}
            {/*<SelectStyle>*/}
            {/*    <FormDemo>*/}
            {/*        <Field type={'select'} name={"select"} label={""} options={colourOptions}*/}
            {/*               params={{required: true}}/>*/}
            {/*    </FormDemo>*/}
            {/*</SelectStyle>*/}
          </Flex>{" "}
          <br />
          <Title>Buttons</Title> <br />
          <Flex justify="space-between">
            <Button success>click me</Button>
            <Button danger>click me</Button>
            <Button primary>click me</Button>
            <Button outline_success>click me</Button>
            <Button outlineDanger>click me</Button>
            <Button disabled>click me</Button>
            <Button edit success pr={13} pl={12}>
              click me
            </Button>
            <Button plus light_success>
              click me
            </Button>
            <Button className={"form__btn"} success="1" check="1" center="1" checkDisable="1"></Button>
          </Flex>{" "}
          <br />
          <Title>Card</Title> <br />
          <Row>
            <Col md={2}>
              {" "}
              <CardOfSpecialization
                name="hello world"
                active={cardActive}
                onClick={() => setcCardActive((state) => !state)}
              />{" "}
            </Col>
            <Col md={5}>
              {" "}
              <Card dataArray={dataArray} />{" "}
            </Col>
            <Col md={5}>
              {" "}
              <NewCard testData={testData} />{" "}
            </Col>
          </Row>
          {/* <Filter /> */}
          <br />
          <Title>Language Bar</Title>
          <LanguageBar />
          <LoginWith /> <br />
          <Title>Modal</Title>
          <Button success onCLick={() => setIsActive((state) => !state)}>
            {" "}
            Open Modal{" "}
          </Button>
          <Modal width="400" active={isActive} onClose={() => setIsActive((state) => !state)}>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eveniet impedit rem omnis laboriosam? Ullam, obcaecati iure?
            Commodi consectetur sequi sint praesentium itaque dolor error veniam accusantium illo excepturi? Qui, provident!
          </Modal>
          <br />
          {/* <TabsComponent
                tabList={["tab 1", "tab 2", "tab 3"]}
                tabContent={[<div>Hi this is conetnt 1</div>, "Content 2", "Content 3", "Content 4"]}
                /> */}
          <Title>Tabs</Title>
          <Tabs
            leftList={["SUMMARY", "CALLS HISTORY", "MESSAGE", "TASKS", "ACTION HISTORY", "ACADEMIC PROFILE", "INVOICE"]}
            rightList={["ADMISSIONS", "GROUPS", "PDP INFO", "COURSE", "EXAM", "EVENTS", "FAQ"]}
            leftContent={[
              "left 1 Content",
              "left 2 Content",
              "left 3 Content",
              "left 4 Content",
              "left 5 Content",
              "left 6 Content",
              "left 7 Content",
            ]}
            rightContent={[
              "right 1 Content",
              "right 2 Content",
              "right 3 Content",
              "right 4 Content",
              "right 5 Content",
              "right 6 Content",
              "right 7 Content",
            ]}
          />{" "}
          <br />
          <Status {...{ modules }} />
          <Title>DropZone</Title>
          <Row>
            <Col md={2}></Col>
            <Col md={8}>
              <DropZone />
            </Col>
            <Col md={2}></Col>
          </Row>{" "}
          <br />
        </Col>
        <Col>
          <LeadCard />
        </Col>
      </Row>
    </Box>
  );
}
