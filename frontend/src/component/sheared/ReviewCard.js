import { useState } from "react";

export default function ReviewCard({ reviewData, postreview, postReplay, handleDeleteReview, handleDeleteReplay, reviewButtonFlag, loginCustomer, role, productData }) {
    const ImageUrl = process.env.REACT_APP_API_URL;

    const [review, setReview] = useState("");//for customer
    const [replay, setReplay] = useState({});//for seller


    return (
        <>
            <div className="container mt-5">
                {role === "seller" && (
                    <>
                        {productData.image && (
                            <img src={`${ImageUrl}/images/${productData.image}`}
                                alt="prd-name"
                                className="img-fluid rounded"
                                style={{ maxHeight: "100px" }}
                            />
                        )}
                        <h2>{productData.productName}</h2>
                        <p>LKR : {productData.sellingPrice}.00</p>
                        <hr></hr>
                    </>
                )}

                {/* customer section /////////////////////////////////// */}
                <h4 className="m-2 mb-3" >Customer Review</h4>
                {role === "customer" && (
                    <form className="mb-3 d-flex align-items-center">
                        <input
                            type="text"
                            className="form-control me-2"
                            placeholder="Write a review..."
                            value={review}
                            onChange={(e) => { setReview(e.target.value) }}
                        />
                        <button
                            type="submit"
                            className="btn btn-success text-nowrap"
                            disabled={reviewButtonFlag}
                            onClick={(e) => { e.preventDefault(); if (!review.trim()) return; postreview(review); setReview("") }}
                        >
                            Post Review
                        </button>
                    </form>

                )}

                {reviewData.length <= 0 && (
                    <h3 className="d-flex pt-5 justify-content-center">No reviews ! </h3>
                )}

                {reviewData.map((data) => (
                    <div className="card border-1 shadow-sm mb-2 bg-light" key={data._id}>
                        <div className="card-body">
                            <div className="d-flex justify-content-between align-items-start mb-2">
                                <div className="d-flex align-items-center">
                                    {/* User Info */}
                                    <div className="rounded-circle bg-secondary text-white d-flex align-items-center justify-content-center me-3" style={{ width: '40px', height: '40px' }}>
                                        {data.customerID?.firstName?.charAt(0)}
                                    </div>
                                    <div>
                                        <h6 className="mb-0 fw-bold">{data.customerID?.firstName} {data.customerID?.lastName}</h6>
                                        <small className="text-muted">{data.createdAt.split("T")[0]}</small>
                                    </div>
                                </div>

                                {/* DELETE BUTTON: Only show if this is the customer's own review */}
                                {data.customerID?._id === loginCustomer && (
                                    <button
                                        className="btn btn-outline-danger btn-sm"
                                        onClick={() => { handleDeleteReview(data._id); setReview("") }}
                                    >
                                        Delete
                                    </button>
                                )}
                            </div>

                            <p className="card-text text-secondary mt-3">
                                {data.customerReview}
                            </p>

                            {/* SELLER REPLAY SECTION ////////////////////////////////////////*/}
                            {data.sellerReplay !== "" ? (
                                <div className="mt-3 p-2 bg-white rounded border-start border-success border-4">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <p className="card-text text-success  mb-0">
                                            Seller Reply: {data.sellerReplay}
                                        </p>

                                        {/* SELLER ACTION: Delete Replay */}
                                        {role === "seller" && (
                                            <button
                                                className="btn btn-danger p-1 btn-sm p-0"
                                                onClick={() => handleDeleteReplay(data._id)}
                                            >
                                                Delete Reply
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                /* SELLER ACTION: Post Replay (Only if no replay exists) */
                                role === "seller" && (
                                    <form className="mt-3 d-flex" onSubmit={(e) => {
                                        e.preventDefault();
                                        const currentReply = replay[data._id];
                                        if (!currentReply.trim()) return;
                                        postReplay({ replay: currentReply, reviewId: data._id });
                                        setReplay("")
                                    }}>
                                        <input
                                            value={replay[data._id] || ""}
                                            type="text"
                                            className="form-control form-control-sm me-2"
                                            placeholder="Write a reply..."
                                            onChange={(e) => { setReplay({ ...replay, [data._id]: e.target.value }) }}
                                        />
                                        <button type="submit" className="btn btn-primary btn-sm">Reply</button>
                                    </form>
                                )
                            )}
                        </div>
                    </div>

                ))}
            </div >
        </>

    )
}