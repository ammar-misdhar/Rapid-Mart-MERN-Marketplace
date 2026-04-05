import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";

export default function AddOrder({ productData, prdQuantity, goBack }) {
    const ImageUrl = process.env.REACT_APP_API_URL;
    //get customer address for default value
    const { userData } = useContext(UserContext);

    const [address, setAddress] = useState("");
    const [quantity, setQuantity] = useState(1);

    const total = parseInt(productData.sellingPrice) * parseInt(quantity);
    const isOutofStock = quantity > parseInt(productData.productStock);

    const isAdress = address !== "";

    useEffect(() => {
        if (userData.address) {
            setAddress(userData.address || "");
        }
    }, [userData])


    const quantityChange = (e) => {
        const value = e.target.value
        setQuantity(value)
    }

    const sendQuantity = (e) => {
        e.preventDefault();
        prdQuantity({ quantity: quantity, address: address ,amount:total});
        setQuantity(1);
    }

    return (
        <div className="card shadow-sm border-0 rounded-3">
            <div className="card-body p-0" >
                {/* Header */}
                <div className="p-3 border-bottom bg-light rounded-top">
                    <h6 className="mb-0 fw-bold">Review Order</h6>
                </div>

                <div className="p-3">
                    {/* 1. Product Item Row */}
                    <div className="d-flex align-items-start mb-4">
                        {productData.image && (
                            <div className="flex-shrink-0 me-3">
                                <img
                                    src={`${ImageUrl}/images/${productData.image}`}
                                    alt="product"
                                    className="rounded border"
                                    style={{ width: "80px", height: "80px", objectFit: "cover" }}
                                />
                            </div>
                        )}
                        <div className="flex-grow-1">
                            <h6 className="mb-1 fw-bold text-dark">{productData.productName}</h6>
                            <p className="mb-2 text-muted small">Unit Price: LKR {productData.sellingPrice}</p>

                            {/* Quantity Selector inside the item row */}
                            <div className="d-flex align-items-center">
                                <span className="small text-muted me-2">Quantity:</span>
                                <input
                                    type="number"
                                    value={quantity}
                                    className="form-control form-control-sm text-center fw-bold"
                                    style={{ maxWidth: '70px', borderRadius: '5px' }}
                                    min="1"
                                    onChange={quantityChange}
                                />
                            </div>
                        </div>
                    </div>

                    {/* 2. Shipping Address Section */}
                    <div className="mb-4 pt-2">
                        <label className="form-label d-flex justify-content-between align-items-center">
                            <span className="fw-bold small text-uppercase text-secondary">Shipping Address</span>
                            {!isAdress && <span className="text-danger small" style={{ fontSize: '0.7rem' }}>Required *</span>}
                        </label>
                        <textarea
                            className={`form-control ${!isAdress ? 'border-warning' : 'border-light-subtle'}`}
                            rows="3"
                            placeholder="Enter house number, street, and city..."
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            style={{ backgroundColor: '#fcfcfc', fontSize: '0.9rem' }}
                        ></textarea>
                    </div>

                    <hr className="my-4" />

                    {/* 3. Payment Summary Block */}
                    <div className="bg-light p-3 rounded-3 mb-4">
                        <div className="d-flex justify-content-between mb-2">
                            <span className="text-muted small">Subtotal ({quantity} item{quantity > 1 ? 's' : ''})</span>
                            <span className="text-dark">LKR {total || "0"}</span>
                        </div>
                        <div className="d-flex justify-content-between mb-3">
                            <span className="text-muted small">Shipping Fee</span>
                            <span className="text-success small fw-bold">FREE</span>
                        </div>
                        <div className="d-flex justify-content-between align-items-center pt-2 border-top">
                            <span className="fw-bold">Order Total</span>
                            <span className="fw-bold fs-4 text-primary">LKR {total || "0"}</span>
                        </div>
                    </div>

                    {/* 4. Action Buttons */}
                    <div className="d-grid gap-2">
                        {isOutofStock ? (
                            <button
                                className="btn btn-danger btn-lg py-3 fw-bold shadow-sm"
                                disabled={true}
                                style={{ fontSize: '0.9rem' }}
                            >
                                Out of Stock (Max: {productData.productStock})
                            </button>
                        ) : (
                            <button
                                className="btn btn-primary btn-lg py-3 fw-bold shadow-sm"
                                onClick={sendQuantity}
                                disabled={!isAdress}
                                style={{ fontSize: '1rem' }}
                            >
                                Confirm Order
                            </button>
                        )}

                        <button
                            className="btn btn-link btn-sm text-secondary text-decoration-none mt-2"
                            onClick={() => goBack()}
                        >
                            Cancel and return
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}