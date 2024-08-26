import { serverHttp } from "./app";
import fs from "fs";

const port = process.env.NODE_ENV === "development" ? process.env.PORT : 8091;

fs.readFile("banner.txt", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
});
serverHttp.listen(port, () => console.log(`🚀🚀🚀🚀  Server is running on PORT ${port}`));
