import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "./components/pages/Home/Home";
import { Candidate, Job, Client, ValleeBackendApi } from "./util/gen/api/dist";
import AllJobsPage from "./components/pages/Jobs/allJobs";
import OutReachEditorPage from "./components/pages/OutReach/OutReach";
import Header from "./components/common/Header/Header";

function App() {
  const initialClient: Client = { name: "", jobs: [], id: 0 };
  const [client, setClient] = useState(initialClient);
  const apiService = new ValleeBackendApi(
    undefined,
    "http://127.0.0.1:8000/api"
  );

  return (
    <div>
      <Header />
      <Router>
        <Switch>
          <Route path="/alljobs/:id">
            {/* <OutReachEditorPage apiService={apiService} /> */}
            <OutReachEditorPage />
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
