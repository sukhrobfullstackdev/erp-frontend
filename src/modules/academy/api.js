import request from "../../services/api";

class Api {
  static ChangeOrder = (url, id, attributes) => {
    if (!url) throw new Error("url not found: change orderdan url topilmadi");
    else return request.put(`${url}/${id}`, attributes);
  };
}

export default Api;
