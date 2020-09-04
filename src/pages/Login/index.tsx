import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { useAuthentication } from "../../context/authentication";

export const Login = () => {
  const { push } = useHistory();
  const { doLogin } = useAuthentication();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const onSubmit = async () => {
    const { email, password } = formValues;

    try {
      setIsSubmitting(true);

      await doLogin(email, password);

      push("/");
    } catch (e) {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            required
            id="email"
            name="email"
            value={formValues.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            required
            id="password"
            name="password"
            value={formValues.password}
            onChange={handleChange}
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "fit-content",
          }}
        >
          <button type="submit" disabled={isSubmitting} onClick={onSubmit}>
            {isSubmitting ? "logging..." : "login"}
          </button>
          <Link to="/register">I don't have an account yet!</Link>
        </div>
      </div>
    </form>
  );
};
