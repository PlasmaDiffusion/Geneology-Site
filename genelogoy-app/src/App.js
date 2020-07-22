import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Match,
  useParams,
  useHistory,
} from "react-router-dom";
import NavBar from "./components/unused/navbar";
import Counters from "./components/unused/counters";
import FamilyAdder from "./components/databaseComponents/familyAdder";
import FamilyLink from "./components/databaseComponents/familyLink";
import PersonEditor from "./components/databaseComponents/personEditor";
import FamilyEditor from "./components/databaseComponents/familyEditor";
import FamilyDetails from "./components/familyDetails";
import LoginPage from "./components/auth/loginPage";
import appWithRouterAccess from "./components/appWithRouterAccess";
import "./App.css";

import {
  Security,
  SecureRoute,
  LoginCallback,
  useOktaAuth,
} from "@okta/okta-react";
import AppWithRouterAccess from "./components/appWithRouterAccess";

class App extends Component {
  constructor(props) {
    super();
    console.log("App - Constructor", this.props);
  }

  componentDidMount() {
    console.log("App - Mounted", this.props);
  }

  render() {
    return (
      <React.Fragment>
        <FamilyLink />
        <FamilyAdder />
      </React.Fragment>
    );
  }
}

// This site has 3 pages, all of which are rendered
// dynamically in the browser (not server rendered).
/*        <main className="container">
          <Counters //Props go here:
            counters={this.state.counters}
            onReset={this.handleReset}
            onIncrement={this.handleIncrement}
            onDelete={this.handleDelete}
          />
        </main>*/
// Although the page does not ever refresh, notice how
// React Router keeps the URL up to date as you navigate
// through the site. This preserves the browser history,
// making sure things like the back button and bookmarks
// work properly.

export default function BasicExample() {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="login">Login</Link>
          </li>
        </ul>

        <hr />

        {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
        <Switch>
          <Route exact path="/">
            <FamilyLink />
          </Route>
          <SecureRoute path="/family/:id">
            <FamilyDetails />
          </SecureRoute>
          <AppWithRouterAccess />
          <SecureRoute path="/edit/person/:id">
            <PersonEditor />
          </SecureRoute>
          <SecureRoute path="/edit/family/:id">
            <FamilyEditor />
          </SecureRoute>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/logged_out">
            <p>You have been logged out.</p>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

// You can think of these components as "pages"
// in your app.
/*
const Home = (props) => {
  console.log(props);
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
};*/

function About() {
  return (
    <div>
      <h2>About</h2>
    </div>
  );
}

function Dashboard() {
  return (
    <div>
      <h2>Dashboard</h2>
    </div>
  );
}

const Home = () => {
  const { authState, authService } = useOktaAuth();

  if (authState.isPending) {
    return <div>Loading...</div>;
  }

  const button = authState.isAuthenticated ? (
    <button
      onClick={() => {
        authService.logout();
      }}
    >
      Logout
    </button>
  ) : (
    <button
      onClick={() => {
        authService.login();
      }}
    >
      Login
    </button>
  );

  return (
    <div>
      <Link to="/">Home</Link>
      <br />
      <Link to="/protected">Protected</Link>
      <br />
      {button}
    </div>
  );
};

//export default App;