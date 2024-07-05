import React from "react";
import { hydrateRoot } from "react-dom/client"
import {HomePage} from "./App.jsx";


// The hydrateRoot function is used to hydrate the server-rendered HTML with React components.
// This is where the client-side rendering takes over from the server-rendered HTML.
hydrateRoot(document).render(<HomePage/>)