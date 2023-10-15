import JobsListSuccessView from "../components/JobsSuccessView";
import LoadingView from "../components/LoaderSpinner";

const apiStatusConstants = {
  initial: "Initial",
  pending: "Pending",
  success: "Success",
  failed: "Failed",
};

export default function renderJobsList(apiStatus) {
  switch (apiStatus) {
    case apiStatusConstants.pending:
      return <LoadingView />;
    case apiStatusConstants.success:
      return <JobsListSuccessView />;
    case apiStatusConstants.failed:
      return <p>Failed to fetch jobs, please try again.</p>;
    default:
      return null;
  }
}
