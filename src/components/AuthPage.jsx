import React, { useState } from "react";
import "./AuthPage.css";

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [isGoogleLogin, setIsGoogleLogin] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validatePassword = (password) => {
    const regex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;
    return regex.test(password);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isGoogleLogin) {
      if (!formData.email) {
        alert("Google email is required.");
        return;
      }
      alert("Google Login successful!");
      resetGoogle();
      return;
    }

    const { username, email, password, confirmPassword } = formData;

    if (!username || !email || !password || (!isLogin && !confirmPassword)) {
      alert("Please fill in all fields.");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (!isLogin) {
      if (!validatePassword(password)) {
        alert(
          "Password must be at least 8 characters, include one uppercase, one number, and one special character."
        );
        return;
      }
      if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
      }
    }

    if (isLogin) {
      alert("Login successful!");
    } else {
      alert("Sign Up successful!");
    }

    setFormData({ username: "", email: "", password: "", confirmPassword: "" });
  };

  const switchMode = () => {
    setIsLogin(!isLogin);
    setIsGoogleLogin(false);
    setFormData({ username: "", email: "", password: "", confirmPassword: "" });
  };

  const googleLogin = () => {
    setIsGoogleLogin(true);
    setFormData({
      username: "GoogleUser",
      email: "user@gmail.com",
      password: "",
      confirmPassword: "",
    });
  };

  const resetGoogle = () => {
    setIsGoogleLogin(false);
    setFormData({ username: "", email: "", password: "", confirmPassword: "" });
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>{isGoogleLogin ? "Login with Google" : isLogin ? "Welcome Back" : "Create Account"}</h2>

        <form onSubmit={handleSubmit} noValidate>
          {/* Username */}
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            disabled={isGoogleLogin}
            required
          />

          {/* Email */}
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            disabled={isGoogleLogin}
            required
          />

          {/* Password */}
          {!isGoogleLogin && (
            <>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              {!isLogin && (
                <small>
                  Password must be at least 8 characters and include one
                  uppercase letter, one number, and one special character.
                </small>
              )}
            </>
          )}

          {/* Confirm Password */}
          {!isLogin && !isGoogleLogin && (
            <>
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </>
          )}

          <button type="submit">
            {isGoogleLogin
              ? "Login with Google"
              : isLogin
              ? "Login"
              : "Sign Up"}
          </button>
        </form>

        {/* Toggle between Login / Signup */}
        {!isGoogleLogin && (
          <div className="toggle-text">
            <span>{isLogin ? "Don't have an account?" : "Already have an account?"}</span>
            <button onClick={switchMode}>{isLogin ? "Sign Up" : "Login"}</button>
          </div>
        )}

        {/* Google Signin */}
        {!isGoogleLogin && (
          <div className="google-signin">
            <p>Or login with</p>
            <button id="google-btn" onClick={googleLogin}>
              Google
            </button>
          </div>
        )}

        {/* Back button */}
        {isGoogleLogin && (
          <button id="back-btn" onClick={resetGoogle}>
            Back to Login/Signup
          </button>
        )}
      </div>
    </div>
  );
}

export default AuthPage;
