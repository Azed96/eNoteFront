
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";

import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";
import AdministrateurLayout from "layouts/Administrateur.js"
import EtudiantLayout from "layouts/Student"


ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/auth" render={props => <AuthLayout {...props} />} />
      <Route path="/admin" render={props => <AdminLayout {...props} />} />
      <Route path="/administrateur" render={props => <AdministrateurLayout {...props} />} />
      <Route path="/etudiant" render={props => <AdministrateurLayout {...props} />} />

      <Redirect from="/" to="/auth" />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
