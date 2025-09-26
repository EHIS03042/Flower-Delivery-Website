    // src/components/AuthModal.js
    import React, { useState } from "react";
    import "./AuthModal.css";
    import api from "../utils/api";
    import { useAuth } from "../authContext"; // ✅ use the custom hook instead of useContext(AuthContext)

    export default function AuthModal() {
    const { login, setShowAuth } = useAuth(); // ✅ now sourced from hook
    const [mode, setMode] = useState("signin"); // 'signin' | 'signup'
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState("");

    const submit = async (e) => {
        e.preventDefault();
        setBusy(true);
        setError("");

        try {
        const path = mode === "signin" ? "/auth/login" : "/auth/register";
        const { data } = await api.post(path, { email, password });

        // ✅ expected response: { token, user }
        if (data?.token) {
            login(data.token, data.user);
            setShowAuth(false);
        } else {
            setError("Invalid server response. Please try again.");
        }
        } catch (err) {
        console.error("Auth error:", err);
        setError(err?.response?.data?.error || "Authentication failed");
        } finally {
        setBusy(false);
        }
    };

    return (
        <div className="modal__backdrop" role="dialog" aria-modal="true">
        <div className="modal">
            <button
            className="modal__close"
            onClick={() => setShowAuth(false)}
            aria-label="Close authentication modal"
            >
            ✕
            </button>

            <h3 className="modal__title">
            {mode === "signin" ? "Sign In" : "Create an Account"}
            </h3>

            <form className="modal__form" onSubmit={submit}>
            <label>
                <span>Email</span>
                <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                />
            </label>

            <label>
                <span>Password</span>
                <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                />
            </label>

            {error && <div className="modal__error">{error}</div>}

            <button className="btn btn--primary" disabled={busy}>
                {busy
                ? "Please wait..."
                : mode === "signin"
                ? "Sign In"
                : "Sign Up"}
            </button>
            </form>

            <p className="modal__switch">
            {mode === "signin" ? (
                <>
                No account?{" "}
                <button
                    onClick={() => setMode("signup")}
                    className="link"
                    type="button"
                >
                    Sign Up
                </button>
                </>
            ) : (
                <>
                Have an account?{" "}
                <button
                    onClick={() => setMode("signin")}
                    className="link"
                    type="button"
                >
                    Sign In
                </button>
                </>
            )}
            </p>
        </div>
        </div>
    );
    }
