import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const Form = () => {
  const {
    values,
    handleChange,
    handleSubmit,
    errors,
    touched,
    resetForm,
    handleBlur,
  } = useFormik({
    initialValues: {
      name: "",
      email: "",
      dob: "",
      gender: "male",
      password: "",
      confpassword: "",
      address: "",
      mobile: "",
      city: "",
      age: "",
    },
    onSubmit: (data) => {
      console.log(data);
      resetForm();
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Please enter your name"),
      email: Yup.string().email("Invalid email").required("Please enter your email"),
      dob: Yup.string().required("Please enter your date of birth"),
      age: Yup.number()
        .required("Please enter age")
        .min(1, "Enter a valid age")
        .max(120, "Enter a valid age"),
      password: Yup.string()
        .required("Please enter your password")
        .min(6, "At least 6 characters")
        .max(8, "At most 8 characters"),
      confpassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Please confirm your password"),
      address: Yup.string().required("Please enter address"),
      mobile: Yup.string()
        .required("Please enter mobile number")
        .matches(/^[0-9]{10}$/, "Enter a valid 10-digit number"),
      city: Yup.string().required("Please select a city"),
    }),
  });

  const renderError = (field) =>
    touched[field] && errors[field] ? (
      <div className="text-danger small mt-1">{errors[field]}</div>
    ) : null;

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow">
            <div className="card-body">
              <h3 className="text-center mb-4 text-primary">Registration Form</h3>

              <form onSubmit={handleSubmit} noValidate>
                {/* Input Fields */}
                {[
                  { label: "Name", name: "name", type: "text", placeholder: "Enter your name" },
                  { label: "Email", name: "email", type: "email", placeholder: "Enter your email" },
                  { label: "Date of Birth", name: "dob", type: "date" },
                  { label: "Age", name: "age", type: "number", placeholder: "Enter your age" },
                  { label: "Mobile", name: "mobile", type: "tel", placeholder: "10-digit number" },
                  { label: "Password", name: "password", type: "password", placeholder: "Enter password" },
                  { label: "Confirm Password", name: "confpassword", type: "password", placeholder: "Confirm password" },
                ].map(({ label, name, type, placeholder }) => (
                  <div key={name} className="mb-3">
                    <label htmlFor={name} className="form-label">{label}</label>
                    <input
                      id={name}
                      name={name}
                      type={type}
                      value={values[name]}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder={placeholder}
                      className={`form-control ${touched[name] && errors[name] ? "is-invalid" : ""}`}
                    />
                    {renderError(name)}
                  </div>
                ))}

                {/* Gender */}
                <div className="mb-3">
                  <label className="form-label d-block">Gender</label>
                  {["male", "female", "other"].map((gender) => (
                    <div key={gender} className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="gender"
                        value={gender}
                        checked={values.gender === gender}
                        onChange={handleChange}
                      />
                      <label className="form-check-label text-capitalize">
                        {gender}
                      </label>
                    </div>
                  ))}
                </div>

                {/* Address */}
                <div className="mb-3">
                  <label htmlFor="address" className="form-label">Address</label>
                  <textarea
                    id="address"
                    name="address"
                    rows="3"
                    value={values.address}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Enter your address"
                    className={`form-control ${touched.address && errors.address ? "is-invalid" : ""}`}
                  ></textarea>
                  {renderError("address")}
                </div>

                {/* City */}
                <div className="mb-4">
                  <label htmlFor="city" className="form-label">City</label>
                  <select
                    id="city"
                    name="city"
                    value={values.city}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`form-select ${touched.city && errors.city ? "is-invalid" : ""}`}
                  >
                    <option value="">-- Select City --</option>
                    <option value="Amreli">Amreli</option>
                    <option value="Surat">Surat</option>
                    <option value="Rajkot">Rajkot</option>
                    <option value="Ahmadabad">Ahmadabad</option>
                    <option value="Junagadh">Junagadh</option>
                  </select>
                  {renderError("city")}
                </div>

                {/* Submit */}
                <div className="d-grid">
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </div>
              </form>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
