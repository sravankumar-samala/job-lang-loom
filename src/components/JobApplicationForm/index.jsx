import { useState } from "react";
import "./index.css";

export default function JobApplicationForm({ close }) {
  const [applicationSuccess, setApplicationSuccess] = useState(false);

  return (
    <div>
      {applicationSuccess ? (
        <ApplicationSuccess
          close={close}
          setApplicationSuccess={setApplicationSuccess}
        />
      ) : (
        <ApplicationForm setApplicationSuccess={setApplicationSuccess} />
      )}
    </div>
  );
}

function ApplicationForm({ setApplicationSuccess }) {
  const onSubmit = (e) => {
    e.preventDefault();
    setApplicationSuccess(true);
  };

  return (
    <form className="apply-form-container" onSubmit={onSubmit}>
      <div className="input-field name-input">
        <label htmlFor="name">Enter your full name:</label>
        <input type="text" id="name" name="name" required />
      </div>
      <div className="input-field email-input">
        <label htmlFor="email">Enter your email:</label>
        <input type="email" id="email" name="email" required />
      </div>
      <div className="input-field cover-letter-input">
        <label htmlFor="cover-letter">Provide cover letter note:</label>
        <textarea id="cover-letter" name="note" rows="5" cols="50"></textarea>
      </div>
      <div className="input-field file-input">
        <label htmlFor="fileInput">Upload your CV:</label>
        <input type="file" id="fileInput" name="file" required />
      </div>
      <button type="submit" className="apply-btn apply-submit-btn">
        Apply
      </button>
    </form>
  );
}

function ApplicationSuccess({ close, setApplicationSuccess }) {
  const closeApplyForm = () => {
    setApplicationSuccess(false);
    close();
  };

  return (
    <div className="apply-form-container success-container">
      <h1>Application successfull</h1>
      <button
        type="button"
        onClick={closeApplyForm}
        className="success-btn apply-submit-btn"
      >
        Ok
      </button>
    </div>
  );
}
