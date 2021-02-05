import React, { CSSProperties, useEffect } from "react";
import { Link } from "react-router-dom";
import { ApiApi, Job } from "../../../util/gen/api/dist";
import "./JobCell.css";

type JobCellProps = {
  job: Job;
  apiService?: ApiApi;
};

const myStyles: CSSProperties = {
  position: "absolute",
};
const JobCell: React.FC<JobCellProps> = (props) => {
  const { job, apiService } = props;
  debugger;
  //   useEffect(() => {
  //     debugger;
  //     apiService?.apiJobsList().then((value) => {
  //       const temp = value.data;
  //       var temp2: Job = value.data[0];
  //       debugger;
  //       console.log(temp);
  //     });
  //   }, []);

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
