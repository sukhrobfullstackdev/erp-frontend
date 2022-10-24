import { createRoutine } from "redux-saga-routines";

const CHANGE_ORDER = createRoutine("CHANGE_ORDER");
const REGION_OPTIONS = createRoutine("REGION_OPTIONS");

export default {
  CHANGE_ORDER,
  REGION_OPTIONS,
};
