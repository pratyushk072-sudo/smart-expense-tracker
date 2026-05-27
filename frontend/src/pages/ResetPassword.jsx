import { useState } from "react";
import axios from "axios";
import {
  useParams,
  useNavigate,
} from "react-router-dom";
import {
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `http://localhost:5000/api/auth/reset-password/${token}`,
        {
          password,
        }
      );

      alert(res.data.message);
      navigate("/login");

    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-96"
      >
        <h1 className="text-3xl font-bold text-center mb-6">
          Reset Password
        </h1>

        <div className="relative">

          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter new password"
            className="w-full border p-3 rounded mb-4"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

          <button
            type="button"
            onClick={() =>
              setShowPassword(!showPassword)
            }
            className="absolute right-3 top-3 text-gray-500"
          >
            {
              showPassword
                ? <FaEyeSlash />
                : <FaEye />
            }
          </button>

        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white w-full py-3 rounded"
        >
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;