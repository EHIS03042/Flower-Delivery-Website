    import React, { useContext, useState } from "react";
    import "./AuthModal.css";
    import api from "../utils/api";
    import { AuthContext } from "../authContext";

    export default function AuthModal() {
    const { login, setShowAuth } = useContext(AuthContext);
    const [mode, setMode] = useState("signin"); // 'signin' | 'signup'
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState("");

    const submit = async (e) => {
        e.preventDefault();
        setBusy(true); setError("");
        try {
        const path = mode === "signin" ? "/auth/login" : "/auth/register";
        const { data } = await api.post(path, { email, password });
        // expected { token, user? }
        if (data?.token) {
            login(data.token, data.user);
            setShowAuth(false);
        } else {
            setError("Invalid server response");
        }
        } catch (err) {
        setError(err?.response?.data?.error || "Authentication failed");
        } finally {
        setBusy(false);
        }
    };

    return (
        <div className="modal__backdrop" role="dialog" aria-modal="true">
        <div className="modal">
            <button className="modal__close" onClick={() => setShowAuth(false)}>✕</button>
            <h3 className="modal__title">{mode === "signin" ? "Sign in" : "Create an account"}</h3>

            <form className="modal__form" onSubmit={submit}>
            <label>
                <span>Email</span>
                <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required />
            </label>
            <label>
                <span>Password</span>
                <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} required />
            </label>
            {error && <div className="modal__error">{error}</div>}
            <button className="btn btn--primary" disabled={busy}>
                {busy ? "Please wait..." : (mode === "signin" ? "Sign in" : "Sign up")}
            </button>
            </form>

            <p className="modal__switch">
            {mode === "signin" ? (
                <>No account? <button onClick={() => setMode("signup")} className="link">Sign up</button></>
            ) : (
                <>Have an account? <button onClick={() => setMode("signin")} className="link">Sign in</button></>
            )}
            </p>
        </div>
        </div>
    );
    }
