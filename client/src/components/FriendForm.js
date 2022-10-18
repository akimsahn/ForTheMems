import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

function FriendForm({ setErrors }) {
  const history = useHistory();
  const [formData, setFormData] = useState({
    full_name: "",
    birthday: "",
    last_hang_out: "",
    image_url: ""
  });

  function handleChange(e) {
    setFormData({...formData,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setErrors([]);
    fetch(`/friends`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    }).then((r) => {
      if (r.ok) {
        history.push("/")
      } else {
        r.json().then((err) => setErrors(err.errors))
      }
    });
  }

  return (
    <div>
      <form className='friend-form' onSubmit={handleSubmit}>
        <div className='align-form-items'>
          <label>
            Name : &nbsp;
            <input
              type='text'
              name='full_name'
              value={formData.full_name}
              onChange={handleChange}
              placeholder="Enter friend's full name"
            />
          </label>
          <label>
            Birthday : &nbsp;
            <input
              type='date'
              name='birthday'
              value={formData.birthday}
              onChange={handleChange}
            />
          </label>
          <label>
            Last Hangout : &nbsp;
            <input
              type='date'
              name='last_hang_out'
              value={formData.last_hang_out}
              onChange={handleChange}
            />
          </label>
          <label>
            Image URL : &nbsp;
            <input
              type='text'
              name='image_url'
              value={formData.image_url}
              onChange={handleChange}
            />
          </label>
        </div>
        <hr/>
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default FriendForm;