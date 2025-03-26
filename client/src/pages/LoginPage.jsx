import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNotification } from "../contexts/NotificationContext";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
export default function LoginPage({ type = "student" }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
      keepLoggedIn: false,
    },
  });
  const { login } = useAuth();
  const { showNotification } = useNotification();
  const navgiate = useNavigate();

  const dashboardPath = type === 'mentor' ? '/mentor/dashboard' : type === 'admin' ? '/admin/dashboard' : '/dashboard';

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/users/login`, {
        username: data.username,
        password: data.password,
        role: type,
      }, {
        headers: {
          "Content-Type": 'application/json'
        }
      });
      if (response.status === 200) {
        const { token, user } = response.data;
        reset();
        login(token, user);
        navgiate(dashboardPath)
        showNotification('success', `${type.charAt(0).toUpperCase() + type.slice(1)} Login Successful!`);
      }
      else {
        showNotification('error', response.data.message);
      }
    } catch (error) {
      console.error(error);
      showNotification('error', error.response.data.message || 'Error');
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
          <a href={`/forgot-password`} style={{ color: 'var(--primary-color)' }} className="text-decoration-none d-block mb-2">
            Forgot Password?
          </a>
        </div>
      </div>
    </div>
  );
}