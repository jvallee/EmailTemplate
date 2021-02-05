import React, { useEffect, useState } from "react";
import { ApiApi, Job } from "../../../util/gen/api/dist";
import JobCell from "../../common/JobCell/JobCell";

type AllJobsPageProps = {
  setQueryInfo?: Function;
  apiService?: ApiApi;
};

const AllJobsPage: React.FC<AllJobsPageProps> = (props) => {
  const { apiService } = props;
  const [jobs, setJobs] = useState([{} as Job]);

  useEffect(() => {
    apiService?.apiJobsList().then((value) => {
      const temp = value.data;
      setJobs(temp);
    });
  }, []);

  const jobcells = jobs?.map((job) => {
    return <JobCell job={job} />;
  });

  return <div>{jobcells}</div>;
};

export default AllJobsPage;
