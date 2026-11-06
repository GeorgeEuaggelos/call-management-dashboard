import CallItem from './CallItem.jsx'

function CallsList({onSelect, calls, onArchive}) {
    return (
        <ul>
            {calls.filter(call => !call.is_archived
            ).map(call => (
                <CallItem onSelect={onSelect} key={call.id} call={call} onArchive={onArchive} />
            ))}
        </ul>
    );
}

export default CallsList;