import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [loginId, setLoginId] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const staticLoginId = "123456";

    if (loginId === staticLoginId) {
      setSuccess("Login successful!");
      navigate("/verification");
      setError("");
    } else {
      setError("Invalid login Id");
      setSuccess("");
    }
  };

  return (
    <div className=" w-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">
            User Verification
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="loginId" className="sr-only">
                Login Id
              </label>
              <input
                id="text"
                name="Login Id"
                type="text"
                autoComplete="yes"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Enter your login id"
                value={loginId}
                onChange={(e) => setLoginId(e.target.value)}
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Submit
            </button>
          </div>
          {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
          {success && (
            <div className="text-green-500 text-sm mt-2">{success}</div>
          )}
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
