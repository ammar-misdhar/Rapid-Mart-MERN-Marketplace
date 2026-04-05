export default function OrderList({ OrderData, role, clickEdit, cancelOrder }) {
    const imageUrl = process.env.REACT_APP_API_URL;

    return (
        <div className="container py-5">
            {/* Page Header */}
            <div className="d-flex align-items-center justify-content-between mb-4">
                <h2 className="fw-bold h4 mb-0 text-dark">
                    {role === "customer" ? "Track Your Orders" : "My Orders"}
                </h2>
                {OrderData.length > 0 && (
                    <span className="badge bg-secondary-subtle text-secondary border px-3 py-2 rounded-pill">
                        {OrderData.length} Orders
                    </span>
                )}
            </div>

            {/* Empty State Logic */}
            {!OrderData.length > 0 && (
                <div className="text-center py-5">
                    <h1 className="display-6 text-muted fw-light">No Orders Found</h1>
                    <p className="text-secondary">It looks like there's nothing here yet.</p>
                </div>
            )}

            {/* Orders List Container */}
            <div className="d-flex flex-column gap-4">
                {OrderData.map((order) => (
                    <div key={order._id} className="card shadow-sm border-1 rounded-3 overflow-hidden">

                        {/* Header: Focused on Order Identity */}
                        <div className="card-header py-3 border-bottom d-flex justify-content-between align-items-center">
                            <div>
                                <span className="text-muted small text-uppercase fw-bold ls-wide">Order ID : #{order._id.slice(-8).toUpperCase()}</span>
                            </div>

                            <div>
                                {order.status === 'Cancelled' || order.status === 'Returned' || order.status === "Order Canceled" ? (
                                    <span className="badge bg-danger-subtle text-danger px-3 py-2 rounded-pill border border-danger-subtle">
                                        {role === "seller"
                                            ? (order.status === "Order Canceled" ? "Customer Canceled" : order.status)
                                            : (order.status === "Order Canceled" ? "You Canceled" : order.status)
                                        }
                                    </span>
                                ) : (order.status === 'Delivered' ? (
                                    <span className="badge bg-success-subtle text-success px-3 py-2 rounded-pill border border-success-subtle">
                                        {order.status}
                                    </span>
                                ) : (
                                    <span className="badge bg-primary-subtle text-primary px-3 py-2 rounded-pill border border-primary-subtle">
                                        {order.status}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="card-body p-0">
                            <div className="row g-0 align-items-stretch">
                                {/* Product Image */}
                                <div className="col-md-2 p-3 text-center">
                                    <img
                                        src={`${imageUrl}/images/${order.productID?.image}`}
                                        alt={order.productID?.productName}
                                        className="img-fluid rounded"
                                        style={{
                                            width: "50%%",
                                            height: "50%%",
                                            objectFit: "cover"
                                        }}
                                    />
                                </div>

                                {/* Order Details: Main Content */}
                                <div className="col-md-7 p-4">
                                    <div className="mb-3">
                                        <h5 className="fw-bold mb-1 text-dark">{order.productID?.productName}</h5>
                                        <p className="mb-0 text-muted small">
                                            Quantity: <span className="text-dark fw-bold">{order.quantity}</span>
                                            <span className="mx-2 text-light">|</span>
                                            Total: <span className="text-primary fw-bold fs-5">LKR {order.amount?.toLocaleString()}</span>
                                        </p>
                                    </div>

                                    {/* Role-Based Info Section */}
                                    <div className="p-3 rounded bg-light border border-light-subtle small">
                                        {role === 'seller' ? (
                                            <div className="row row-cols-1 row-cols-sm-2 g-2">
                                                <p className="mb-0"><strong>Customer:</strong> {order.customerID.firstName} {order.customerID.lastName}</p>
                                                <p className="mb-0"><strong>Contact:</strong> {order.customerID?.contact}</p>
                                                <p className="mb-0"><strong>Tracking:</strong> {order.trackingNo || 'N/A'}</p>
                                                <p className="mb-0 text-truncate"><strong>Address:</strong> {order.address}</p>
                                                <p className="mb-0 col-12 text-success"><strong>Internal Note:</strong> {order.sellerNote || 'No notes'}</p>
                                            </div>
                                        ) : (
                                            <div className="row row-cols-1 row-cols-sm-2 g-2">
                                                <p className="mb-0"><strong>Seller:</strong> {order.productID?.sellerID?.firstName} {order.productID?.sellerID?.lastName}</p>
                                                <p className="mb-0"><strong>Tracking #:</strong> {order.trackingNo || 'Pending shipment'}</p>
                                                <p className="mb-0 col-12"><strong>Delivery Address:</strong> {order.address}</p>
                                                <p className="mb-0 col-12 text-secondary font-italic"><strong>Seller Note:</strong> {order.sellerNote || 'No additional notes'}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Actions Section */}
                                <div className="col-md-3 p-4 d-flex align-items-center justify-content-md-end border-top border-md-top-0 border-light ">
                                    <div className="d-grid d-md-flex gap-2 w-100 justify-content-md-end">
                                        {/* SELLER ONLY logic */}
                                        {role === 'seller' && order.status !== "Order Canceled" && (
                                            <button
                                                className="btn btn-warning px-4 fw-bold shadow-sm"
                                                onClick={() => clickEdit(order._id)}>
                                                Update Status
                                            </button>
                                        )}

                                        {/* CUSTOMER ONLY logic */}
                                        {role === 'customer' && (order.status === "panding" || order.status === "Processing") && (
                                            <button
                                                className="btn btn-outline-danger px-4 fw-bold"
                                                onClick={() => cancelOrder(order._id)}>
                                                Cancel Order
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}