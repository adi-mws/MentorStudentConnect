import React from "react";
import { useForm } from "react-hook-form";

export default function RegistrationPage({ type = "student" }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      department: "",
      registrationNumber: "",
      joiningYear: "",
      passingYear: "",
      ...(type === "alumni" && {
        currentlyPursuing: "",
        organisation: ""
      })
    },
  });

  const onSubmit = (data) => {
    console.log("Form submitted:", data);
    alert("Form Submitted");
  };

  return (
    <div>
      <div className="d-flex justify-content-center align-items-center vh-90 bg-light" style={{marginTop:"5rem"}}>
        <div className="card p-4 shadow-lg" style={{ width: "50rem", borderRadius: "10px" }}>
          <h3 className="text-center mb-4">
            {type.charAt(0).toUpperCase() + type.slice(1)} Registration
          </h3>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input
                    type="text"
                    id="name"
                    className={`form-control ${errors.name ? "is-invalid" : ""}`}
                    placeholder="Enter your name"
                    {...register("name", {
                      required: "Name is required",
                      minLength: { value: 2, message: "Name must be at least 2 characters" },
                    })}
                  />
                  {errors.name && <div className="invalid-feedback">{errors.name.message}</div>}
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="email"
                    id="email"
                    className={`form-control ${errors.email ? "is-invalid" : ""}`}
                    placeholder="Enter your email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Enter a valid email address",
                      },
                    })}
                  />
                  {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
                </div>
                <div className="mb-3">
                  <label htmlFor="department" className="form-label">Department</label>
                  <input
                    type="text"
                    id="department"
                    className={`form-control ${errors.department ? "is-invalid" : ""}`}
                    placeholder="Enter your department"
                    {...register("department", {
                      required: "Department is required",
                    })}
                  />
                  {errors.department && <div className="invalid-feedback">{errors.department.message}</div>}
                </div>
                <div className="mb-3">
                  <label htmlFor="registrationNumber" className="form-label">Registration Number</label>
                  <input
                    type="text"
                    id="registrationNumber"
                    className={`form-control ${errors.registrationNumber ? "is-invalid" : ""}`}
                    placeholder="Enter registration number"
                    {...register("registrationNumber", {
                      required: "Registration number is required",
                      pattern: {
                        value: /^[A-Za-z0-9]+$/,
                        message: "Only alphanumeric characters allowed",
                      },
                    })}
                  />
                  {errors.registrationNumber && <div className="invalid-feedback">{errors.registrationNumber.message}</div>}
                </div>
              </div>

              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="joiningYear" className="form-label">Joining Year</label>
                  <input
                    type="number"
                    id="joiningYear"
                    className={`form-control ${errors.joiningYear ? "is-invalid" : ""}`}
                    placeholder="Enter joining year"
                    {...register("joiningYear", {
                      required: "Joining year is required",
                      min: { value: 1900, message: "Year too early" },
                      max: { value: new Date().getFullYear(), message: "Year cannot be in future" },
                    })}
                  />
                  {errors.joiningYear && <div className="invalid-feedback">{errors.joiningYear.message}</div>}
                </div>

                <div className="mb-3">
                  <label htmlFor="passingYear" className="form-label">Passing Year</label>
                  <input
                    type="number"
                    id="passingYear"
                    className={`form-control ${errors.passingYear ? "is-invalid" : ""}`}
                    placeholder="Enter passing year"
                    {...register("passingYear", {
                      required: "Passing year is required",
                      min: { value: 1900, message: "Year too early" },
                      max: { 
                        value: type === "student" ? new Date().getFullYear() + 10 : new Date().getFullYear(), 
                        message: "Year too far in future" 
                      },
                    })}
                  />
                  {errors.passingYear && <div className="invalid-feedback">{errors.passingYear.message}</div>}
                </div>

                {type === "alumni" && (
                  <>
                    <div className="mb-3">
                      <label htmlFor="currentlyPursuing" className="form-label">Currently Pursuing</label>
                      <select
                        id="currentlyPursuing"
                        className={`form-select ${errors.currentlyPursuing ? "is-invalid" : ""}`}
                        {...register("currentlyPursuing", {
                          required: "Please select an option",
                        })}
                      >
                        <option value="">Select an option</option>
                        <option value="job">Job</option>
                        <option value="business">Business</option>
                        <option value="higherStudies">Higher Studies</option>
                        <option value="other">Other</option>
                      </select>
                      {errors.currentlyPursuing && <div className="invalid-feedback">{errors.currentlyPursuing.message}</div>}
                    </div>

                    <div className="mb-3">
                      <label htmlFor="organisation" className="form-label">Organisation</label>
                      <input
                        type="text"
                        id="organisation"
                        className={`form-control ${errors.organisation ? "is-invalid" : ""}`}
                        placeholder="Enter organisation name"
                        {...register("organisation", {
                          required: "Organisation is required",
                        })}
                      />
                      {errors.organisation && <div className="invalid-feedback">{errors.organisation.message}</div>}
                    </div>
                  </>
                )}
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-100 mt-3"
              disabled={isSubmitting}
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}