import request from "../../services/api";

class Api {
  static ChangeModuleOrDepartmentOrPageOrder = ({ link = "edit-module", ...attributes }) => {
    return request.put(`auth/v1/setting/${link}`, {
      ...attributes,
    });
  };

  static UpdateModuleOrDepartmentOrPageTitle = ({ link, ...attributes }) => {
    return request.put(`auth/v1/setting/${link}`, {
      ...attributes,
    });
  };
  static FileUpload = (attributes, url) => {
    return request.post(url, attributes, {
      "Content-Type": "multipart/form-data",
    });
  };
}

export default Api;
