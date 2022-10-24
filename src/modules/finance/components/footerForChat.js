import { memo, useState } from "react";
import Button from "../../../components/elements/button";
import ApiActions from "../../../services/api/actions";
import { connect } from "react-redux";
import { isEmpty, get } from "lodash";

const FooterForChat = ({ disabled, active, setChatRequest, chatId, setMessages = () => "" }) => {
  const [data, setData] = useState({
    value: "",
  });

  const onChangeHandling = (e) => setData((s) => ({ ...s, value: e.target.value }));

  const chatRequest = () => {
    !isEmpty(data.value) &&
      setChatRequest({
        attributes: {
          chatId,
          message: data.value,
        },
        cb: {
          success: (res) => {
            setMessages(get(res, "data.messages", []));
            setData((s) => ({ ...s, value: "" }));
          },
          fail: (e) => {
            // console.log(e)
          },
        },
      });
  };

  return (
    <div className="writeing_chat">
      <input type={"input"} name={"chatMassage"} disabled={disabled} value={data.value} onChange={onChangeHandling} />
      <Button success disabled={disabled || !active} onCLick={chatRequest}>
        SEND
      </Button>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    setChatRequest: ({ attributes, cb }) => {
      dispatch({
        type: ApiActions.REQUEST.REQUEST,
        payload: {
          method: "post",
          url: `finance/v1/expense-proposition/chat/message`,
          attributes,
          cb,
        },
      });
    },
  };
};

export default connect(null, mapDispatchToProps)(memo(FooterForChat));
