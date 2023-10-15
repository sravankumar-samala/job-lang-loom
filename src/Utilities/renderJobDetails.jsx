import JobDetailsSuccessView from "../components/JobDetailsSuccessView";
import LoadingView from "../components/LoaderSpinner";

const apiStatusConstants = {
  initial: "Initial",
  pending: "Pending",
  success: "Success",
  failed: "Failed",
};

export default function renderJobDetails(apiStatus) {
  switch (apiStatus) {
    case apiStatusConstants.pending:
      return <LoadingView />;
    case apiStatusConstants.success:
      return <JobDetailsSuccessView />;
    case apiStatusConstants.failed:
      return <p>Failed to fetch job details, please try again.</p>;
    default:
      return null;
  }
}
