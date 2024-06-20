import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Wishlist from "./Wishlist";

export default function WishItem() {
    const { wishId } = useParams();
    const navigate= useNavigate();
    const [shirt, setShirt]= useState(null);
    const [color, setColor]= useState('')
    const [frontDesign, setFrontDesign] =useState('');
    const [size, setSize] = useState('')

    const formColors = [
      "White",
      "Black",
      "Red",
      "Green",
      "Grey",
      "Purple",
      "Pink",
      "Blue",
      "Yellow"
    ];

useEffect(()=> {
    async function fetchShirt() {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`/api/wishlist/${wishId}`, {
              headers: { Authorization: `Bearer ${token}` }
            });
            setShirt(response.data);
            setColor(response.data.color);
            setFrontDesign(response.data.frontDesign);
            setSize(response.data.size);
          } catch (err) {
            toast.error('Error fetching shirt');
          }
        }
        fetchShirt();
      }, [wishId]);



const handleDelete = async () => {
    try {
        const token =localStorage.getItem('token');
        await axios.delete(`/api/shirts/${wishId}`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          toast.success('Shirt deleted sucessfully');
          navigate('/wishlist');
        } catch {
            toast.error('Error deleting Shirt');
        }
}

const token = localStorage.getItem("token");

const user = JSON.parse(window.atob(token.split(".")[1]));
console.log(user.userId);



const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      await axios.put(`/api/shirts/${wishId}`, { color, frontDesign, size }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Shirt updated successfully');
      navigate('/wishlist');
    } catch (err) {
      toast.error('Error updating shirt');
    }
  };

    
    if(!shirt) {
        return <p> Loading...</p>
    }

    return (
        <>
          <h1>Edit Shirt</h1>
          <form>
            <div className="field">
              <label className="label">Color</label>
              <div className="control">
                <select
                  className="input" 
                  type="text" 
                  value={color} 
                  onChange={(e) => setColor(e.target.value)} 
                >
                <option value="">Select Color</option>
                  {formColors.map((color) => (
                    <option key={color} value={color}>
                      {color}
                    </option>
                  ))}
                  </select>
              </div>
            </div>
            <div className="field">
              <label className="label">Front Design</label>
              <div className="control">
                <input 
                  className="input" 
                  type="text" 
                  value={frontDesign} 
                  onChange={(e) => setFrontDesign(e.target.value)} 
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Size</label>
              <div className="control">
                <input 
                  className="input" 
                  type="text" 
                  value={size} 
                  onChange={(e) => setSize(e.target.value)} 
                />
              </div>
            </div>
            <div className="field is-grouped">
              <div className="control">
                <button onClick={handleSubmit} className="button is-link" type="submit">Save</button>
              </div>
              <div className="control">
                <button 
                  className="button is-danger" 
                  type="button" 
                  onClick={handleDelete}
                >
                  Delete
                </button>
              </div>
            </div>
          </form>
        </>
      );
    }
    