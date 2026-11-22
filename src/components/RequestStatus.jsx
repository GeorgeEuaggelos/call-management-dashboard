function RequestStatus({ loading, error, onBack, onRetry }) {
    if (loading) {
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
                        <p className='status-code'>{error.status}</p>
                        <p className='error-msg'>{error.message}</p>

                        {onRetry && (
                            <button className='error-btn' onClick={onRetry}>
                                Retry
                            </button>
                        )}

                        {onBack && (
                            <button className='error-btn' onClick={onBack}>
                                Back to Activity Feed
                            </button>
                        )}
                    </div>
                </div>
            </>
        );
    }

    return null;
}

export default RequestStatus;