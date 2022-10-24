import { isEqual } from "lodash";
import React, { useEffect, useState } from "react";

const Square = ({ lessonStatus, className, type, opacity = "", onClick = () => {} }) => {
  const [value, setValue] = useState();

  useEffect(() => {
    if (value !== type) setValue(type);
  }, [type]);

  useEffect(() => {
    setValue(type);
  }, [lessonStatus]);


  const clickHandling = () => {
    if (isEqual(lessonStatus, "STARTED")) {
      if (value === "red") setValue("green");
      else if (value === "green") setValue("red");
      onClick();
    }
  };

  return (
    <div className={className}>
      <span className={`lesson__table__col ${value} ${opacity}`} onClick={clickHandling}/>
    </div>
  );
};

export default Square;
