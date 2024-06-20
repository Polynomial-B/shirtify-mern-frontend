import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { toast } from "react-toastify";



export default function Wishlist() {

const [wishlist, setWishlist] = useState([]);


useEffect(() => {
    async function fetchWishlist() {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/api/wishlist', {
            headers: {Authorization: `Bearer ${token}`}
        });
        setWishlist(response.data);
      } catch (err) {
        toast.error('Error fetching wishlist');
      }
    }
    fetchWishlist();
  }, []);


return <>
        <h1>Wishlist Page</h1>

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
                          <div className="card-content">
                            <div className="media">
                              <div className="media-content">
                                <h2 className="title is-4">
                                  {wish.color}
                                </h2>
                              </div>
                            </div>
                          </div>
                          <div className="card-image">
                            <figure className="image is-4by3">
                              <img src={wish.frontDesign} alt={`picture of ${wish.color} shirt`} />
                            </figure>
                          </div>
                        </div>
                      </Link>
                    </div>
                  )
                })}
                </div>
                </div>
</>

}