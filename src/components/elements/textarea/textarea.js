import React from "react";
import { TextareaStyled } from "./textareaStyles";

export default function Textarea({ children, ...props }) {
  return <TextareaStyled {...props}>{children}</TextareaStyled>;
}
