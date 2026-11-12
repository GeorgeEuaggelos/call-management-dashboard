function CallItem({ call, onSelect, onArchive }) {
  return (
    <li className="call-item" onClick={() => onSelect(call)}>
      <div className="call-info">
        <div
          className={`call-direction ${call.direction === "Inbound" ? "inbound" : "outbound"}`}
        >
          {call.direction === "Inbound" ? <p>↙</p> : <p>↗</p>}

          {call.direction}
        </div>
        <div className={`call-type ${call.call_type}`}>
          {call.call_type}
        </div>
      </div>

      <div className="call-from-to">
        {call.from}
        <i className="fa-solid fa-arrow-right-long"></i>
        {call.to}
      </div>

      <div className="date-info">
        <div className="call-date">{call.created_at}</div>
        {call.duration !== 0 && (
          <div className="call-duration">{call.duration}s</div>
        )}
      </div>

      <div className="call-btn">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onArchive(call.id);
          }}
        >
          Archive
        </button>
      </div>
    </li>
  );
}

export default CallItem;
