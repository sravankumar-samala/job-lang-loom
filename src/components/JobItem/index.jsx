import { useNavigate } from "react-router-dom";
import RenderSalaryDetails from "../../Utilities/renderSalaryDetails";

export default function JobItem(props) {
  const { jobObj } = props;
  const navigate = useNavigate();
  const { id, title, company, location, salaryMax, salaryMin } = jobObj;

  return (
    <li className="job-item">
      <div className="detail-block company">
        <p>Company: </p>
        <h4>{company.displayName}</h4>
      </div>

      <div className="detail-block role">
        <p>Role: </p>
        <h3>{title}</h3>
      </div>
      <div className="detail-block salary">
        <p>Salary: </p>
        <RenderSalaryDetails salaryMax={salaryMax} salaryMin={salaryMin} />
      </div>
      <div className="detail-block location">
        <p>Location: </p>
        <h4>{location.displayName}</h4>
      </div>

      <button
        type="button"
        className="view-more-btn"
        onClick={() => navigate(`/jobDetails/${id}`)}
      >
        More Details &#x2192;
      </button>
    </li>
  );
}
