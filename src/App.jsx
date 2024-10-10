import React, { useState } from 'react'
import Users from './Components/Users'

export const App = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  return (
    <div className="">
    <Users users={users} setUsers={setUsers} loading={loading} setLoading={setLoading} error={error} setError={setError}/>
    </div>
  )
}
