import React from "react";
import { Link } from "react-router-dom";
import { ValleeBackendApi, Job } from "../../../util/gen/api/dist";
import "./JobCell.css";

type JobCellProps = {
  job: Job;
  apiService?: ValleeBackendApi;
};
// TODO: make this more customizable so can be used outside of only jobs
const JobCell: React.FC<JobCellProps> = (props) => {
  const { job } = props;

  return (
    <Link to={"/alljobs/" + job.id} style={{ textDecoration: "none" }}>
      <div className="userRoot">
        <div className="userAttributes">
          <div className="userAttribute">{job.name}</div>
        </div>
      </div>
    </Link>
  );
};

export default JobCell;
