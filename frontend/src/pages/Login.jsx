import { useState } from "react";
import API from "../api/axios";

const Login = () => {

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

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

            window.location.href = "/";

        } catch (error) {
            console.log(error);
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

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full p-3 border rounded-lg outline-none"
                        required
                    />

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition"
                    >
                        Login
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