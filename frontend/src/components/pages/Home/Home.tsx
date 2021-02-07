import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { ValleeBackendApi, Client } from "../../../util/gen/api/dist";

type HomePageProps = {
  client: Client;
  setClient: React.Dispatch<React.SetStateAction<Client>>;
  setQueryInfo?: Function;
  apiService?: ValleeBackendApi;
};

const HomePage: React.FC<HomePageProps> = (props) => {
  const { client, setClient, apiService } = props;
  const login = () => {
    debugger;
    console.log("clicked");
    apiService?.getClient(1).then((value) => {
      debugger;
      setClient(value.data);
    });
  };
  return (
    <div>
      <div>
        {client.name == "" && <button onClick={login}>Click to login</button>}
      </div>
      <div>
        <Link to="/alljobs">Go jobs Page</Link>
      </div>
    </div>
  );
};

export default HomePage;
