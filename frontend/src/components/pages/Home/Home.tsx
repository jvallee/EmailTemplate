import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { ApiApi, Client } from "../../../util/gen/api/dist";
// import { ApiApi, Client } from "../../../../util/gen/api/dist";

type HomePageProps = {
  client: Client;
  setClient: React.Dispatch<React.SetStateAction<Client>>;
  setQueryInfo?: Function;
  apiService?: ApiApi;
};

const HomePage: React.FC<HomePageProps> = (props) => {
  const { client, setClient, apiService } = props;
  const login = () => {
    debugger;
    console.log("clicked");
    apiService?.apiClientsRetrieve(1).then((value) => {
      debugger;
      props.setClient(value.data);
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
