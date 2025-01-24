import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Form, FormGroup, Button } from "reactstrap";
import loginImg from "../assets/login -2.png";

const Register = () => {
  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    reEnterPassword: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [formValid, setFormValid] = useState(false); // New state variable

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePhone = (phone) => {
    const re = /^[0-9]{10}$/;
    return re.test(phone);
  };

  const validateForm = () => {
    const { name, username, email, phone, password, reEnterPassword } = user;
    let formErrors = {};
    let isValid = true;

    if (!name.trim()) {
      formErrors.name = "Full Name is required";
      isValid = false;
    } else if (name.length < 3) {
      formErrors.name = "Name must be between 3 and 15 characters";
      isValid = false;
    }

    if (!username.trim()) {
      formErrors.username = "User Name is required";
      isValid = false;
    } else if (username.length < 3) {
      formErrors.username = "Username must be at least 3 characters long";
      isValid = false;
    }

    if (!email) {
      formErrors.email = "Email is required";
      isValid = false;
    } else if (!validateEmail(email)) {
      formErrors.email = "Email address is invalid";
      isValid = false;
    }
    if (!phone) {
      formErrors.phone = "Phone number is required";
      isValid = false;
    } else if (!validatePhone(phone)) {
      formErrors.phone = "Phone number is invalid";
      isValid = false;
    }
    if (!password) {
      formErrors.password = "Password is required";
      isValid = false;
    } else if (password.length < 6) {
      formErrors.password = "Password must be at least 6 characters long";
      isValid = false;
    }
    if (password !== reEnterPassword) {
      formErrors.reEnterPassword = "Passwords do not match";
      isValid = false;
    }

    setErrors(formErrors);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });

    let errorsTemp = { ...errors };

    switch (name) {
      case "name":
        if (!/^[a-zA-Z ]+$/.test(value)) {
          errorsTemp.name = "Name must contain only letters and spaces";
        } else if (!value.trim()) {
          errorsTemp.name = "Name is required";
        } else {
          errorsTemp.name =
            value.length >= 3 && value.length <= 15
              ? ""
              : "Name must be between 3 and 15 characters";
        }
        break;

      case "username":
        if (!/^\S+$/.test(value)) {
          errorsTemp.username = "Username cannot contain spaces";
        } else {
          errorsTemp.username =
            value.length >= 3 && value.length <= 15
              ? ""
              : "Username must be between 3 and 15 characters";
        }
        break;

      case "email":
        errorsTemp.email = validateEmail(value) ? "" : "Invalid email format";
        break;

      case "phone":
        if (!/^[7-9]/.test(value)) {
          errorsTemp.phone = "Invalid phone number format! should start with either 7,or 8, or 9 and ";
        } else {
          errorsTemp.phone = validatePhone(value)
            ? ""
            : "Phone number is invalid , Should contain 10 digits";
        }
        break;

      case "password":
        if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}/.test(value)) {
          errorsTemp.password =
            "Password must contain at least one number, one special character, one uppercase character, one lowercase character, and be at least 8 characters long";
        } else {
          errorsTemp.password = "";
        }
        break;

      case "reEnterPassword":
        errorsTemp.reEnterPassword =
          value === user.password ? "" : "Passwords do not match";
        break;

      default:
        break;
    }
    setErrors(errorsTemp);
  };

  useEffect(() => {
    // Check if there are any errors
    const isValid = Object.values(errors).every((error) => error === "");
    // Update form validity state
    setFormValid(isValid);
  }, [errors]);

  const register = async (e) => {
    e.preventDefault();
    const { name, username, email, phone, password, reEnterPassword } = user;
    if (validateForm()) {
      try {
        const res = await axios.post(
          "https://notes-taker-backend.onrender.com/api/auth/signup",
          user
        );
        console.log(res);
        alert(res.data.message);

        if (res.data.success) {
          navigate("/login", { state: { email: user.email } });
        }
      } catch (err) {
        console.error(err);
        alert("Registration failed. Please try again.");
      }
    }
  };

  return (
    <div className="w-full flex justify-center items-center min-h-screen bg-gray-100 flex flex-col">
       <Link
               to="/"
               className="text-[#F68D2E] font-semibold underline mt-6 hover:text-[#E06E23] transition-colors"
             >
               Return to HomePage
             </Link>
      <section className="flex justify-center items-center w-full p-8">
        <div className="flex w-full max-w-4xl shadow-lg bg-white rounded-lg">
          <div className="w-1/2 flex items-center justify-center p-6">
            <img
              src={loginImg}
              alt="register"
              className="w-3/4 object-contain"
            />
          </div>
          <div className="w-1/2 p-8 bg-[#F68D2E] rounded-lg">
            <h2 className="text-4xl text-white text-center font-comforter mb-6">
              REGISTER
            </h2>
            <Form onSubmit={register} className="flex flex-col gap-4">
              <FormGroup>
                <input
                  type="text"
                  name="name"
                  value={user.name}
                  onChange={handleChange}
                  placeholder="Enter your Full Name"
                  className="w-full p-3 rounded-lg border-none text-red bg-white"
                />
                {errors.name && (
                  <p className="text-red-700 text-sm">{errors.name}</p>
                )}
              </FormGroup>
              <FormGroup>
                <input
                  type="text"
                  name="username"
                  value={user.username}
                  onChange={handleChange}
                  placeholder="Enter your username"
                  className="w-full p-3 rounded-lg border-none text-base bg-white"
                />
                {errors.username && (
                  <p className="text-red-700 text-sm">{errors.username}</p>
                )}
              </FormGroup>
              <FormGroup>
                <input
                  type="email"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                  placeholder="Enter your Email"
                  className="w-full p-3 rounded-lg border-none text-base bg-white"
                />
                {errors.email && (
                  <p className="text-red-700 text-sm">{errors.email}</p>
                )}
              </FormGroup>

              <FormGroup>
                <input
                  type="text"
                  name="phone"
                  value={user.phone}
                  onChange={handleChange}
                  placeholder="Enter your Phone No."
                  className="w-full p-3 rounded-lg border-none text-base bg-white"
                />
                {errors.phone && (
                  <p className="text-red-700 text-sm">{errors.phone}</p>
                )}
              </FormGroup>

              <FormGroup>
                <input
                  type="password"
                  name="password"
                  value={user.password}
                  onChange={handleChange}
                  placeholder="Enter your Password"
                  className="w-full p-3 rounded-lg border-none text-base bg-white"
                />
                {errors.password && (
                  <p className="text-red-700 text-sm">{errors.password}</p>
                )}
              </FormGroup>
              <FormGroup>
                <input
                  type="password"
                  name="reEnterPassword"
                  value={user.reEnterPassword}
                  onChange={handleChange}
                  placeholder="Re-enter your Password"
                  className="w-full p-3 rounded-lg border-none text-base bg-white"
                />
                {errors.reEnterPassword && (
                  <p className="text-red-700 text-sm">{errors.reEnterPassword}</p>
                )}
              </FormGroup>

              <Button
                type="submit"
                className="bg-white text-[#F68D2E] font-medium border-2 rounded-lg hover:bg-transparent hover:text-white transition-colors duration-300 py-3"
                disabled={!formValid}
              >
                Register
              </Button>
            </Form>

            <p className="text-white text-center mt-4">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-white font-medium hover:text-black hover:underline"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Register;





// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const SignupPage = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     username: '',
//     email: '',
//     phone: '',
//     password: ''
//   });

//   const [errors, setErrors] = useState({});
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const validate = () => {
//     const newErrors = {};
//     const { name, username, email, phone, password } = formData;

//     // Name validation
//     if (!name) newErrors.name = 'Name is required';

//     // Username validation: no spaces
//     if (!username) {
//       newErrors.username = 'Username is required';
//     } else if (/\s/.test(username)) {
//       newErrors.username = 'Username cannot contain spaces';
//     }

//     // Email validation
//     if (!email) {
//       newErrors.email = 'Email is required';
//     } else if (!/\S+@\S+\.\S+/.test(email)) {
//       newErrors.email = 'Email is invalid';
//     }

//     // Phone validation: starts with 9, 8, or 7 and exactly 10 digits
//     if (!phone) {
//       newErrors.phone = 'Phone number is required';
//     } else if (!/^[987]\d{9}$/.test(phone)) {
//       newErrors.phone = 'Phone number should start with 9, 8, or 7 and be exactly 10 digits';
//     }

//     // Password validation: at least 6 characters
//     if (!password) {
//       newErrors.password = 'Password is required';
//     } else if (password.length < 6) {
//       newErrors.password = 'Password must be at least 6 characters long';
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0; // If no errors, return true
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Validate fields
//     if (!validate()) return;

//     try {
//       const response = await fetch('/api/users/signup', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });

//       const data = await response.json();
//       if (response.ok) {
//         alert('Signup successful');
//         navigate('/login'); // Redirect to login page after successful signup
//       } else {
//         alert(data.message || 'Signup failed');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       alert('An error occurred during signup');
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center">
//       <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
//         <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label htmlFor="name" className="block text-gray-700">Name</label>
//             <input
//               type="text"
//               id="name"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               className="w-full p-2 border rounded-md"
//             />
//             {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
//           </div>

//           <div className="mb-4">
//             <label htmlFor="username" className="block text-gray-700">Username</label>
//             <input
//               type="text"
//               id="username"
//               name="username"
//               value={formData.username}
//               onChange={handleChange}
//               className="w-full p-2 border rounded-md"
//             />
//             {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
//           </div>

//           <div className="mb-4">
//             <label htmlFor="email" className="block text-gray-700">Email</label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               className="w-full p-2 border rounded-md"
//             />
//             {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
//           </div>

//           <div className="mb-4">
//             <label htmlFor="phone" className="block text-gray-700">Phone</label>
//             <input
//               type="text"
//               id="phone"
//               name="phone"
//               value={formData.phone}
//               onChange={handleChange}
//               className="w-full p-2 border rounded-md"
//             />
//             {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
//           </div>

//           <div className="mb-6">
//             <label htmlFor="password" className="block text-gray-700">Password</label>
//             <input
//               type="password"
//               id="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               className="w-full p-2 border rounded-md"
//             />
//             {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
//           >
//             Sign Up
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default SignupPage;
