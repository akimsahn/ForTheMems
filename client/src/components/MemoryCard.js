import React from 'react';

function MemoryCard({ user, memory, onRemoveMemory }) {
  const { id, date, image_url, comment, created_user_id, users, friends } = memory
  const created_user = findCreatedUser()
  let friends_string = ""

  function findCreatedUser() {
    if (created_user_id !== user.id) {
      return users.find((user) => user.id === created_user_id)
    } else return null
  }

  function getFriends() {
    friends.forEach(friend => {
      if (!friends_string) {
        friends_string = friend.full_name
      } else {
        friends_string = `${friends_string}, ${friend.full_name}`
      }});
  }

  function handleDelete() {
    fetch(`memories/${id}`, { method: 'DELETE' })
      .then((r) => r.json())
      .then((memory) => onRemoveMemory(memory))
  }

  getFriends();
  
  return (
    <div className='card'>
      <h2>{date}</h2>
      <div className='centered'>
        <img src={image_url} alt="memory" />
        <h3>{comment}</h3>
        {!friends_string ? null : (
          <h4 className='italic'>With {friends_string}</h4>
        )}
        {!created_user ? null : (
          <p>Tagged by {created_user.username}</p>
        )}
        <hr/>
        <button onClick={handleDelete}>Forget memory</button>
      </div>
    </div>
  )
}

export default MemoryCard;