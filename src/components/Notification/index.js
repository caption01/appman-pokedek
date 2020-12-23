import { notification } from "antd";

const config = {
  error: {
    msg: "Please Check api-server",
  },
};

const Notification = (type, msg) => {
  notification[type]({
    message: msg || config[type]?.msg,
  });
};

export default Notification;
