import { createRoutine } from "redux-saga-routines";

const GET_ALL = createRoutine("GET_ALL");
const GET_ONE = createRoutine("GET_ONE");
const GET_DATA = createRoutine("GET_DATA");
const OPERATION_DELETE = createRoutine("OPERATION_DELETE");
const OPERATION_ADD = createRoutine("OPERATION_ADD");
const OPERATION_UPDATE = createRoutine("OPERATION_UPDATE");
const REQUEST = createRoutine("REQUEST");
const CHANGE_DATA = createRoutine("CHANGE_DATA");
const GET_DATA_FOR_BOARD_VIEW_AND_LIST_VIEW = createRoutine("GET_DATA_FOR_BOARD_VIEW_AND_LIST_VIEW");
const TEMP_DATA = createRoutine("TEMP_DATA");
const GLOBAL_MODAL = createRoutine("GLOBAL_MODAL");

export default {
  GET_ALL,
  GET_ONE,
  GET_DATA,
  OPERATION_DELETE,
  OPERATION_ADD,
  OPERATION_UPDATE,
  REQUEST,
  CHANGE_DATA,
  GET_DATA_FOR_BOARD_VIEW_AND_LIST_VIEW,
  TEMP_DATA,
  GLOBAL_MODAL,
};
