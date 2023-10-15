import { useCallback, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Header from "../Header";
import convertJsonIntoJsObject from "../../Utilities/convertJsonToJsObject";
import { addJobDetailsObj, setApiStatus } from "../../Store/jobsReducer";
import renderJobDetails from "../../Utilities/renderJobDetails";
import "./index.css";

const apiStatusConstants = {
  initial: "Initial",
  pending: "Pending",
  success: "Success",
  failed: "Failed",
};

export default function JobDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const apiStatus = useSelector((state) => state.apiStatus);
  const jobDetailsObj = useSelector((state) => state.jobDetailsObj);

  const getJobDetails = useCallback(async () => {
    dispatch(setApiStatus(apiStatusConstants.pending));
    const url = `https://api.adzuna.com/v1/api/jobs/in/search/1?app_id=6c53bfa6&app_key=62985f024950ea9c24ebc5f0c9a971b0&results_per_page=40&what=${id}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      const updatedJobObject = convertJsonIntoJsObject(data.results[0]);
      // console.log(updatedJobObject)
      dispatch(addJobDetailsObj(updatedJobObject));
      dispatch(setApiStatus(apiStatusConstants.success));
    } catch (error) {
      dispatch(setApiStatus(apiStatusConstants.failed));
      console.log(`${error.message}, check your network connection`);
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (isNaN(id)) navigate("/home");
    const isJobObjectEmpty = Object.keys(jobDetailsObj).length === 0;
    const isSimilarJobObj = jobDetailsObj.id === id;

    if (isJobObjectEmpty || !isSimilarJobObj) {
      getJobDetails();
    }
  }, [getJobDetails, jobDetailsObj, id, navigate]);

  return (
    <div className="job-details-page-container">
      <Header />
      <div className="job-details-container">
        {apiStatus === apiStatusConstants.initial ? (
          <p>No Job Details To Show.</p>
        ) : (
          renderJobDetails(apiStatus)
        )}
      </div>
    </div>
  );
}
