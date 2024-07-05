import express from "express";
import React from "react";
import { renderToPipeableStream } from "react-dom/server";
import { HomePage } from "../client/App.jsx";
const app = express();
app.get("/", function (req, res, next) {
  // The renderToPipeableStream function renders the React component to a stream.
  const { pipe } = renderToPipeableStream(<HomePage />, {
    // ensure that any client-side dependencies or  scripts required for the
    // application to function are included.
    // when the server sends the initial HTML to the client, it includes references to
    // these modules or scripts, allowing the client to seamlessly take over rendering 
    // and managing the application state after the initial load.
    bootstrapModules: ["/dist/main.bundle.js"],
    // onShellReady is called when the shell HTML is ready to be sent to the client.
    onShellReady() {
      res.setHeader("content-type", "text/html");
      pipe(res); // Pipe the rendered HTML to the response.
    },
  });
});
app.use("/dist", express.static("dist")); //serve static files
app.listen(5173);
