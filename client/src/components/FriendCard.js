import React, { useState } from 'react';

function FriendCard({ friend, onUpdateFriend, onRemoveFriend, setMemories, setErrors }) {
  const { id, full_name, birthday, last_hang_out, image_url } = friend;
  const [lastHangout, setLastHangout] = useState("");

  function handleChange(e) {
    setLastHangout(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault();
    setErrors([]);
    fetch(`/friends/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({last_hang_out: lastHangout})
    }).then((r) => {
      if (r.ok) {
        setLastHangout("");
        r.json().then((friend) => onUpdateFriend(friend));
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
  }

  function handleDelete() {
    setErrors([]);
    fetch(`/friends/${id}`, {method: 'DELETE'})
      .then((r) => r.json())
      .then((friend) => onRemoveFriend(friend))
  }

  function onSelectFriend() {
    setErrors([]);
    fetch(`/friends/${id}`)
      .then((r) => {
        if (r.ok) {
          r.json().then((newMemories) => setMemories(newMemories));
        } else {
          r.json().then((err) => setErrors(err.errors));
        }
      });
  }
  
  return (
    <div className="card" onClick={onSelectFriend} >
      <div className='centered'>
        <img src={image_url} alt="friend" />
      </div>
      <div className='card-info'>
        <h2>{full_name}</h2>
        <h4>Birthday: &nbsp; {birthday}</h4>
        <h4>Last Hangout: &nbsp; {last_hang_out}</h4>
        <form onSubmit={handleSubmit}>
          <label>Update hangout: &nbsp; </label>
          <input
            type="date"
            value={lastHangout}
            onChange={handleChange}
            placeholder="Enter new hangout date"
          /> &nbsp;
          <button type="submit">Update</button>
        </form>
        <hr />
        <button onClick={handleDelete}>Unfriend</button>
      </div>
    </div>
  )
}

export default FriendCard;