import { getCalls, getCallById, archiveCall } from './services/callService.js';
import CallsList from './components/CallsList.jsx';
import CallItemsDetail from './components/CallItemsDetail.jsx';
import RequestStatus from './components/RequestStatus.jsx';
import { useState, useEffect } from 'react';
import './App.css'

function App() {
  const [calls, setCalls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [detail, setDetail] = useState(null);
  const [archiveError, setArchiveError] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [detailError, setDetailError] = useState(null);
  const [archivingId, setArchivingId] = useState(null);

  async function loadCalls() {
    try {
      const data = await getCalls();
      setCalls(data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  async function fetchCalls() {
    setLoading(true);
    setError(null);

    await loadCalls();
  }

  useEffect(() => {
    getCalls()
      .then(data => {
        setCalls(data);
      })
      .catch(error => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  
  async function handleClickedItem(call) {
    setDetail(null);
    setDetailLoading(true);
    setDetailError(null);

    try {
      const specificCall = await getCallById(call.id);
      setDetail(specificCall);
    } catch (error) {
      setDetailError(error);
    } finally {
      setDetailLoading(false);
    }
  }

  function handleBackToCalls() {
    setDetail(null);
    setDetailError(null);
  }

  async function handleArchive(id) {
    setArchiveError(null);
    setArchivingId(id);

    try {
      const updatedCall = await archiveCall(id);

      setCalls(prevCalls =>
        prevCalls.map(call =>
          call.id === id ? updatedCall : call
        )
      );
    } catch (error) {
      setArchiveError({ id, error });
    } finally {
      setArchivingId(null);
    }
  }

  if (detailLoading || detailError) {
    return (
      <RequestStatus
        loading={detailLoading}
        error={detailError}
        onBack={handleBackToCalls}
      />
    );
  }

  if (loading || error) {
    return <RequestStatus loading={loading} error={error} onRetry={fetchCalls}/>;
  } 
  
  return (
    <>
      <div className='header'>
        <h1>Call Center</h1>
      </div>
      <div className='main'>
        {detail === null ? (
          <>
            {archiveError && (
              <div className='error-banner'>
                <p className="archive-error">
                  {archiveError.error.message}
                </p>
                <button onClick={() => setArchiveError(null)}>
                  Dismiss
                </button>
              </div>
            )}
            <h2>Activity Feed</h2>
            <CallsList onSelect={handleClickedItem} calls={calls} onArchive={handleArchive} archivingId={archivingId} />
          </>
        ) : (
          <CallItemsDetail call={detail} onBack={handleBackToCalls} />
        )}
      </div>
    </>
  );
}

export default App;
