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
  const [errorSource, setErrorSource] = useState(null); //When errors occur, I encounter different error sources and use the corresponding back or refresh buttons

  async function fetchCalls() {
    setLoading(true);
    setError(null);
    setErrorSource(null);

    try {
      const data = await getCalls();
      setCalls(data);
    } catch (error) {
      setError(error);
      setErrorSource('calls');
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  }

  function handleRetry() {
    fetchCalls();
  }

  useEffect(() => {
    fetchCalls();
  }, []);
  
  async function handleClickedItem(call) {
    setLoading(true);
    setError(null);
    setErrorSource(null);

    try {
      const specificCall = await getCallById(call.id);
      setDetail(specificCall);
    } catch (error) {
      setError(error);
      setErrorSource('detail');
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  }

  function handleBackToCalls() {
    setDetail(null);
    setError(null);
  }

  async function handleArchive(id) {
    setLoading(true);
    setError(null);
    setErrorSource(null);

    try {
      await archiveCall(id);
      setCalls(prevCalls => {
        return prevCalls.map(call => {
          if (call.id === id) {
            return {...call, is_archived: true};
          } else {
            return call;
          }
        });
      });
    } catch (error) {
      setError(error);
      setErrorSource('archive');
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  }

  if (loading || error) {
    return <RequestStatus loading={loading} error={error} onBack={handleBackToCalls} errorSource={errorSource} onRetry={handleRetry}/>;
  } else {
    return (
      <>
        <div className='header'>
          <h1>Call Center</h1>
        </div>
        <div className='main'>
          {detail === null ? (
            <>
              <h2>Activity Feed</h2>
              <CallsList onSelect={handleClickedItem} calls={calls} onArchive={handleArchive} />
            </>
          ) : (
            <CallItemsDetail call={detail} onBack={handleBackToCalls} />
          )}
        </div>
      </>
    )
  }
}

export default App;
