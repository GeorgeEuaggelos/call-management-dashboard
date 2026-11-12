function RequestStatus({ loading, error, onBack, errorSource, onRetry }) {
    if(loading) {
        return (
        <>
            <div className='header'>
            <h1>Call Center</h1>
            </div>
            <div className='main'>
            <p className='loading'>Loading...</p>
            </div>
        </>
        );
    } else if (error) {
        return (
        <>
            <div className='header'>
            <h1>Call Center</h1>
            </div>
            <div className='main'>
            <div className='error-frame'>
                <p className='status-code'>{ error.status }</p>
                <p className='error-msg'>{ error.message }</p>
                {errorSource === 'calls' ? (
                    <button className='error-btn' onClick={onRetry}>Retry</button>
                ) : (
                    <button className='error-btn' onClick={onBack}>Back to Activity Feed</button>
                )}
            </div>
            </div>
        </>
        );
    }

    return null;
}

export default RequestStatus;