import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

const NewProduct = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const productId = searchParams.get("id");
  const nameRef = useRef();
  const categoryRef = useRef();
  const shortRef = useRef();
  const longRef = useRef();
  const imagesRef = useRef();
  const priceRef = useRef();
  const stockRef = useRef();
  const [product, setProduct] = useState();
  useEffect(() => {
    const fetchProduct = async () => {
      const response = await fetch(
        `https://asm3-nodejs-backend.onrender.com/products/getDetail?id=${productId}`
      );
      const responseData = await response.json();
      if (!response.ok) {
        alert(responseData.message);
        return;
      }
      setProduct(responseData.product);
    };
    if (productId) {
      fetchProduct();
    }
  }, []);
  const updateProduct = async (e) => {
    if (
      nameRef.current.value &&
      categoryRef.current.value &&
      shortRef.current.value &&
      longRef.current.value &&
      priceRef.current.value &&
      stockRef.current.value
    ) {
      e.preventDefault();
      try {
        const response = await fetch(
          "https://asm3-nodejs-backend.onrender.com/products/updateProduct",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              productId: productId,
              name: nameRef.current.value,
              category: categoryRef.current.value,
              short_desc: shortRef.current.value,
              long_desc: longRef.current.value,
              price: priceRef.current.value,
              stock: stockRef.current.value,
            }),
          }
        );
        if (!response.ok) {
          const responseData = await response.json();
          alert(responseData.message);
          return;
        }
        alert("Update product successful!");
      } catch (err) {
        alert(err);
      }
    }
  };
  const postProduct = async (e) => {
    if (
      nameRef.current.value &&
      categoryRef.current.value &&
      shortRef.current.value &&
      longRef.current.value &&
      priceRef.current.value &&
      stockRef.current.value
    ) {
      e.preventDefault();
      const formData = new FormData();
      formData.append("name", nameRef.current.value);
      formData.append("category", categoryRef.current.value);
      formData.append("short_desc", shortRef.current.value);
      formData.append("long_desc", longRef.current.value);
      formData.append("price", priceRef.current.value);
      formData.append("stock", stockRef.current.value);
      Array.from(imagesRef.current.files).forEach((file) => {
        formData.append("images", file);
      });
      try {
        const response = await fetch(
          "https://asm3-nodejs-backend.onrender.com/products/postProduct",
          {
            method: "POST",
            body: formData,
          }
        );
        if (!response.ok) {
          const responseData = await response.json();
          alert(responseData.message);
          return;
        }
        alert("Add product successfully!");
      } catch (err) {
        console.log(err);
      }
    } else {
      alert("Please fill in all fields!");
    }
  };
  return (
    <div
      style={{
        marginTop: "60px",
        width: "82%",
        float: "right",
      }}
    >
      <div className="page-breadcrumb">
        <div className="row">
          <form style={{ width: "50%", marginLeft: "40px" }}>
            <div className="form-group">
              <label>Product Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Product Name"
                defaultValue={product && product.name}
                ref={nameRef}
              />
            </div>
            <div className="form-group">
              <label>Category</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Category"
                ref={categoryRef}
                defaultValue={product && product.category}
              />
            </div>
            <div class="form-group">
              <label>Short Description</label>
              <textarea
                className="form-control"
                rows="3"
                placeholder="Enter Short Description"
                ref={shortRef}
                defaultValue={product && product.short_desc}
              ></textarea>
            </div>
            <div class="form-group">
              <label>Long Description</label>
              <textarea
                className="form-control"
                rows="6"
                placeholder="Enter Long Description"
                ref={longRef}
                defaultValue={product && product.long_desc}
              ></textarea>
            </div>
            <div className="form-group">
              <label>Price</label>
              <input
                type="number"
                className="form-control"
                placeholder="Enter Price"
                ref={priceRef}
                defaultValue={product && product.price}
              />
            </div>
            <div className="form-group">
              <label>Number in stock</label>
              <input
                type="number"
                className="form-control"
                placeholder="Enter Price"
                ref={stockRef}
                defaultValue={product && product.stock}
              />
            </div>
            {!product && (
              <div class="form-group">
                <label for="exampleFormControlFile1">
                  Upload image (5 images)
                </label>
                <input
                  type="file"
                  className="form-control-file"
                  id="exampleFormControlFile1"
                  multiple
                  ref={imagesRef}
                />
              </div>
            )}
            <button
              type="submit"
              className="btn btn-primary"
              onClick={(e) => {
                if (product) {
                  updateProduct(e);
                } else {
                  postProduct(e);
                }
              }}
            >
              {product ? "Update" : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewProduct;
