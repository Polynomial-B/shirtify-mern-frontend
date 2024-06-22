import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {baseUrl} from "../config"
import formColors from '../data/shirtColours'

export default function WishItem() {
    const { wishId } = useParams();
    const navigate= useNavigate();
    const [shirt, setShirt]= useState(null);
    const [color, setColor]= useState('')
    const [frontDesign, setFrontDesign] =useState('');
    const [size, setSize] = useState('')


useEffect(()=> {
    async function fetchShirt() {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${baseUrl}/wishlist/${wishId}`, {
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
        await axios.delete(`${baseUrl}/wishlist/${wishId}`, {
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



const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      await axios.put(`${baseUrl}/shirts/${wishId}`, { color, frontDesign, size }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Shirt updated successfully');
      navigate('/wishlist');
    } catch (err) {
      toast.error('Error updating shirt');
    }
  };

    return (
      <>
        <h1 id="home-page-header" className="title is-1 has-text-weight-bold">Edit yout shirt!</h1>
        <div className="section">
          <div className="columns">
            <div className="column is-half">
              <div className="container t-shirt-container" id={color}>
                <div className="container image-overlay-container">
                  <img src={frontDesign} />
                </div>
              </div>
            </div>
            <div className="column is-half">
              <div className="section">
                <div className="container"></div>
                <form onSubmit={handleSubmit}>
                  <div className="field">
                    <label className="label">Color</label>
                    <div className="control">
                      <select
                        className="input"
                        type="text"
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                      >
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
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
    