import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

export default function LoginPage({ type = "student" }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
      keepLoggedIn: false,
    },
  });

  const apiClient = axios.create({
    baseURL: "https://your-api-domain.com/",
    timeout: 5000,
    headers: {
      "Content-Type": "application/json",
    },
  });

  const getEndpoint = (userType) => {
    const endpoints = {
      student: "api/student/login",
      alumni: "api/alumni/login",
      mentor: "api/mentor/login",
    };
    return endpoints[userType] || endpoints.student;
  };

  const onSubmit = async (data) => {
    try {
      const endpoint = getEndpoint(type);
      const response = await apiClient.post(endpoint, {
        username: data.username,
        password: data.password,
        keepLoggedIn: data.keepLoggedIn,
        userType: type,
      });

      if (response.data.token) {
        localStorage.setItem(`${type}AuthToken`, response.data.token);
      }

      alert(`${type.charAt(0).toUpperCase() + type.slice(1)} Login Successful!`);
    } catch (error) {
      if (error.response) {
        alert(`Login failed: ${error.response.data.message || "Invalid credentials"}`);
      } else if (error.request) {
        alert("Login failed: Unable to connect to server");
      } else {
        alert("Login failed: Please try again");
      }
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4 shadow-lg" style={{ width: "22rem", borderRadius: "10px" }}>
        <h3 className="text-center mb-4">
          {type.charAt(0).toUpperCase() + type.slice(1)} Login
        </h3>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <input
              type="text"
              id="username"
              className={`form-control ${errors.username ? "is-invalid" : ""}`}
              placeholder="Enter your username"
              {...register("username", {
                required: "Username is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$|^[a-zA-Z0-9_]{3,20}$/,
                  message: "Enter a valid email or username (3-20 characters)",
                },
              })}
            />
            {errors.username && <div className="invalid-feedback">{errors.username.message}</div>}
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              id="password"
              className={`form-control ${errors.password ? "is-invalid" : ""}`}
              placeholder="Enter your password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
            {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="text-center mt-3">
          <a href={`/forgot-password`} className="text-decoration-none d-block mb-2">
            Forgot Password?
          </a>
        </div>
      </div>
    </div>
  );
}