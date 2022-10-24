import { isArray } from "lodash";
import React, { useState } from "react";
import Flex from "../../../components/elements/flex";
import AcademicDialog from "../components/AcademicDialog";
import Card from "../components/CardComponent";
import Modal from "../../../components/elements/modal";
export default function CardContainer({ data }) {
  const [show, setShow] = useState(false);
  const closeDialog = () => {
    setShow(false);
  };
  return (
    <Flex className="card_flex">
      <Modal active={show} onClose={() => setShow(false)}>
        <AcademicDialog label={"test"} closeDialog={closeDialog} />
      </Modal>

      {isArray(data.courses) &&
        data.courses.map((val, ind) => <Card data={val} key={ind + new Date().getTime()} openMadal={() => setShow(true)} />)}
    </Flex>
  );
}
