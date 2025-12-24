import React from "react";

import { createRoot } from "react-dom/client";
import { Normalize } from "styled-normalize";

import { App } from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

// eslint-disable-next-line no-undef
const container = document.getElementById("root");
const root = createRoot(container);

const Root = () => (
  <React.Fragment>
    <Normalize />
    <App />
  </React.Fragment>
);

root.render(<Root />);

serviceWorkerRegistration.register();
