import CallItem from './CallItem.jsx'

function CallsList({onSelect, calls, onArchive}) {
    const activeCalls = calls.filter(call => !call.is_archived);
    
    return (
        activeCalls.length === 0 ? (
            <p className='no-calls-msg'>All calls have been archived.</p>
        ) : (
        <ul>
            {activeCalls.map(call => (
                <CallItem onSelect={onSelect} key={call.id} call={call} onArchive={onArchive} />
            ))}
        </ul>
        )
    );
}

export default CallsList;