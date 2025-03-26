import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNotification } from "../contexts/NotificationContext";
import { useNavigate } from "react-router-dom";

export default function AdminRegistration() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      username: "",
      name: "",
      email: "",
      password: "",
      role: "admin",
    },
  });

  const { showNotification } = useNotification();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/users/admin/create`,
        data,
        {
          headers: { "Content-Type": "application/json" }
        }
      );

      if (response.status === 201) {
        reset();
        showNotification("success", "Admin registered successfully!");
        navigate("/admin/login");
      } else {
        showNotification("error", response.data.message || "Registration failed");
      }
    } catch (error) {
      console.error(error);
      showNotification("error", error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4 shadow-lg" style={{ width: "26rem", borderRadius: "10px" }}>
        <h3 className="text-center mb-4">Admin Registration</h3>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          {/* Username Field */}
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <input
              type="text"
              id="username"
              className={`form-control ${errors.username ? "is-invalid" : ""}`}
              placeholder="Enter username"
              {...register("username", {
                required: "Username is required",
                minLength: {
                  value: 3,
                  message: "Username must be at least 3 characters",
                },
                maxLength: {
                  value: 20,
                  message: "Username must not exceed 20 characters",
                },
              })}
            />
            {errors.username && <div className="invalid-feedback">{errors.username.message}</div>}
          </div>

          {/* Name Field */}
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input
              type="text"
              id="name"
              className={`form-control ${errors.name ? "is-invalid" : ""}`}
              placeholder="Enter your full name"
              {...register("name", {
                required: "Name is required",
                minLength: {
                  value: 2,
                  message: "Name must be at least 2 characters",
                },
                maxLength: {
                  value: 50,
                  message: "Name cannot exceed 50 characters",
                },
              })}
            />
            {errors.name && <div className="invalid-feedback">{errors.name.message}</div>}
          </div>

          {/* Email Field */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              id="email"
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              placeholder="Enter email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email",
                },
              })}
            />
            {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
          </div>

          {/* Password Field */}
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              id="password"
              className={`form-control ${errors.password ? "is-invalid" : ""}`}
              placeholder="Enter password"
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
            {isSubmitting ? "Registering..." : "Register"}
          </button>
        </form>

        <div className="text-center mt-3">
          <a href="/admin/login" className="text-decoration-none" style={{ color: 'var(--primary-color)' }}>
            Already have an account? Login
          </a>
        </div>
      </div>
    </div>
  );
}
