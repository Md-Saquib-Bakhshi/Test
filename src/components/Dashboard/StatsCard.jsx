function StatsCard({ title, value, icon, className = "" }) {
    return (
      <div className={`stats-card ${className}`}>
        <div className="stats-card-content">
          <div className="stats-card-info">
            <p className="stats-card-title">{title}</p>
            <p className="stats-card-value">{value}</p>
          </div>
          {icon && <div className="stats-card-icon">{icon}</div>}
        </div>
      </div>
    )
  }
  
  export default StatsCard
  