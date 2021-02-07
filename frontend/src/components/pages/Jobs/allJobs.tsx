import React, { useEffect, useState } from "react";
import { ValleeBackendApi, Job } from "../../../util/gen/api/dist";
import JobCell from "../../common/JobCell/JobCell";

type AllJobsPageProps = {
  setQueryInfo?: Function;
  apiService?: ValleeBackendApi;
};

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
