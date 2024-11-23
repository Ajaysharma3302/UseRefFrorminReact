import { useState, useRef } from "react";

function Form() {
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleFocus = (e, nextRef) => {
    if (e.key === "Tab" && nextRef.current) {
      nextRef.current.focus();
    }
  };

  const validateInput = (name, value) => {
    let errors = { ...formErrors };

    if (name === "name") {
      errors.name =
        value.length < 3 ? "Name must be at least 3 characters long." : "";
    }
    if (name === "email") {
      errors.email = !/\S+@\S+\.\S+/.test(value)
        ? "Please enter a valid email."
        : "";
    }
    if (name === "password") {
      errors.password =
        value.length < 6 ? "Password must be at least 6 characters long." : "";
    }

    setFormErrors(errors);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    
    validateInput("name", nameRef.current.value);
    validateInput("email", emailRef.current.value);
    validateInput("password", passwordRef.current.value);


    if (!Object.values(formErrors).some((error) => error)) {
      alert("Form submitted successfully!");
    } else {
      alert("Please fix the errors before submitting.");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            ref={nameRef}
            type="text"
            onKeyDown={(e) => handleFocus(e, emailRef)}
            onBlur={() => validateInput("name", nameRef.current.value)}
          />
          {formErrors.name && (
            <span style={{ color: "red" }}>{formErrors.name}</span>
          )}
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="Email"
            ref={emailRef}
            onKeyDown={(e) => handleFocus(e, passwordRef)}
            onBlur={() => validateInput("email", emailRef.current.value)}
          />
          {formErrors.email && (
            <span style={{ color: "red" }}>{formErrors.email}</span>
          )}
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="text"
            id="Password"
            ref={passwordRef}
            onBlur={() => validateInput("password", passwordRef.current.value)}
          />
          {formErrors.password && (
            <span style={{ color: "red" }}>{formErrors.password}</span>
          )}
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </>
  );
}
export default Form;
