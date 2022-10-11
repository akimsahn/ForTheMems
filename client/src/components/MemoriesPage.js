import React, { useEffect, useState } from 'react';
import MemoryCard from './MemoryCard';

function MemoriesPage({ user, setErrors }) {
  const [memories, setMemories] = useState([])

  useEffect(() => {
    setErrors([]);
    fetch(`/memories`)
      .then((r) => {
        if (r.ok) {
          r.json().then((newMemories) => setMemories(newMemories))
        } else {
          r.json().then((err) => setErrors(err.errors))
        }
      });
  }, [])

  function onRemoveMemory(deletedMemory) {
    setMemories(memories.filter(memory => memory.id !== deletedMemory.id))
  }

  return (
    <div>
      {memories.length !== 0 ? (
        <div className="card-container">
          {memories.map(memory => <MemoryCard key={memory.id} user={user} memory={memory} onRemoveMemory={onRemoveMemory} />)}
        </div>
      ) : (
        <h2 className='message'>No memories yet :(</h2>
      )}
    </div>
  )
}

export default MemoriesPage;