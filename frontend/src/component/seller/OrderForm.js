import { useEffect, useState } from "react"

export default function OrderForm({ orderData, UpdateOrder, closeCliked }) {

    const [formData, setFormData] = useState({
        status: "",
        trackingNo: "",
        sellerNote: ""
    });

    useEffect(() => {
        if (orderData) {
            setFormData({
                status: orderData.status || "Pending",
                trackingNo: orderData.trackingNo || "",
                sellerNote: orderData.sellerNote || ""
            });
        }
    }, [orderData]);

    return (
        <div className="container mt-5">
            <div className="card shadow-sm">
                <div className="card-header bg-dark text-white">
                    <h4 className="mb-0">Edit Order: {orderData._id}</h4>
                </div>
                <div className="card-body">
                    <form >

                        {/* Order Status - Dropdown is best here */}
                        <div className="mb-3">
                            <label className="form-label font-weight-bold">Order Status</label>
                            <select
                                name="status"
                                className="form-select"
                                value={formData.status}
                                onChange={(e) => { const newState = e.target.value; setFormData({ ...formData, status: newState }) }}
                            >

                                <option value="Pending">Pending</option>
                                <option value="Processing">Processing</option>
                                {(orderData.status !== "Shipped" && orderData.status !== "Delivered" && orderData.status !== "Returned") && (
                                    <option value="Cancelled">Cancelled</option>
                                )}
                                <option value="Shipped">Shipped</option>
                                <option value="Delivered">Delivered</option>
                                {(orderData.status === "Shipped" || orderData.status === "Delivered" || orderData.status === "Returned") && (
                                    <option value="Returned">Returned</option>
                                )}


                            </select>
                        </div>

                        {/* Tracking Number */}
                        <div className="mb-3">
                            <label className="form-label">Tracking Number</label>
                            <input
                                type="text"
                                name="trackingNumber"
                                className="form-control"
                                placeholder="Enter tracking ID"
                                value={formData.trackingNo}
                                onChange={(e) => { const newTrackingNo = e.target.value; setFormData({ ...formData, trackingNo: newTrackingNo }) }}
                            />
                        </div>

                        {/* Seller Notes */}
                        <div className="mb-3">
                            <label className="form-label">Internal Notes (Optional)</label>
                            <textarea
                                name="notes"
                                className="form-control"
                                rows="3"
                                value={formData.sellerNote}
                                onChange={(e) => { const newSellerNote = e.target.value; setFormData({ ...formData, sellerNote: newSellerNote }) }}
                            ></textarea>
                        </div>

                        <div className="d-flex justify-content-between">
                            <button type="button" className="btn btn-light" onClick={(e) => { e.preventDefault(); closeCliked() }}>
                                close
                            </button>
                            {(formData.status === "Shipped" && formData.trackingNo === "") ? (

                                <button type="submit" disabled={true} className="btn btn-primary" onClick={(e) => { e.preventDefault(); UpdateOrder(formData) }}>
                                    Update Order
                                </button>
                            ) : (
                                <button type="submit" className="btn btn-primary" onClick={(e) => { e.preventDefault(); UpdateOrder(formData) }}>
                                    Update Order
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}