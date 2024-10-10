import React, { useEffect, useRef, useState } from "react";
import './Modal.css'

export const Modal = ({ showModal, onClose, users, setUsers, userid, setLoading }) => {
  const [formError, setformError] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");


  // Reset form when adding new user or populate fields for editing
  useEffect(() => {
    if (userid) {
      const userDetails = users.find((user) => user.id === userid);
      setName(userDetails?.name || "");
      setEmail(userDetails?.email || "");
      setPhone(userDetails?.phone || "");
      setWebsite(userDetails?.website || "");
    } else {
      setName("");
      setEmail("");
      setPhone("");
      setWebsite("");
    }
  }, [userid]);


  // form functioning
  if (!showModal) return;

// Handle Modal BackGroundClick
  const handleBackgroundClick = (e) => {
    if (e.target.className === "modal-backdrop") {
      onClose();
    }
  };

  //  form validation
  const formValidationConfig = {
    //rules
    name: [
      {
        require: true,
        message: "Name field is required",
      },
      { minLength: 2, message: "Name field is more than 2 words" },
    ],
    email: [
      {
        require: true,
        message: "Email is required",
      },
    ],
    phone: [
      {
        require: true,
        message: "Phone No field is required",
      },
      {
        number: true,
        message: "Please enter a valid phone number",
      },
      { minLength: 10, message: "Please enter a valid 10 digit phone number" },
    ],
    website: [
      {
        require: true,
        message: "website is required",
      },
      { minLength: 3, message: "Website field is required " },
    ],
  };

  // Check Validation function
  const formValidation = (formData) => {
    const errorObj = {};
    Object.entries(formData).forEach(([key, value]) => {
      formValidationConfig[key]?.some((rule) => {
        if (
          rule.require &&
          !(typeof value === "string" ? value.trim() : value)
        ) {
          errorObj[key] = rule.message;
          return true;
        }
        if (rule.minLength && value.length < rule.minLength) {
          errorObj[key] = rule.message;
          return true;
        }
        if (rule.number && isNaN(value)) {
          errorObj[key] = rule.message;
          return true;
        }
      });
    });

    setformError(errorObj);
    return errorObj;
  };



  // Handle Submit Button
  const handleSubmit = (event, id) => {
    event.preventDefault();

    const userData = {
      name,
      email,
      phone,
      website,
    };
// Check Validation
    const validationResult = formValidation(userData);
    if (Object.keys(validationResult).length) return;

    setLoading(true);

    // Create User
    if(!userid){
    fetch("https://jsonplaceholder.typicode.com/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          setUsers((prev) => [...prev, data]);
          setName("");
          setPhone("");
          setWebsite("");
          setEmail("");
          setLoading(false);
          onClose();
        } else {
          console.log(error);
        }
      })
      .catch((error) => {
        setError(error.message);
      });

    }

    //Update User
    else{
      fetch(`https://jsonplaceholder.typicode.com/users/${userid}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      })
        .then((response) => response.json())
        .then((data) =>{
      
        if (data) {
          setUsers(users.map((user)=>user.id === data.id ? data:user))
          setName("");
          setPhone("");
          setWebsite("");
          setEmail("");
          setLoading(false);
          onClose();
        } else {
          console.log(error);
        }})

        .catch((error) => {
          setError(error);
        });

    }
  };

  return (
    <div className="modal-backdrop" onClick={handleBackgroundClick}>
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <div className="form">
          <form onSubmit={handleSubmit}>
            <label>
              <span> Name:</span>
              <input
                placeholder="Enter your name"
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
              />
            </label>
            <p className="error">{formError?.name}</p>
            <label>
              <span>Email:</span>
              <input
                type="email"
                placeholder="Enter your Email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </label>
            <p className="error">{formError?.email}</p>
            <label>
              <span>Phone No:</span>
              <input
                type="tel"
                placeholder="Enter your Phone No"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                required
              />
            </label>
            <p className="error">{formError?.phone}</p>
            <label>
              <span>Website:</span>
              <input
                type="text"
                placeholder="Enter your Website"
                value={website} 
                onChange={(event) => setWebsite(event.target.value)}
                required
              />
            </label>
            <p className="error">{formError?.website}</p>
            <button type="submit">
              Save User
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
