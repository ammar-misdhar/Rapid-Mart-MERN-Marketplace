import { useState } from "react"

export default function AuthRegisterForm({ onSubmit, role, login }) {
  const [formValue, setFormValue] = useState({ userName: "", firstName: "", lastName: "", email: "", password: "", contact: "", address: "" })

  const eventChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormValue({ ...formValue, [name]: value })
  }

  const accountInfo =
    formValue.userName !== "" &&
    formValue.firstName !== "" &&
    formValue.lastName !== "" &&
    formValue.email !== "" &&
    formValue.password !== ""

  const personalInfo =
    (role === "customer" &&
      formValue.contact !== "" &&
      formValue.address !== "") ||
    (role === "seller" &&
      formValue.contact !== "")

  return (
    <>
      <div className="container-fluid min-vh-100 d-flex justify-content-center align-items-center bg-light py-5">
        <div className="card border-0 shadow-lg rounded-4 overflow-hidden" style={{ maxWidth: '700px', width: '100%' }}>
          <div className="row g-0">
            {/* Left Sidebar Decorative (Visible on Desktop) */}
            <div className="col-lg-4 bg-primary d-none d-lg-flex flex-column justify-content-center p-5 text-white">
              <h3 className="fw-bold text-white mb-3">Welcome!</h3>
              <p className="small opacity-75">Join thousands of others and start your journey as a {role}.</p>
              <div className="mt-4">
                <div className={`d-flex align-items-center mb-3 ${accountInfo ? 'opacity-100' : 'opacity-50'}`}>
                  <div className="badge bg-white text-primary rounded-pill me-2"> 1</div>
                  <span className="small fw-bold">Account Info</span>
                </div>
                <div className={`d-flex align-items-center ${personalInfo ? 'opacity-100' : 'opacity-50'}`}>
                  <div className="badge bg-white text-primary rounded-pill me-2">2</div>
                  <span className="small fw-bold">Personal Details</span>
                </div>
              </div>
            </div>

            {/* Form Section */}
            <div className="col-lg-8 p-4 p-sm-5 bg-white">
              <div className="text-center text-lg-start mb-4">
                <h2 className="fw-bold text-dark mb-1">Create Account</h2>
                <p className="text-muted small">
                  Setting up your <span className="text-primary fw-bold text-uppercase">{role}</span> profile
                </p>
              </div>

              <form onSubmit={(e) => { e.preventDefault(); onSubmit(formValue); setFormValue({ userName: "", firstName: "", lastName: "", email: "", password: "", contact: "", address: "" }) }}>
                <div className="row g-3">

                  {/* Username - Full Width */}
                  <div className="col-12">
                    <label className="form-label fw-bold small text-secondary">Username</label>
                    <div className="input-group">
                      <input
                        type="text" name="userName" value={formValue.userName} className="form-control form-control-lg bg-light border-0 fs-6"
                        placeholder="johndoe_99" required onChange={eventChange}
                      />
                    </div>
                  </div>

                  {/* Names - 50/50 on desktop */}
                  <div className="col-sm-6">
                    <label className="form-label fw-bold small text-secondary">First Name</label>
                    <input
                      type="text" name="firstName" value={formValue.firstName} className="form-control form-control-lg bg-light border-0 fs-6"
                      placeholder="John" required onChange={eventChange}
                    />
                  </div>
                  <div className="col-sm-6">
                    <label className="form-label fw-bold small text-secondary">Last Name</label>
                    <input
                      type="text" name="lastName" value={formValue.lastName} className="form-control form-control-lg bg-light border-0 fs-6"
                      placeholder="Doe" required onChange={eventChange}
                    />
                  </div>

                  {/* Email - Full Width */}
                  <div className="col-12">
                    <label className="form-label fw-bold small text-secondary">Email Address</label>
                    <input
                      type="email" name="email" value={formValue.email} className="form-control form-control-lg bg-light border-0 fs-6"
                      placeholder="name@example.com" required onChange={eventChange}
                    />
                  </div>


                  {/* Password - Full Width */}
                  <div className="col-12">
                    <label className="form-label fw-bold small text-secondary">Password</label>
                    <input
                      type="password" name="password" value={formValue.password} className="form-control form-control-lg bg-light border-0 fs-6"
                      placeholder="••••••••" required onChange={eventChange}
                    />
                    <div className="form-text small" style={{ fontSize: '11px' }}>Minimum 8 characters with a mix of letters & numbers.</div>
                  </div>

                  {/* Contact - Full Width */}
                  <div className="col-12">
                    <label className="form-label fw-bold small text-secondary">Phone Number</label>
                    <input
                      type="text" name="contact" value={formValue.contact} className="form-control form-control-lg bg-light border-0 fs-6"
                      placeholder="+94 77 123 4567" required onChange={eventChange}
                    />
                  </div>

                  {/* Conditional Address Field */}
                  {role === 'customer' && (
                    <div className="col-12">
                      <label className="form-label fw-bold small text-secondary">Shipping Address</label>
                      <textarea
                        name="address" value={formValue.address} className="form-control bg-light border-0 fs-6" rows="2"
                        placeholder="No. 123, Main Street, Colombo 03" required onChange={eventChange}
                      ></textarea>
                    </div>
                  )}
                </div>

                {/* Submit Button */}
                <button type="submit" className="btn btn-primary btn-lg w-100 mt-4 rounded-3 fw-bold shadow-sm py-3 transition-all hover-lift">
                  Get Started
                </button>

                {/* Footer Link */}
                <div className="text-center mt-4">
                  <p className="small text-muted mb-0">
                    Already have an account?
                    <button
                      type="button"
                      className="btn btn-link p-0 ms-1 text-primary text-decoration-none fw-bold small"
                      onClick={() => { login(role) }}
                    >
                      Sign In
                    </button>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}