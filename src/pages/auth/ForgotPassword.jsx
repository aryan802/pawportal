import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { isValidEmail } from "../../services/authService";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Validate email
      if (!isValidEmail(email)) {
        setError("Please enter a valid email address.");
        return;
      }

      // Mock API call to simulate sending reset link
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate success
      setSuccess(true);
    } catch (error) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleBackToDashboard = () => {
    navigate("/dashboard");
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-pink-50 to-blue-50">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        {/* Back to Dashboard Button */}
        <div className="mb-6">
          <button
            onClick={handleBackToDashboard}
            className="flex items-center text-blue-500 hover:text-blue-700 transition-colors"
          >
            <svg 
              className="w-5 h-5 mr-2" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M10 19l-7-7m0 0l7-7m-7 7h18" 
              />
            </svg>
            Back to Dashboard
          </button>
        </div>

        <h2 className="text-3xl font-bold text-center text-pink-600 mb-6">
          Forgot Password
        </h2>

        {success ? (
          <div className="text-center">
            <div className="mb-4">
              <svg 
                className="w-16 h-16 text-green-500 mx-auto" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" 
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-green-600 mb-2">
              Reset Link Sent!
            </h3>
            <p className="text-gray-600 mb-6">
              We've sent a password reset link to <strong>{email}</strong>. 
              Please check your email and follow the instructions to reset your password.
            </p>
            <div className="space-y-3">
              <button
                onClick={() => navigate("/login")}
                className="w-full bg-pink-500 text-white py-2 rounded-full font-semibold hover:bg-pink-600 transition"
              >
                Back to Login
              </button>
              <button
                onClick={() => {
                  setSuccess(false);
                  setEmail("");
                }}
                className="w-full bg-gray-100 text-gray-700 py-2 rounded-full font-semibold hover:bg-gray-200 transition"
              >
                Try Different Email
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <p className="text-gray-600 text-center mb-4">
              Enter your email address and we'll send you a link to reset your password.
            </p>

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}

            <input
              type="email"
              placeholder="Enter your email address"
              className="border rounded px-3 py-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />

            <button
              type="submit"
              className="bg-pink-500 text-white py-2 rounded-full font-semibold hover:bg-pink-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? "Sending Reset Link..." : "Send Reset Link"}
            </button>

            <div className="text-center text-sm mt-4">
              Remember your password?{" "}
              <Link to="/login" className="text-blue-500 hover:underline">
                Back to Login
              </Link>
            </div>
          </form>
        )}

        <div className="mt-6 p-3 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-700">
            <strong>Note:</strong> If you don't receive an email within a few minutes, 
            check your spam folder or contact support.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
