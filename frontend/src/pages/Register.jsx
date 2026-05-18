import { useState } from "react";
import API from "../api/axios";

const Register = () => {

    const [formData, setFormData] = useState({
        name: "",
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

            await API.post(
                "/auth/register",
                formData
            );

            window.location.href = "/login";

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">

            <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">

                <h2 className="text-3xl font-bold mb-6 text-center">
                    Register
                </h2>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                >

                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full p-3 border rounded-lg outline-none"
                        required
                    />

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
                        className="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 transition"
                    >
                        Register
                    </button>

                    <p className="text-center mt-4">

                        Already have an account?{" "}

                        <a
                            href="/login"
                            className="text-blue-600 font-semibold"
                        >
                            Login
                        </a>

                    </p>

                </form>

            </div>

        </div>
    );
};

export default Register;