export default function Imagegallery({ selectedProduct, placeOrder }) {
    const imageUrl = process.env.REACT_APP_API_URL;

    const isOutofStock = selectedProduct.productStock === 0

    return (
        <>
            <>
                <div className="container mt-5">
                    <div className="row g-4 lg-g-5"> {/* Added gutter spacing between columns */}

                        {/* Left Side: Gallery */}
                        <div className="col-md-6">
                            <img
                                src={selectedProduct?.image?`${imageUrl}/images/${selectedProduct.image}`:""}
                                alt={"product image"}
                                className="img-fluid"
                                style={{
                                    aspectRatio: '1/1',
                                    objectFit: 'cover',
                                    width: '60%',//or 40%
                                    display: 'block'
                                }}
                            />
                        </div>

                        {/* Right Side: Product Info */}
                        <div className="col-md-6">
                            <nav aria-label="breadcrumb"> {/* Optional: Breadcrumb for better UX */}
                                <ol className="breadcrumb small">
                                    <li className="breadcrumb-item text-primary" style={{ cursor: 'pointer' }} onClick={() => window.history.back()}>Shop</li>
                                    <li className="breadcrumb-item active">{selectedProduct.productName}</li>
                                </ol>
                            </nav>

                            <h1 className="fw-bold display-6 mb-2">{selectedProduct.productName}</h1>

                            {/* Stock Badge */}
                            <div className="mb-3">
                                {selectedProduct.productStock > 0 ? (
                                    <span className="badge bg-success-subtle text-success">
                                        In Stock: {selectedProduct.productStock}
                                    </span>
                                ) : (
                                    <span className="badge bg-danger-subtle text-danger">
                                        Out of Stock
                                    </span>
                                )}
                            </div>

                            <div className="d-flex align-items-center my-4">
                                <h2 className="text-primary fw-bold mb-0">LKR {selectedProduct.sellingPrice}</h2>
                            </div>

                            <hr className="text-muted" />

                            <div className="product-description my-4 p-3">
                                <h6 className="fw-bold text-dark">Product Overview</h6>
                                <p className="text-secondary mb-0" style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6' }}>
                                    {selectedProduct.productDescription}
                                </p>
                            </div>

                            <div className="action-area mt-auto">
                                {isOutofStock ? (
                                    <button
                                        className="btn btn-secondary btn-lg w-100 py-3 shadow-none mt-3"
                                        disabled={true}
                                    >
                                        Currently Unavailable
                                    </button>
                                ) : (
                                    <button
                                        className="btn btn-primary btn-lg w-100 py-3 shadow-sm mt-3 fw-bold"
                                        onClick={() => placeOrder()}
                                    >
                                        Place Order Now
                                    </button>
                                )}

                                <p className="text-center text-muted small mt-3">
                                    Secure Data & Fast Delivery
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </>
        </>
    );
}