import { useNavigate } from "react-router-dom"

export default function HomePage() {

    const navigate = useNavigate();

    const cutomerLogin = () => {
        navigate('/customer-login')
    }
    const sellerLogin = () => {
        navigate('/seller-login')
    }
    return (

        <div className="bg-light min-vh-100 d-flex flex-column font-family-inter">
            {/* Navigation Bar */}
            <nav className="d-flex align-items-center p-3 border-bottom">
                <p className="mb-0 fw-bold fs-4">Repid Mart Shopping</p>

                <div className="ms-auto d-flex">
                    <div className="m-1">
                        <button className='btn btn-primary fw-bold px-3' onClick={cutomerLogin}>Customer Login</button>
                    </div>
                    <div className="m-1">
                        <button className='btn btn-outline-primary fw-bold px-3' onClick={sellerLogin}>Seller Login</button>
                    </div>
                </div>
            </nav>

            <main className="flex-fill">
                {/* Hero Section */}
                <section className="container my-lg-5">
                    <div className="row align-items-center gy-5">
                        <div className="col-lg-7">
                            <span className="badge rounded-pill bg-primary bg-opacity-10 text-primary mb-3 px-3 py-2">
                                NEW ARRIVAL 2026
                            </span>
                            <h1 className="display-3 fw-black mb-4">
                                Your One-Stop Shop for <span className="text-primary">Everything</span>
                            </h1>
                            <p className="lead text-muted mb-5">
                                Discover the best eco-friendly products across electronics, fashion, and home decor.
                                Sustainable living made easy for a greener future.
                            </p>
                            <div className="d-flex flex-wrap gap-3">
                                <button 
                                className="btn btn-primary btn-lg px-4 py-3 fw-bold d-flex align-items-center gap-2 shadow"
                                onClick={cutomerLogin}
                                >
                                    Shop Now
                                </button>
                                <button className="btn btn-outline-secondary btn-lg px-4 py-3 fw-bold">
                                    Learn More
                                </button>
                            </div>
                        </div>

                        <div className="col-lg-5">
                            <div className="position-relative">
                                <img
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAw1XaRYytmekxBOCiXQ_WPF_pLWo5QYrm9mfXPIDyQGHnpu3zRBDBlIzjQjUsQ1tCKBSU4x9UyrbPrEq7A83mKb_EDgiViui5lZqpp0q3EJ2K7AhnqHrCUkF-1oG07G9P8pOov2B_GP4uhS_aaeP4TqUvPk3Uh4zporoA3xNr0v-Pf5cT2AEXoxeu1b2at1ZgbMK2FpO5kNyb-gJBHw48Jd6yLPR2hyyAQNc6UpnK81jUvfL8zzfztdEJ317_AlJY98wl-gSTTIB6y"
                                    alt="Sustainable Lifestyle"
                                    className="img-fluid rounded-4 shadow-lg"
                                />
                                <div className="position-absolute bottom-0 end-0 m-4 p-3 bg-white rounded-3 shadow d-flex align-items-center gap-3">
                                    <div className="bg-success bg-opacity-10 p-2 rounded-circle text-success d-flex">
                                        <span className="material-symbols-outlined">eco</span>
                                    </div>
                                    <div>
                                        <small className="d-block text-muted fw-bold text-uppercase" style={{ fontSize: '10px' }}>Carbon Neutral</small>
                                        <span className="fw-bold">100% Verified</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="bg-white border-top py-5">
                <div className="container">
                    <div className="row gy-4">
                        <div className="col-md-4">
                            <div className="d-flex align-items-center gap-2 mb-3">
                                <div className="p-1 bg-primary rounded text-white d-flex">
                                    <span className="material-symbols-outlined fs-5">Rm</span>
                                </div>
                                <h2 className="h5 mb-0 fw-bold text-primary">Repid mart shopping</h2>
                            </div>
                            <p className="text-muted small">Leading the way in sustainable e-commerce.</p>
                        </div>
                        <div className="col-6 col-md-2">
                            <h6 className="fw-bold">Quick Links</h6>
                            <ul className="list-unstyled small text-muted">
                                <li>About Us</li>
                                <li>Careers</li>
                            </ul>
                        </div>
                        <div className="col-6 col-md-2">
                            <h6 className="fw-bold">Support</h6>
                            <ul className="list-unstyled small text-muted">
                                <li>Shipping Policy</li>
                                <li>FAQ</li>
                            </ul>
                        </div>
                        <div className="col-md-4">
                            <h6 className="fw-bold">Newsletter</h6>
                            <div className="input-group mb-3">
                                <input type="text" className="form-control" placeholder="Email" />
                                <button className="btn btn-primary">
                                    <span className="material-symbols-outlined fs-6">send</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>

    )
}