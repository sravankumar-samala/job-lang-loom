import { useCallback, useEffect } from "react";
import { BiSearch } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import Header from "../Header/index.jsx";
import convertJsonIntoJsObject from "../../Utilities/convertJsonToJsObject.jsx";
import renderJobsList from "../../Utilities/renderList.jsx";
import {
  addToJobsList,
  setApiStatus,
  setLanguage,
} from "../../Store/jobsReducer.jsx";
import "./index.css";

const apiStatusConstants = {
  initial: "Initial",
  pending: "Pending",
  success: "Success",
  failed: "Failed",
};

export default function Home() {
  const apiStatus = useSelector((state) => state.apiStatus);
  const language = useSelector((state) => state.language);
  const jobs = useSelector((state) => state.jobs);
  const dispatch = useDispatch();

  // fetch jobs function
  const getJobsList = useCallback(async () => {
    dispatch(setApiStatus(apiStatusConstants.pending));
    const url = `https://api.adzuna.com/v1/api/jobs/in/search/1?app_id=6c53bfa6&app_key=62985f024950ea9c24ebc5f0c9a971b0&results_per_page=40&what=${language}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      const updatedJobsList = convertJsonIntoJsObject(data.results);

      dispatch(
        addToJobsList({ jobsListData: updatedJobsList, language: language })
      );
      dispatch(setApiStatus(apiStatusConstants.success));
    } catch (error) {
      dispatch(setApiStatus(apiStatusConstants.failed));
      console.log(`${error.message}, check your network connection`);
    }
  }, [language, dispatch]);

  useEffect(() => {
    if (language !== "" && jobs.currLang !== language) {
      getJobsList();
    }
  }, [language, getJobsList, jobs.currLang]);

  const onSubmitFetch = (e) => {
    e.preventDefault();
    getJobsList();
  };

  return (
    <div className="home-container">
      <Header />
      <section className="find-jobs-container">
        <div className="title-container">
          <h1>Find jobs by programming language</h1>
          <p>Select a programming language to get related jobs list</p>
          <form className="form-container" onSubmit={onSubmitFetch}>
            <select
              className="select-language"
              value={language}
              onChange={(e) => dispatch(setLanguage(e.target.value))}
            >
              <option value="">Select a language</option>
              <option value="C++">C++</option>
              <option value="Java">Java</option>
              <option value="Python">Python</option>
              <option value="Javascript">Javascript</option>
              <option value="Swift">Swift</option>
              <option value="PHP">PHP</option>
              <option value="Ruby">Ruby</option>
              <option value="Kotlin">Kotlin</option>
              <option value="Rust">Rust</option>
            </select>
            <button type="submit" className="search-btn">
              <BiSearch />
            </button>
          </form>
        </div>
        <h2 className="jobs-list-title">{`${
          language ? language + " Related" : ""
        } Jobs`}</h2>
        {apiStatus === apiStatusConstants.initial ? (
          <p className="no-jobs-view">
            Search jobs by selecting a language to get related jobs list
          </p>
        ) : (
          renderJobsList(apiStatus)
        )}
      </section>
    </div>
  );
}
