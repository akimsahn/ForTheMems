import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import NavBar from './NavBar';
import Home from './Home';
import FriendsPage from './FriendsPage';
import MemoriesPage from './MemoriesPage';
import FriendForm from './FriendForm';
import MemoryForm from './MemoryForm';


function App() {
  const [user, setUser] = useState(null);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    // auto-login
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, []);

  console.log(`errors: ${errors}`)

  if (!user) return <Home setUser={setUser} />;

  return (
    <div>
      <NavBar user={user} setUser={setUser} />
      {errors === undefined ? null : (
        errors.map((err) => (
          <p className='error'>{err}</p>
        ))
      )}
      <Switch>
        <Route exact path='/'>
          <FriendsPage user={user} setErrors={setErrors} />
        </Route>
        <Route exact path='/new_friend'>
          <FriendForm setErrors={setErrors} />
        </Route>
        <Route exact path='/new_memory'>
          <MemoryForm setErrors={setErrors} />
        </Route>
        <Route exact path='/all_memories'>
          <MemoriesPage user={user} setErrors={setErrors} />
        </Route>
      </Switch>
    </div>
  )
}

export default App;
