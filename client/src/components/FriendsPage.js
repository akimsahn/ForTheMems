import React, { useEffect, useState } from 'react';
import FriendCard from './FriendCard';
import MemoryCard from './MemoryCard';

function FriendsPage({ user, setErrors }) {
  const [friends, setFriends] = useState([]);
  const [memories, setMemories] = useState([]);

  useEffect(() => {
    fetch('/friends')
      .then((r) => r.json())
      .then(setFriends)
  }, [])

  // function onNewFriend(newFriend) {
  //   setFriends([...friends, newFriend])
  // }

  function onUpdateFriend(updatedFriend) {
    setFriends(friends.map(friend => friend.id !== updatedFriend.id ? friend : updatedFriend))
  }

  function onRemoveFriend(deletedFriend) {
    setFriends(friends.filter(friend => friend.id !== deletedFriend.id))
    setMemories([])
  }

  function onRemoveMemory(deletedMemory) {
    setMemories(memories.filter(memory => memory.id !== deletedMemory.id))
  }

  return (
    <div className='friends-page'>
      <div className="container">
        {friends.map((friend) => <FriendCard
          key={friend.id}
          friend={friend}
          onUpdateFriend={onUpdateFriend}
          onRemoveFriend={onRemoveFriend}
          setMemories={setMemories}
          setErrors={setErrors}
        />)}
      </div>
      <hr/>
      <div className="container">
        {memories.length > 0 ? (
          memories.map((memory) => <MemoryCard key={memory.id} user={user} memory={memory} onRemoveMemory={onRemoveMemory} />)
        ) : (
          <h2>Select friend to view memories</h2>
        )}
      </div>
    </div>
  )
}

export default FriendsPage;