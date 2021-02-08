import React, { useEffect, useState } from "react";
import { ValleeBackendApi, Job } from "../../../util/gen/api/dist";
import JobCell from "../../common/JobCell/JobCell";

type AllJobsPageProps = {
  setQueryInfo?: Function;
  apiService?: ValleeBackendApi;
};

/**
 * A component representing the all jobs page. Very barebones right now
 *  lists all the jobs that we can select an outreach for and wraps them in links to
 *  navigate them to the editor page (The main funcitonality of the web page currently)
 *  for regardless of which user they are connected to
 *  Next step with this is to only pull jobs related to the client logged in
 *
 * @param apiService - how we communicate with the backend
 *
 * @returns a react component
 *
 * @beta
 */
const AllJobsPage: React.FC<AllJobsPageProps> = (props) => {
  const { apiService } = props;
  const [jobs, setJobs] = useState([{} as Job]);

  // TODO: update similiar to how we get outreach pages related to job,
  // will need to change backend to handle a new route to get jobs related to client
  useEffect(() => {
    apiService?.listJob().then((value) => {
      setJobs(value.data);
    });
  }, []);

  const jobcells = jobs?.map((job) => {
    return <JobCell job={job} />;
  });

  return <div>{jobcells}</div>;
};

export default AllJobsPage;
