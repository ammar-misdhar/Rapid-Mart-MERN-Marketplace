import { useEffect, useState } from "react"

export default function ProductForm({ formData, oparator, selectedProduct, goBack }) {
    const ImageUrl = process.env.REACT_APP_API_URL;

    const [formValue, setFormValue] = useState({
        productName: "",
        productDescription: "",
        productStock: 1,
        costPrice: 0,
        sellingPrice: 0,
        image: ""
    })

    useEffect(() => {
        if (selectedProduct) {
            setFormValue(
                {
                    productName: selectedProduct.productName || "",
                    productDescription: selectedProduct.productDescription || "",
                    productStock: selectedProduct.productStock || 0,
                    costPrice: selectedProduct.costPrice || 0,
                    sellingPrice: selectedProduct.sellingPrice || 0,
                    image: selectedProduct.image || "",
                }
            )
        }
    }, [selectedProduct])

    const isFormValid =
        formValue.productName.trim() !== "" &&
        formValue.productDescription.trim() !== "" &&
        formValue.productStock !== "" &&
        formValue.costPrice !== "" &&
        formValue.sellingPrice > 0 &&
        formValue.image !== "";

    const eventChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setFormValue({ ...formValue, [name]: value });
    }

    //const [image, setimage] = useState();//for teasting
    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-lg-8">
                    <div className="card shadow-sm border-0 rounded-3">
                        {/* Header with Dynamic Color */}
                        <div className={`card-header py-3 ${oparator === "edit-prd" ? "bg-primary" : "bg-success"} text-white border-0`}>
                            <h4 className="mb-0 fw-bold">
                                {oparator === "edit-prd" ? "Edit Product" : "Add New Product"}
                            </h4>
                        </div>

                        <div className="card-body p-4">
                            <form onSubmit={(e) => e.preventDefault()}>

                                {/* Image Upload Section */}
                                <div className="mb-4 d-flex flex-column align-items-center justify-content-center">
                                    <label className="form-label fw-bold text-secondary text-uppercase small mb-3">
                                        Product Media
                                    </label>

                                    <div className="text-center" style={{ maxWidth: '220px' }}>
                                        {/* Image Preview Container */}
                                        <div className="position-relative mb-3 d-inline-block">
                                            {formValue.image?.name ? (
                                                <img
                                                    src={URL.createObjectURL(formValue.image)}
                                                    alt="Preview"
                                                    className="rounded-3 shadow-sm border"
                                                    style={{ width: '180px', height: '180px', objectFit: 'cover' }}
                                                />
                                            ) : formValue.image ? (
                                                <img
                                                    src={`${ImageUrl}/images/${formValue.image}`}
                                                    alt="Preview"
                                                    className="rounded-3 shadow-sm border"
                                                    style={{ width: '180px', height: '180px', objectFit: 'cover' }}
                                                />
                                            ) : (
                                                <div className="rounded-3 border border-dashed d-flex flex-column align-items-center justify-content-center bg-light text-muted"
                                                    style={{ width: '180px', height: '180px', borderStyle: 'dashed', borderWidth: '2px' }}>
                                                    <span className="small">No Image</span>
                                                </div>
                                            )}
                                        </div>


                                        <input
                                            type="file"
                                            className="form-control form-control-sm mx-auto"
                                            style={{ fontSize: '12px' }}
                                            onChange={(e) => { setFormValue({ ...formValue, image: e.target.files[0] }) }}
                                        />
                                        <div className="form-text mt-1" style={{ fontSize: '10px' }}>
                                            Recommended: Square 800x800 px
                                        </div>
                                    </div>
                                </div>

                                <hr className="my-4 opacity-25" />

                                {/* General Info */}
                                <div className="mb-3">
                                    <label className="form-label fw-bold">Product Name*</label>
                                    <input type="text"
                                        className="form-control form-control-lg fs-6"
                                        placeholder="e.g. JBL Wireless Headphones"
                                        value={formValue.productName}
                                        name="productName"
                                        onChange={eventChange}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label fw-bold">Product Description*</label>
                                    <textarea
                                        className="form-control"
                                        placeholder="Tell customers about the features, warranty, etc..."
                                        rows="4"
                                        name="productDescription"
                                        value={formValue.productDescription}
                                        onChange={eventChange}
                                    ></textarea>
                                </div>

                                {/* Responsive Grid for Numbers */}
                                <div className="row g-3 mb-4">
                                    <div className="col-md-4">
                                        <label className="form-label fw-bold small">Stock Quantity*</label>
                                        <input type="number"
                                            className="form-control"
                                            min="0"
                                            name="productStock"
                                            value={formValue.productStock}
                                            onChange={eventChange}
                                        />
                                    </div>
                                    <div className="col-md-4">
                                        <label className="form-label fw-bold small">Cost Price (LKR)</label>
                                        <div className="input-group">
                                            <span className="input-group-text bg-light">Rs.</span>
                                            <input type="number"
                                                className="form-control"
                                                name="costPrice"
                                                value={formValue.costPrice}
                                                min="0"
                                                onChange={eventChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <label className="form-label fw-bold small">Selling Price*</label>
                                        <div className="input-group">
                                            <span className="input-group-text bg-primary-subtle border-primary-subtle text-primary fw-bold">Rs.</span>
                                            <input type="number"
                                                className="form-control border-primary-subtle"
                                                name="sellingPrice"
                                                min="0"
                                                value={formValue.sellingPrice}
                                                onChange={eventChange}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Footer Buttons */}
                                <div className="d-grid gap-2 pt-3">
                                    <button
                                        className={`btn ${oparator === "edit-prd" ? "btn-primary" : "btn-success"} btn-lg fw-bold shadow-sm`}
                                        onClick={(e) => {
                                            e.preventDefault(); formData(formValue);
                                            if (oparator !== "edit-prd") {
                                                setFormValue({
                                                    productName: "",
                                                    productDescription: "",
                                                    productStock: 1,
                                                    costPrice: 0,
                                                    sellingPrice: 0,
                                                    image: ""
                                                });
                                            }
                                        }}
                                        disabled={!isFormValid}
                                    >
                                        {oparator === "edit-prd" ? "Update Product Details" : "Publish Product"}
                                    </button>

                                    <button
                                        type="button"
                                        className="btn btn-link text-secondary text-decoration-none"
                                        onClick={goBack}
                                    >
                                        ← Back to Dashboard
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}