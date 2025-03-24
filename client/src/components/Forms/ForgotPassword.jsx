import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

export default function ForgotPassword({ type = "student" }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: "",
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
      student: "api/student/forgot-password",
      alumni: "api/alumni/forgot-password",
      mentor: "api/mentor/forgot-password",
    };
    return endpoints[userType.toLowerCase()] || endpoints.student;
  };

  const onSubmit = async (data) => {
    try {
      const endpoint = getEndpoint(type);
      const response = await apiClient.post(endpoint, {
        email: data.email,
        userType: type,
      });

      alert(`Password reset link sent to ${data.email}`);
    } catch (error) {
      if (error.response) {
        alert(`Error: ${error.response.data.message || "Unable to process request"}`);
      } else if (error.request) {
        alert("Error: Unable to connect to server");
      } else {
        alert("Error: Please try again");
      }
    }
  };

  return (
    <div>

      <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
        <div
          className="card p-4 shadow-lg"
          style={{ width: "22rem", borderRadius: "10px" }}
        >
          <h3 className="text-center mb-4">
            Forgot Password
          </h3>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Registered Email
              </label>
              <input
                type="email"
                id="email"
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                placeholder="Enter your registered email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Please enter a valid email address",
                  },
                })}
              />
              {errors.email && (
                <div className="invalid-feedback">{errors.email.message}</div>
              )}
            </div>

            <button
              type="submit"
              className="btn btn-primary w-100"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Send email"}
            </button>
          </form>

          <div className="text-center mt-3">
            <a style={{color: 'var(--primary-color)'}}
              href={`/login`}
              className="text-decoration-none d-block mb-2"
            >
              Back to Login
            </a>
          </div>
        </div>
      </div>

    </div>
  );
}