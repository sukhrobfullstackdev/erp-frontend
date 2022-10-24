import { denormalize, normalize, schema } from "normalizr";

class Normalizer {
  static Normalize = (data, scheme) => {
    return normalize(data, scheme);
  };

  static Denormalize = (normalize_data, scheme, entities = {}) => {
    return denormalize(normalize_data, scheme, entities);
  };

  static SchemaEntity = (key, definitions = {}, options = {}) => {
    return new schema.Entity(key, definitions, options);
  };
}

export default Normalizer;
