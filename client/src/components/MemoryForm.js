import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

function MemoryForm({ setErrors }) {
  const history = useHistory();
  const [memory, setMemory] = useState([]);
  const [memoryData, setMemoryData] = useState({
    date: "",
    image_url: "",
    comment: ""
  });
  const [friendData, setFriendData] = useState([{
    friend_name: "",
    friend_is_user: false
  }]);

  useEffect(() => {
    setErrors([])
    if (memory.length !== 0) {
      handleFriendSubmit()
    }
  }, [memory])

  function handleMemoryDataChange(e) {
    setMemoryData({
      ...memoryData,
      [e.target.name]: e.target.value,
    });
  }

  function handleFriendDataChange(i, e) {
    let newFriendData = [...friendData]
    newFriendData[i][e.target.name] = e.target.value
    setFriendData(newFriendData)
  }

  function handleCheckbox(i, e) {
    let newFriendData = [...friendData]
    newFriendData[i][e.target.name] = !friendData[i][e.target.name]
    setFriendData(newFriendData)
  }

  function addFriendField() {
    setFriendData([...friendData,
      {
        friend_name: "",
        friend_is_user: false
      }
    ]);
  }

  function removeFriendField(i) {
    let newFriendData = [...friendData]
    newFriendData.splice(i, 1)
    setFriendData(newFriendData)
  }

  console.log(memory)

  function handleMemorySubmit(e) {
    e.preventDefault();
    setErrors([]);
    if (memory.length !== 0) {
      handleFriendSubmit()
    } else {
      fetch(`/memories`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(memoryData)
      }).then((r) => {
        if (r.ok) {
          r.json().then((newMemory) => setMemory(newMemory))
        } else {
          r.json().then((err) => setErrors(err.errors))
        }
      });
    }
  }
  
  function handleFriendSubmit() {
    fetch(`/friend_memories`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        friend_memory: friendData,
        memory_id: memory.id,
      })
    }).then((r) => {
      if (r.ok) {
        history.push("/");
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
  }

  return (
    <div>
      <form className='memory-form' onSubmit={handleMemorySubmit}>
        <label>
          Date: &nbsp;
          <input
            type='date'
            name='date'
            value={memoryData.date}
            onChange={handleMemoryDataChange}
          />
        </label>
        <label>
          Image URL: &nbsp;
          <input
            type='text'
            name='image_url'
            value={memoryData.image_url}
            onChange={handleMemoryDataChange}
            placeholder='Enter URL'
          />
        </label>
        <label>
          Comment: &nbsp;
          <input
            type='text'
            name='comment'
            value={memoryData.comment}
            onChange={handleMemoryDataChange}
            placeholder='Add comment'
          />
        </label>
        <hr/>
        {friendData.map((friend, index) => (
          <div key={index}>
            <label>
              Tag Friend: &nbsp;
              <input
                type='text'
                name='friend_name'
                value={friend.friend_name}
                onChange={(e) => handleFriendDataChange(index, e)}
                placeholder="Enter name or username"
              />
            </label>
            <label>
              &nbsp; Username entered? &nbsp;
              <input
                className='min-width'
                type='checkbox'
                name='friend_is_user'
                value={friend.friend_is_user}
                onChange={(e) => handleCheckbox(index, e)}
              />
            </label>
            <button className='min-width' type='button' onClick={() => removeFriendField(index)}>X</button>
          </div>
        ))}
        <button type='button' onClick={addFriendField}>Tag Another Friend</button>
        <hr/>
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default MemoryForm;