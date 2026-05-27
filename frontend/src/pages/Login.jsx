import { useState } from "react";
import API from "../api/axios";
import toast from "react-hot-toast";
import {
    FaEye,
    FaEyeSlash,
} from "react-icons/fa";

const Login = () => {

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {

            const res = await API.post(
                "/auth/login",
                formData
            );

            localStorage.setItem(
                "token",
                res.data.token
            );

            localStorage.setItem(
                "name",
                res.data.user.name
            );
            toast.success("Login successful");
            setLoading(false);

            window.location.href = "/";

        } catch (error) {
            setLoading(false);
            toast.error("Invalid email or password");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">

            <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">

                <h2 className="text-3xl font-bold mb-6 text-center">
                    Login
                </h2>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                >

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full p-3 border rounded-lg outline-none"
                        required
                    />

                    <div className="relative">

                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full p-3 border rounded-lg outline-none"
                            required
                        />

                        <button
                            type="button"
                            onClick={() =>
                                setShowPassword(!showPassword)
                            }
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
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
                        disabled={loading}
                        className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>

                    <p className="text-center mt-4">

                        Don't have an account?{" "}

                        <a
                            href="/register"
                            className="text-blue-600 font-semibold"
                        >
                            Register
                        </a>

                    </p>

                    <p className="text-right mt-2">
                        <a href="/forgot-password" className="text-blue-500">
                            Forgot Password?
                        </a>
                    </p>

                </form>

            </div>

        </div>
    );
};

export default Login;