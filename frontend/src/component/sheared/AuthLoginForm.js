import { useState } from "react"

export default function AuthLoginForm({ role, loginData, signUp }) {

    const [formData, setFormData] = useState({})

    const eventChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        setFormData({ ...formData, [name]: value })
    }

    const eventSubmit = (e) => {
        e.preventDefault();
        loginData(formData)
    }

    return (
        <div
            className="container-fluid d-flex justify-content-center align-items-center p-0"
            style={{
                minHeight: '100vh',
                background: 'linear-gradient(135deg, #f5f7f8 0%, #eef2f3 100%)',
                fontFamily: "'Inter', sans-serif"
            }}
        >
            <div className="container">
                <div className="row align-items-center g-5">

                    {/* Left Side: Branding/Info (Only shows for Seller) */}
                    {role === "seller" && (
                        <div className="col-lg-6 d-none d-lg-flex flex-column gap-4">
                            <div className="mb-4">
                                <div className="d-flex align-items-center gap-2 text-primary mb-4">
                                    <h3 className="text-success fw-bold">Rapid Mart Shopping</h3>
                                </div>
                                <h1 className="display-4 fw-black tracking-tight text-dark">
                                    Grow your <span className="text-primary">Eco-Friendly</span> business.
                                </h1>
                                <p className="lead text-secondary mt-3">
                                    Join thousands of sustainable brands reaching millions of conscious consumers.
                                </p>
                            </div>

                            <div className="row g-3">
                                <div className="col-6">
                                    <div className="p-4 bg-white rounded-4 shadow-sm border border-light">
                                        <span className="material-symbols-outlined text-primary mb-2">trending_up</span>
                                        <h6 className="fw-bold mb-1">Real-time Analytics</h6>
                                        <p className="small text-muted mb-0">Track performance daily.</p>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="p-4 bg-white rounded-4 shadow-sm border border-light">
                                        <span className="material-symbols-outlined text-primary mb-2">security</span>
                                        <h6 className="fw-bold mb-1">COD Payments</h6>
                                        <p className="small text-muted mb-0">Customer trust.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Right Side: Login Form (Centered if Customer, Offset if Seller) */}
                    <div className={role === "seller" ? "col-lg-5 offset-lg-1" : "col-lg-5 mx-auto"}>

                        <div className="card border-0 shadow-lg" style={{ borderRadius: '1.5rem', overflow: 'hidden' }}>

                            {/* Branding Header */}
                            <div className="p-4 text-center text-white bg-success">
                                <h6 className="fw-bold m-0 text-uppercase tracking-wider" style={{ fontSize: '0.9rem' }}>
                                    {role} Portal
                                </h6>
                            </div>

                            <form className="card-body p-4 p-md-5" onSubmit={eventSubmit}>
                                <div className="text-center mb-4">
                                    <h4 className="fw-bold text-dark">Welcome Back</h4>
                                    {role === "customer" ? (
                                        <p className="m-0 text-muted small">Log in to your Repid mart account to continue your sustainable journey.</p>
                                    ) : (
                                        <p className="text-muted small">Please enter your details to sign in</p>

                                    )}
                                </div>

                                {/* Email Field */}
                                <div className="mb-3">
                                    <label className="form-label small fw-bold text-secondary">Email Address</label>
                                    <div className="input-group">
                                        <input
                                            type="email"
                                            name="email"
                                            className="form-control bg-light border-1"
                                            onChange={eventChange}
                                            required
                                            style={{ fontSize: '0.9rem', padding: '0.6rem' }}
                                        />
                                    </div>
                                </div>

                                {/* Password Field */}
                                <div className="mb-4">
                                    <div className="d-flex justify-content-between">
                                        <label className="form-label small fw-bold text-secondary">Password</label>
                                        <a href="#" className="text-decoration-none small fw-semibold text-success">Forgot?</a>
                                    </div>
                                    <div className="input-group">
                                        <input
                                            type="password"
                                            name="password"
                                            className="form-control bg-light border-1"
                                            onChange={eventChange}
                                            required
                                            style={{ fontSize: '0.9rem', padding: '0.6rem' }}
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-success w-100 py-2 fw-bold d-flex align-items-center justify-content-center gap-2"
                                >
                                    Sign In
                                </button>

                                {/* Footer */}
                                <div className="text-center mt-4">
                                    <p className="text-muted small">
                                        Don't have an account? <br />
                                        <span className="fw-bold cursor-pointer text-success"  onClick={() => { signUp(role) }}>
                                            Register as a {role}
                                        </span>
                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )

}