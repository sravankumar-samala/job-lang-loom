import { createRef, forwardRef } from "react";
import { useNavigate } from "react-router-dom";
import { MdLogout } from "react-icons/md";
import { useMediaQuery } from "@uidotdev/usehooks";
import Cookies from "js-cookie";
import Popup from "reactjs-popup";
import "./index.css";

const ForwardedMdLogout = forwardRef(function ForwardedMdLogout(props, ref) {
  return <MdLogout {...props} forwardref={ref} />;
});

export default function LogoutButton() {
  const isSmalScreen = useMediaQuery("(max-width: 576px)");
  const ref = createRef();

  return (
    <Popup
      trigger={
        isSmalScreen ? (
          <ForwardedMdLogout ref={ref} className="logout-icon" />
        ) : (
          <button type="button" className="logout-btn">
            Logout
          </button>
        )
      }
      modal
    >
      {(close) => <LogoutPopupContent close={close} />}
    </Popup>
  );
}

function LogoutPopupContent({ close }) {
  const navigate = useNavigate();

  const sessionLogout = () => {
    Cookies.remove("jwt_token");
    navigate("/login");
  };

  return (
    <div className="popup-container">
      <div className="content">
        <h3>Logout</h3>
        <p>Click confirm to logout from session</p>
      </div>
      <div className="popup-bottom">
        {/* <!-- these may be a buttons --> */}
        <button type="button" className="cancel-btn" onClick={close}>
          Cancel
        </button>
        <button type="button" className="confirm-btn" onClick={sessionLogout}>
          Confirm
        </button>
      </div>
    </div>
  );
}
