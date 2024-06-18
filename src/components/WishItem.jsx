import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Wishlist from "./Wishlist";

export default function WishItem() {
    const { id } = useParams();
    const navigate= useNavigate();
    const [shirt, setshirt]= useState(null);
    const [color, setColor]= useState('')
    const [frontDesign, setFrontDesign] =useState('');
    const [size, setSize] = useState('')

useEffect(()=> {
    async function fetchShirt() {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`/api/shirts/${id}`, {
              headers: { Authorization: `Bearer ${token}` }
            });
            setshirt(response.data);
            setColor(response.data.color);
            setFrontDesign(response.data.frontDesign);
            setSize(response.data.size);
          } catch (err) {
            toast.error('Error fetching shirt');
          }
        }
        fetchShirt();
      }, [id]);

const handleDelete = async () => {
    try {
        const token =localStorage.getItem('token');
        await axios.delete(`/api/shirts/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          toast.success('Shirt deleted sucessfully');
          navigate('/wishlist');
        } catch {
            toast.error('Error deleting Shirt');
        }
}



const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.put(`/api/shirts/${id}`, { color, frontDesign, size }, {
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
          <form onSubmit={handleSubmit}>
            <div className="field">
              <label className="label">Color</label>
              <div className="control">
                <input 
                  className="input" 
                  type="text" 
                  value={color} 
                  onChange={(e) => setColor(e.target.value)} 
                />
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
                <button className="button is-link" type="submit">Save</button>
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
    