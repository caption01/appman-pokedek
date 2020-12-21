import { notification } from "antd";

const config = {
  error: {
    msg: "Please Check api-server",
  },
};

const Notification = (type) => {
  notification[type]({
    message: config[type]?.msg,
  });
};

export default Notification;
