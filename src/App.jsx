import initialCalls from './mocks/calls.js';
import CallsList from './components/CallsList.jsx';
import CallItemsDetail from './components/CallItemsDetail.jsx';
import { useState } from 'react';
import './App.css'

function App() {
  const [calls, setCalls] = useState(initialCalls);
  const [detail, setDetail] = useState(null);

  function handleClickedItem(call) {
    setDetail(call);
  }

  function handleBackToCalls() {
    setDetail(null);
  }

  function handleArchive(id) {
    setCalls(prevCalls => {
      return prevCalls.map(call => {
        if (call.id === id) {
          return {...call, is_archived: true};
        } else {
          return call;
        }
      });
    });
  }

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

export default App;
