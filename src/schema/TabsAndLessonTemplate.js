import Normalizer from "../services/normalizer";
import CoursePartScheme from "./CoursePartScheme";

export default Normalizer.SchemaEntity(
  "tabs-and-lesson-templates",
  {
    courseParts: [CoursePartScheme],
  },
  { idAttribute: "id" }
);
