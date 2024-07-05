import express from "express";
import path from 'node:path'
import buildStaticSite from "./buildStaticSite.js"
buildStaticSite();
const app = express();

app.use("/dist", express.static("dist")); //serve static files


app.get("/", function (req, res, next) {
  
 res.sendFile(path.resolve(process.cwd(), "public", "index.html"))
});


app.listen(5173);
