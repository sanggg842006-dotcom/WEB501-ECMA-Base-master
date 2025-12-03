import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";


export default function LoginPage() {
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: "", password: "" });


    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:3000/login", form);
            localStorage.setItem("token", res.data.token);
            navigate("/");
            toast.success("Đăng nhập thành công!");
        } catch (err) {
            toast.error(err.response?.data || "Sai tài khoản hoặc mật khẩu");
        }
    };


    return (
        <div className="p-4 max-w-md mx-auto">
            <h2 className="text-xl mb-3">Đăng nhập</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <input
                    type="text"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    className="border p-2"
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                    className="border p-2"
                />
                <button className="bg-green-600 text-white p-2 rounded">Đăng nhập</button>
            </form>
        </div>
    );
}