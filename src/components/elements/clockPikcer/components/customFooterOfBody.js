import { memo } from "react";
import Button from "../../button";

const CustomFooterOfBody = ({ submitClick = () => "" }) => {
  return (
    <Button success={"1"} onCLick={submitClick}>
      Ok
    </Button>
  );
};

export default memo(CustomFooterOfBody);
