import Normalizer from "../services/normalizer";

export default (schemeName, idAttribute = "id") => Normalizer.SchemaEntity(schemeName, {}, { idAttribute });
