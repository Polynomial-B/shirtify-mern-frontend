import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import '../../styles/Design.css'
import {baseUrl} from "../config"

export default function Design() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    color: "White",
    size: "M",
    frontDesign: "",
  });

  const [color, setColor] = useState("");

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
  const formSizes = ["S", "M", "L"];

    
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      const { data } = await axios.post(`${baseUrl}/shirts/design`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("Shirt created and added to your wishlist!");
      navigate("/wishlist");
    } catch (err) {
      toast.error("Sorry, we have encountered an error!");
    }
  }

  function handleChange(e) {
    const newFormData = structuredClone(formData);
    newFormData[e.target.name] = e.target.value;
    setFormData(newFormData);
    const colorToChange = formData.color
    setColor(colorToChange)
  }

  return (
    <>
    <h1 id="home-page-header" className="title is-1 has-text-weight-bold">Design a shirt!</h1>
    <div className="section">
    <div className="columns">
    <div className="column is-half">
    <div className="container t-shirt-container" id={formData.color}>
    <div className="container image-overlay-container">
    <img src={formData.frontDesign}/>
    </div>
    </div>
    </div>
    <div className="column is-half">
      <div className="section">
        <div className="container">
          <form onSubmit={handleSubmit}>
            <div className="field">
              <label className="label">Color</label>
              <div className="control">
                <select
                  className="input"
                  type="text"
                  name="color"
                  onChange={handleChange}
                  value={formData.color}
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
              <label className="label">Select Size</label>
              <div className="control">
                <select
                  className="input"
                  type="text"
                  name="size"
                  onChange={handleChange}
                  value={formData.size}
                >
                  <option value="">Select Size</option>
                  {formSizes.map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="field">
              <label className="label">Add URL for your design below:</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  name="frontDesign"
                  onChange={handleChange}
                  value={formData.frontDesign}
                  
                />
              </div>
            </div>

            <button className="button" type="submit">
              Create Shirt
            </button>
          </form>
        </div>
        </div>
        </div>
      </div>
      </div>
    </>
  );
}
