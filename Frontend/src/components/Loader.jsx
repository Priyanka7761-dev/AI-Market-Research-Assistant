import "./Loader.css";

function Loader({ step, progress }) {
  return (
    <div className="loader-card">

      <div className="loader-header">

        <span className="brain">🧠</span>

        <div>
          <h2>AI Analysis Engine</h2>
          <p>Generating your market intelligence report...</p>
        </div>

      </div>

      <div className="progress-container">
        <div
          className="progress-fill"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <div className="progress-text">

        <span>{step}</span>

        <span>{progress}%</span>

      </div>

    </div>
  );
}

export default Loader;