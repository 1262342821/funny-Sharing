import React from "react";
import dva from "dva";
import {BrowserRouter as Router,Route,Link} from "react-router-dom";
import roter from "./router.js";

import counterModel from "./models/counterModel";

const app = dva();

app.model(counterModel);

app.router(roter);

app.start("#app-container");