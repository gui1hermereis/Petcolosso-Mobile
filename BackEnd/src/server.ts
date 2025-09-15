import { serverHttp } from "./app";

const port = process.env.NODE_ENV === "development" ? process.env.PORT : 8091;

serverHttp.listen(port, () => {
  console.log(`🚀🚀🚀🚀  Server is running on PORT ${port}`);
});