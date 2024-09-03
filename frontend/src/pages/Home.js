import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleSuccess, handleError } from "./utils";
import { ToastContainer } from "react-toastify";

const Home = () => {
  const navigate = useNavigate();
  const [loggedInUser, setLoggedInUser] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);

  useEffect(() => {
    setLoggedInUser(localStorage.getItem("loggedInUser"));
  }, []);

  const handleLogout = (e) => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    handleSuccess("User logged out");
    navigate("/login");
  };

  const fetchProduct = async () => {
    try {
      const url = "http://localhost:4000/product";
      const headers = {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      };

      const response = await fetch(url, headers);
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      const result = await response.json();
      setProducts(result);
    } catch (err) {
      // setError(err.message);
      handleError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <div>
      <h1>{loggedInUser}</h1>
      <button onClick={handleLogout}>Logout</button>
      <ul>
        {loading ? (
          <li>Loading...</li>
        ) : products.length > 0 ? (
          products.map((item) => (
            <li key={item.id}>
              {item.name} : {item.price}
            </li>
          ))
        ) : (
          <li>No products available</li>
        )}
      </ul>
      <ToastContainer />
    </div>
  );
};

export default Home;
