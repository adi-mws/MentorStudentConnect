import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

export default function ResetPassword({ type = "student" }) {
  const { token } = useParams();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
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
      student: "api/student/reset-password",
      alumni: "api/alumni/reset-password",
      mentor: "api/mentor/reset-password",
    };
    return endpoints[userType.toLowerCase()] || endpoints.student;
  };

  const onSubmit = async (data) => {
    try {
      const endpoint = getEndpoint(type);
      const response = await apiClient.post(endpoint, {
        resetToken: token,
        newPassword: data.newPassword,
        userType: type,
      });

      alert("Password reset successful! Please login with your new password.");
    } catch (error) {
      if (error.response) {
        alert(`Error: ${error.response.data.message || "Unable to reset password"}`);
      } else if (error.request) {
        alert("Error: Unable to connect to server");
      } else {
        alert("Error: Please try again");
      }
    }
  };

  const newPassword = watch("newPassword");

  return (
    <div>

      <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
        <div
          className="card p-4 shadow-lg"
          style={{ width: "22rem", borderRadius: "10px" }}
        >
          <h3 className="text-center mb-4">
                Reset Password
          </h3>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="mb-3">
              <label htmlFor="newPassword" className="form-label">
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                className={`form-control ${errors.newPassword ? "is-invalid" : ""}`}
                placeholder="Enter new password"
                {...register("newPassword", {
                  required: "New password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                  pattern: {
                    value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{6,}$/,
                    message: "Password must contain at least one letter and one number",
                  },
                })}
              />
              {errors.newPassword && (
                <div className="invalid-feedback">{errors.newPassword.message}</div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">
                Confirm New Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                className={`form-control ${errors.confirmPassword ? "is-invalid" : ""}`}
                placeholder="Re-enter new password"
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === newPassword || "Passwords do not match",
                })}
              />
              {errors.confirmPassword && (
                <div className="invalid-feedback">{errors.confirmPassword.message}</div>
              )}
            </div>

            <button
              type="submit"
              className="btn btn-primary w-100"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Resetting..." : "Reset Password"}
            </button>
          </form>

          <div className="text-center mt-3">
            <Link
            style={{color: 'var(--primary-color)'}}
              to={`/login`}
              className="text-decoration-none d-block mb-2"
            >
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}