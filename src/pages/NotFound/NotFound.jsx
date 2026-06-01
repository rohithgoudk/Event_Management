import { Link } from "react-router-dom";
import "./NotFound.css";

function NotFound() {
  return (
    <div className="nf-container">
      <div className="nf-card">

        <h1 className="nf-code">404</h1>

        <h2 className="nf-title">
          This Event Doesn't Exist
        </h2>

        <p className="nf-text">
          Looks like you've wandered backstage.
          The page you're searching for is not available.
        </p>

        <Link to="/">
          <button className="nf-btn">
            Return Home
          </button>
        </Link>

      </div>
    </div>
  );
}

export default NotFound;