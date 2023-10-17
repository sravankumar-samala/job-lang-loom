import { useSelector } from "react-redux";
import Popup from "reactjs-popup";
import JobApplicationForm from "../JobApplicationForm";
import RenderSalaryDetails from "../../Utilities/renderSalaryDetails";

export default function JobDetailsSuccessView() {
  const jobDetailsObj = useSelector((state) => state.jobDetailsObj);
  const {
    title,
    company,
    location,
    contractTime,
    salaryMin,
    salaryMax,
    category,
    description,
    redirectUrl,
  } = jobDetailsObj;
  console.log(jobDetailsObj);

  return (
    <section className="details-wrapper">
      <div className="job-details-header">
        <h3>{company?.displayName}</h3>
        <h1 className="title">{title}</h1>
      </div>
      <div className="more-job-details">
        <div className="micro-details">
          <h4>Location</h4>
          <p>{location?.displayName}</p>
        </div>
        <div className="micro-details">
          <h4>Contract</h4>
          <p>{contractTime || "Not specified"}</p>
        </div>
        <div className="micro-details">
          <h4>Category</h4>
          <p>{category?.label}</p>
        </div>
        <div className="micro-details">
          <h4>Salary</h4>
          <RenderSalaryDetails salaryMax={salaryMax} salaryMin={salaryMin} />
        </div>
      </div>
      <div className="micro-details description">
        <h4>Description</h4>
        <p>{description}</p>
      </div>
      <div className="micro-details">
        <h4>Original post link</h4>
        <a className="redirect-link" href={redirectUrl}>
          Take me to the original post
        </a>
      </div>

      <Popup
        trigger={
          <button type="button" className="apply-btn">
            Apply
          </button>
        }
        modal
      >
        {(close) => <JobApplicationForm close={close} />}
      </Popup>
    </section>
  );
}
