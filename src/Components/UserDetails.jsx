import React, { useContext, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import spinner from "../images/spinner2.gif";
import "./UserDetails.css";

export const UserDetails = () => {
  const [fetchData, setFetchData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setFetchData(data);
        setLoading(false);
      })
      .catch((error) => {
        setError("Failed to fetch user");
        setLoading(false);
      });
  }, []);
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
          <div className="card">
            <div className="business-card">
              <div className="front-side">
              <div className="userName"><div>Name:</div>  <h1>{fetchData.name}</h1></div> 
                <ul className="contact-info">
                  <li><p className="cardMainDetails">Email: </p>{fetchData.email}</li>
                  <li><p className="cardMainDetails">Phone No: </p>{fetchData.phone}</li>
                  <li><p className="cardMainDetails">Website: </p>{fetchData.website}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
