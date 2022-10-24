import { createRoutine } from "redux-saga-routines";
const NORMALIZE = createRoutine("NORMALIZE");
const CHANGE_NORMALIZE_DATA = createRoutine("CHANGE_NORMALIZE_DATA");
const UPDATE_NORMALIZER_DATA = createRoutine("UPDATE_NORMALIZER_DATA");
const UPDATE_NORMALIZER_ENTITIES = createRoutine("UPDATE_NORMALIZER_ENTITIES");
const UPDATE_NORMALIZER_ENTITY_ONE = createRoutine("UPDATE_NORMALIZER_ENTITIES_ONE");

export default {
  NORMALIZE,
  CHANGE_NORMALIZE_DATA,
  UPDATE_NORMALIZER_DATA,
  UPDATE_NORMALIZER_ENTITIES,
  UPDATE_NORMALIZER_ENTITY_ONE,
};
