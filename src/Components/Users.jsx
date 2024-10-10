import React, { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import spinner from "../images/spinner2.gif";
import { Modal } from "./Modal";

const Users = ({ users, setUsers, loading, setLoading, error, setError }) => {
  const [showModal, setShowModal] = useState(false);
  const [userid, setUserId] = useState(null)

  //fetch Users
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((error) => {
        setError("Failed to fetch users");
        setLoading(false);
      });
  }, []);


  // Modal Open functions
  const openModal = () => {
    setUserId(null)
    setShowModal(true);
  };
 // Modal close functions
  const closeModal = () => {
    setShowModal(false);

  };


  // Edit User button functionality
  const editUser = (id)=>{
    // openModal()
    setShowModal(true);
    setUserId(id)
  }


  //Delete User

  const handleDelete = (id) => {
    setLoading(true);
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`, { method: 'DELETE' })
      .then(() => {setUsers(users.filter(user => user.id !== id))
        setLoading(false);
      })
      .catch(error => console.log(error));
  };

  return (
    <>
      {loading ? (
        <div className="spnr">
          <div className="spinner">
            <img src={spinner} alt="" />
          </div>
        </div>
      ) : (
        <div className="container">
          <h1>User Management</h1>

          {error ? (<div className="allErrors"><p>{error}</p></div>) : (
            <>
              <div>
                <button className="adduser" onClick={openModal}>
                  + Add New User
                </button>

                <Modal showModal={showModal} onClose={closeModal} users={users} setUsers={setUsers} userid={userid} setLoading={setLoading}/>
              </div>

              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Website</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody className="mainTable">
                  {users?.map((user) => (
                    <tr key={user.id}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.phone}</td>
                      <td>{user.website}</td>
                      <td className="action">
                        <Link to={`/user/${user.id}`} className="details">
                          <button className="moreDetailBtn">More Details</button>
                        </Link>
                        <button className="editBtn" onClick={() =>editUser(user.id)}>Edit</button>
                        <button className="deleteBtn" onClick={() => handleDelete(user.id)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tbody className="resTableMain">
                  {users?.map((user) => (
                    <tr key={user.id}>
                      <td className="resTable"><span>Name: </span><td>{user.name}</td></td>
                      <td className="resTable"><span>Email: </span><td>{user.email}</td></td>
                      <td className="resTable"><span>Phone No: </span><td>{user.phone}</td></td>
                      <td className="resTable"><span>Website: </span><td>{user.website}</td></td>
                      <td className="resTable action"><span>Action: </span>
                        <Link to={`/user/${user.id}`} className="details">
                          <button className="moreDetailBtn">More Details</button>
                        </Link>
                        <button className="editBtn" onClick={() =>editUser(user.id)}>Edit</button>
                        <button className="deleteBtn" onClick={() => handleDelete(user.id)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </div>
      )}
    </>
  );
};
export default Users;
