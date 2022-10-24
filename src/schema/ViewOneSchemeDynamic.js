import Normalizer from "../services/normalizer";

export default (entityName) => Normalizer.SchemaEntity(entityName, {}, { idAttribute: "id" });
