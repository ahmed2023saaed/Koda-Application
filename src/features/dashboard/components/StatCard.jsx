function StatCard({ label, value, hint, icon, color }) {
  return (
    <div className="dh-stat" style={{ "--accent": color }}>
      <div>
        <p className="dh-stat__label">{label}</p>
        <h3 className="dh-stat__value">{value}</h3>
        <p className="dh-stat__hint">{hint}</p>
      </div>
      <div className="dh-stat__icon">{icon}</div>
    </div>
  );
}

export default StatCard;