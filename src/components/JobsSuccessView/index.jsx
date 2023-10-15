import { useSelector } from "react-redux";
import JobItem from "../JobItem";
import "./index.css";

export default function JobsListSuccessView() {
  const jobsList = useSelector((state) => state.jobs.list);

  return (
    <ul className="jobs-list">
      {jobsList.length === 0 ? (
        <p className="no-jobs-view">
          No jobs to show, try with other inputs or reload the page.
        </p>
      ) : (
        jobsList.map((each) => <JobItem key={each.id} jobObj={each} />)
      )}
    </ul>
  );
}
