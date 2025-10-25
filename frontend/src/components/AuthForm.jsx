import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../axios";
import useAuth from "../hooks/useAuth";

const AuthForm = ({ type, title, fields, submitText, linkText, linkTo }) => {
  const initialState = {};
  fields.forEach((f) => (initialState[f.name] = ""));
  const [formData, setFormData] = useState(initialState);
  const [showConstraints, setShowConstraints] = useState(false);
  const {setAccessToken,setRefreshToken} = useAuth()
  const [message,setMessage] = useState("")
  const [error,setError] = useState("")
  const navigate = useNavigate();

  
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file" && files[0]) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  
  useEffect(() => {
    if(message || error){
    const msg = setTimeout(() => setMessage(''),3000)
    const err = setTimeout(() => setError(''),3000)

    return () =>{
      clearTimeout(msg);
      clearTimeout(err);
    }
    }
  },[error,message])
  const handleFocus = (fieldName) => {
    if (fieldName === "username") setShowConstraints(true);
  };

  const handleBlur = (fieldName) => {
    if (fieldName === "username") setShowConstraints(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    for (let key in formData) {
      if (formData[key]) data.append(key, formData[key]);
    }

    const url =
      type === "register"
        ? "/auth/signup"
        : "/auth/signin";

    try {
      const response = await axiosInstance.post(url, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 201 || response.status === 200) {
        if (type === "register") {
          setMessage(response?.data?.message || "Registration Successfull!")
          navigate("/user/signin");
        } else {
          const { access, refresh } = response.data;
          console.log(access)
          console.log(refresh)
          setMessage(response?.data?.message || 'Signin Successfull!')
          setAccessToken(access),
          setRefreshToken(refresh)
          localStorage.setItem("accessToken", access);
          localStorage.setItem("refreshToken", refresh);
          navigate("/");
        }
      }
    } catch (err) {
  if (err.response?.data) {
    const data = err.response.data;
    if (typeof data === "object") {
      const messages = Object.values(data)
        .flat() 
        .join(" ");
      setError(messages);
    } else {
      setError(data);
    }
  } else {
    setError(err.message || "Something went wrong");
  }
}
  };

  const username = formData.username || "";
  const isValidLength = username.length >= 8;
  const hasInvalidChar = /[^a-zA-Z0-9_@]/.test(username);
  const isValidUsername = isValidLength && !hasInvalidChar;

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-100 text-gray-800 p-4">
      <div className="w-full max-w-md bg-white p-6 sm:p-8 rounded-3xl shadow-2xl border border-gray-300 flex flex-col justify-center h-full sm:h-auto">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">{title}</h2>

        <form onSubmit={handleSubmit} className="space-y-5 flex-1">
          {fields.map((field) => (
            <div key={field.name} className="flex flex-col">
              <div className="flex items-center bg-gray-100 px-4 py-3 rounded-xl border border-gray-300 focus-within:border-blue-500 transition">
                <input
                  type={field.type}
                  name={field.name}
                  placeholder={field.placeholder}
                  value={field.type === "file" ? undefined : formData[field.name]}
                  onChange={handleChange}
                  onFocus={() => handleFocus(field.name)}
                  onBlur={() => handleBlur(field.name)}
                  className="bg-transparent w-full text-gray-800 placeholder-gray-400 focus:outline-none"
                  required={field.required}
                  accept={field.type === "file" ? "image/*" : undefined}
                />
              </div>

              {field.type === "file" && formData[field.name] && (
                <p className="mt-2 text-gray-600 text-sm">
                  Selected file: {formData[field.name].name}
                </p>
              )}
              {type === "register" && field.name === "username" && showConstraints && (
                <ul className="text-sm mt-2 ml-1 space-y-1 text-gray-600">
                  <li className={isValidLength ? "text-green-600" : "text-red-600"}>
                    • Minimum 8 characters
                  </li>
                  <li className={!hasInvalidChar ? "text-green-600" : "text-red-600"}>
                    • Only letters, numbers, underscores, and @ allowed
                  </li>
                </ul>
              )}
            </div>
          ))}
          {error && <p className="text-red-600 text-center">{error}</p>}
          {message && <p className="text-green-600 text-center">{message}</p>}
          <button
            type="submit"
            disabled={type === "register" && !isValidUsername}
            className="w-full mt-6 py-3 font-semibold rounded-xl bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white hover:scale-105 transition-transform duration-200 cursor-pointer"
          >
            {submitText}
          </button>
        </form>

        <p className="text-center text-gray-500 mt-6">
          {linkText}{" "}
          <Link to={linkTo} className="text-pink-500 hover:underline">
            {type === "register" ? "Sign In" : "Sign Up"}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
