import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { toast } from "react-toastify";
import '../../styles/Wishlist.css'


export default function Wishlist() {
  const [wishlist, setWishlist] = useState([]);



  useEffect(() => {
    async function fetchWishlist() {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("/api/wishlist", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setWishlist(response.data);
      } catch (err) {
        toast.error("Error fetching wishlist");
      }
    }
    fetchWishlist();
  }, []);

  return (
    <>
      <h1 id="home-page-header" className="title is-1 has-text-weight-bold">Wishlist Page</h1>

      <div className="section">
        <div className="columns is-multiline is-mobile">
          {wishlist.map((wish, index) => {
            return (
              <div
                className="column is-one-third-desktop is-half-tablet is-half-mobile"
                key={index}
              >
                    <Link to={`/wishlist/${wish._id}`}>
                      <div className="card">
                        <div className="card-image">
                            <div
                              className="container t-shirt-container"
                              id={wish.color}
                            >
                              <div className="container image-overlay-container">
                                <img
                                  src={wish.frontDesign}
                                  alt={`picture of ${wish.color} shirt`}
                                />
                              </div>
                            </div>
                        </div>
                      </div>
                    </Link>
                  </div>

            );
          })}
        </div>
      </div>
    </>
  );
}
