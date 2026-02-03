const PredictionList = ({ predictions }) => {
  return (
    <div style={{ padding: '10px', background: '#f0f0f0', minWidth: '200px' }}>
      <h3>Detected Objects</h3>
      <ul>
        {predictions.map((p, i) => (
          <li key={i}>
            <strong>{p.class}</strong>: {Math.round(p.score * 100)}%
          </li>
        ))}
        {predictions.length === 0 && <li>Scanning...</li>}
      </ul>
    </div>
  );
};

export default PredictionList;