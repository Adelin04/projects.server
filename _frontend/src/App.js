import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import Home from "../src/pages/Home";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Dashboard from "./components/Dashboard/Dashboard";
import EditProject from "./components/Projects/EditProject";
import FinishedProjects from "./components/Projects/FinishedProjects";
import NewProject from "./components/Projects/NewProject";
import SettingUserProfile from "./components/UserProfile/SettingUserProfile";
import { ProjectsProvider } from "../src/components/Context/ProjectsContext";
import { UserProvider } from "./components/Context/UserContext";

//React Router
const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <UserProvider>
            <ProjectsProvider>
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/" component={Home} />
              <Route exact path="/dashboard" component={Dashboard} />
              <Route exact path="/get/project/:id" component={EditProject} />
              <Route exact path="/new-project" component={NewProject} />
              <Route
                exact
                path="/finished-projects"
                component={FinishedProjects}
              />
              <Route
                exact
                path="/user-profile"
                component={SettingUserProfile}
              />
            </ProjectsProvider>
          </UserProvider>
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
