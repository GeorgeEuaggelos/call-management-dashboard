function CallItemsDetail({ call, onBack }) {
  return (
    <div className="call-details">
      <button className="back-btn" onClick={onBack}><i className="fa-solid fa-arrow-left-long"></i> Back to calls</button>
      <div className="detail-card">
        <h2>Call Details</h2>
        <div className="detail-grid">
          <div className="detail-row">
            <span className="detail-label">Direction</span>
            <span className={`detail-value ${call.direction === "Inbound" ? "inbound" : "outbound"}`}>
              {call.direction === "Inbound" ? "Inbound" : "Outbound"}
            </span>
          </div>
          <div className="detail-row">
            <span className="detail-label">From</span>
            <span className="detail-value">{call.from}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">To</span>
            <span className="detail-value">{call.to}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Type</span>
            <span className={`detail-value ${call.call_type}`}>{call.call_type}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Duration</span>
            <span className="detail-value">{call.duration}s</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Date</span>
            <span className="detail-value">{call.created_at}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Archived</span>
            <span className={`detail-value ${call.is_archived ? "Yes" : "No"}`}>{call.is_archived ? "Yes" : "No"}</span>
          </div>
        </div>
        <div className="call-notes">
          <h3>Notes</h3>
          {call.notes && call.notes.length > 0 ? (
            <ul>
              {call.notes.map(note => (
                <li key={note.id}>
                  {note.content}
                </li>
              ))}
            </ul>
          ) : (
            <p className="no-notes">No notes for this call.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default CallItemsDetail;
