import Axios from "axios";

const axois = Axios.create({
  baseURL: "http://localhost:3030",
});

export { axois };
