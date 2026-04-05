import { useEffect, useState } from "react";

export default function ProductCard({ role, productData, selectedProductID, searchedProduct, handleEdit, clickPlaceOrder, clickManageReview, pageNo, currentPage, totalPage }) {
  const imgUrl = process.env.REACT_APP_API_URL;
  const searchLocalStorage = localStorage.getItem('search');

  const [search, setSearch] = useState("")//local storage memory
  const [fleg, setFleg] = useState(true)

  const selectedProduct = (e) => {
    selectedProductID(e)
  }

  //page refresh load text 
  useEffect(() => {
    if (searchLocalStorage) {
      setSearch(searchLocalStorage);
    } else {
      setSearch("")
    }

  }, [searchLocalStorage])

  return (
    <>
      <nav className="navbar navbar-light bg-light mb-2">
        <form className="d-flex mx-auto w-50">
          <div className="input-group">
            <input
              className="form-control"
              type="text"
              placeholder="Search a product"
              value={search} // Important: Bind value to state
              onChange={(e) => {
                setSearch(e.target.value);

                if (e.target.value) {
                  setFleg(false)
                } else (
                  setFleg(true)
                )
              }}
            />
            {/* Only show Cancel button if there is text in the search */}
            {search && (
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={() => {
                  localStorage.removeItem('search');

                  setSearch("");             // Clear local input state
                  searchedProduct("");       // Reset the parent filter
                  setFleg(true)
                }}
              >
                X
              </button>
            )}

            <button
              className="btn btn-outline-success"
              type="submit"
              disabled={fleg}
              onClick={(e) => {
                localStorage.setItem('search', search);

                e.preventDefault();
                searchedProduct(search);
                setFleg(true)
              }}
            >
              Search
            </button>
          </div>
        </form>
      </nav>


      {role === 'seller' && (
        <h4 className="fw-bold m-3">View my Prouct</h4>
      )}

      {!search && !productData.length > 0 && (
        <><h1 className="d-flex pt-5 justify-content-center">No product...</h1></>
      )}
      {search && !productData.length > 0 && (
        <><h1 className="d-flex pt-5 justify-content-center">No product like that</h1></>
      )}


{/* Card section start */}
      <div className="container">
        {/* Added a row with responsive column counts */}
        <div className="row g-3">
          {productData.map((item) => (
            <div key={item._id} className="col-6 col-md-4 col-lg-3"> {/* 2 items on mobile, 4 on desktop */}
              <div
                className="card h-100 shadow-sm border-1 overflow-hidden"
                onClick={role !== 'seller' ? () => selectedProduct(item._id) : undefined}
                style={{ cursor: role !== 'seller' ? 'pointer' : 'default' }}
              >
                {/* Top: Square Image */}
                <div className="position-relative">
                  <img
                    src={`${imgUrl}/images/${item.image}`}
                    className="card-img-top"
                    alt={item.productName}
                    style={{
                      aspectRatio: '1/1',
                      objectFit: 'cover',
                      width: '100%',
                      display: 'block'
                    }}
                  />
                  {/* "New" Badge overlayed on image like modern marketplaces */}
                  <span
                    className="badge bg-white text-dark border position-absolute top-0 start-0 m-2 small shadow-sm"
                    style={{ opacity: 0.9 }}
                  >
                    New
                  </span>
                </div>

                {/* Bottom: Content */}
                <div className="card-body d-flex flex-column p-2">
                  <h6 className="card-title fw-bold mb-1 text-truncate" title={item.productName}>
                    {item.productName}
                  </h6>

                  <p className="card-text text-muted small mb-2 text-truncate-2" style={{ fontSize: '0.8rem', height: '2.4rem', overflow: 'hidden' }}>
                    {item.productDescription}
                  </p>

                  <div className="mt-auto">
                    <h5 className="text-primary fw-bold mb-2">LKR {item.sellingPrice}</h5>

                    {role === 'seller' ? (
                      <div className="d-flex flex-column gap-1">
                        <button
                          className="btn btn-sm btn-outline-success w-100 py-1"
                          onClick={(e) => { e.stopPropagation(); clickManageReview(item._id); }}
                          style={{ fontSize: '0.75rem' }}
                        >
                          Manage Review
                        </button>
                        
                          <button
                            className="btn btn-sm btn-outline-warning w-100 py-1"
                            onClick={(e) => { e.stopPropagation(); handleEdit(item._id); }}
                            style={{ fontSize: '0.75rem' }}
                          >
                            Edit Product
                          </button>
                          <button
                            className="btn btn-sm btn-danger w-100 py-1"
                            onClick={(e) => e.stopPropagation()}
                            style={{ fontSize: '0.75rem' }}
                          >
                            Delete Product
                          </button>
                        </div>
                      
                    ) : (
                      <>
                        {item.productStock !== 0 ? (
                          <button
                            className="btn btn-sm btn-success w-100"
                            onClick={(e) => { e.stopPropagation(); clickPlaceOrder(item._id); }}
                          >
                            Place Order
                          </button>
                        ) : (
                          <button className="btn btn-sm bg-light text-danger w-100 border disabled" style={{ fontSize: '0.8rem' }}>
                            Out of stock
                          </button>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination Buttons */}
      {productData.length > 0 && (
        <div className="mt-4 mb-2 d-flex align-items-center justify-content-center">
          <button
            disabled={currentPage === 1}
            onClick={() => {
              pageNo(- 1);
            }}
            className="btn btn-secondary me-2"
          >
            Back
          </button>

          <span>{currentPage} page of {totalPage}</span>

          <button
            disabled={currentPage === totalPage}
            onClick={() => {
              pageNo(+ 1);
            }}
            className="btn btn-primary ms-2"
          >
            Next
          </button>
        </div>
      )}

    </>
  );
}

