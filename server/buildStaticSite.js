import React from "react";
import { renderToPipeableStream } from "react-dom/server";
import { HomePage } from "../client/App.jsx";
import fs from "node:fs";
import path from "node:path";

export default function buildStaticSite() {
  // Establish path to the html to be statically generated
  const indexPath = path.resolve(process.cwd(), "public", "index.html");
  //check if that file already exists in the file system
  if (fs.existsSync(indexPath)) {
    //if it is remove it (delete?)
    fs.rmSync(indexPath, { force: true });
  }
  // Creating a stream to a file (from line 9)
  const stream = fs.createWriteStream(indexPath, {
    encoding: "utf-8",
    flags: "w",
    autoClose: true,
  });
  // Render the react component to the react element stream
  const { pipe } = renderToPipeableStream(<HomePage />, {
    //include the necessary client js (buttons and shit)
    bootstrapModules: ["/dist/main.bundle.js"],
    // instead of onShellReady (incremental) it needs to send when everything is good
    onAllReady() {
      // pipe the react element stream to the writable stream with desired path
      pipe(stream);
      //have to close the stream because not in req-res timeline
      stream.end();
    },
  });
}
