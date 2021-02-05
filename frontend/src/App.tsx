import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "./components/pages/Home/Home";
import { ApiApi, Candidate, Job, Client } from "./util/gen/api/dist";
import AllJobsPage from "./components/pages/Jobs/allJobs";
import OutReachEditorPage from "./components/pages/OutReachEditor/OutReachEditor";
import Header from "./components/common/Header/Header";

function App() {
  const initialClient: Client = { name: "", jobs: [], id: 0 };
  const [client, setClient] = useState(initialClient);
  const apiService = new ApiApi(undefined, "http://127.0.0.1:8000");

  return (
    <div>
      <Header />
      <Router>
        <Switch>
          <Route path="/alljobs/:id">
            <OutReachEditorPage apiService={apiService} />
          </Route>
          <Route path="/alljobs">
            <AllJobsPage apiService={apiService} />
          </Route>
          <Route path="/">
            <HomePage
              client={client}
              apiService={apiService}
              setClient={setClient}
            />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
