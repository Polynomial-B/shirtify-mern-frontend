import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import '../../styles/Browse.css'
import { toast } from 'react-toastify'
import axios from 'axios'



export default function Browse () {
    const [shirts, setShirts]= useState([])
    const [shirtFilter, setShirtFilter]= useState('')
    const [selectedColor, setSelectedColor]= useState('')

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
    async function fetchShirts() {
        const resp = await fetch('/api/shirts')
        const data = await resp.json()
        setShirts(data)
      }
      fetchShirts()
      
    }, [])

    function filterShirts() {
        const filteredShirts = shirts.filter(shirt => {
          const color = shirt.color.toLowerCase()
          const filterText = shirtFilter.toLowerCase()
          return color.includes(filterText)
            && (selectedColor === '' || shirt.color === selectedColor)
        })
        return filteredShirts
      }
    
      function handleReset() {
        const resetShirtColor = ""
        setSelectedColor(resetShirtColor)
      }

      async function handleAddToWishlist(shirt) {
        try {
          console.log(shirt)
          const token = localStorage.getItem("token");
    
          const { data } = await axios.post("/api/shirts/browse", { shirt }, {
          headers: { Authorization: `Bearer ${token}` },
            
          });
          console.log("Data == ", data);
          toast.success("Added To Wishlist!")
        } catch{ 
          toast.error("Shirt Not Added")
 
          }
      }
      
      return (
        <>
          <div className="section">
            <div className="container">
              <h1 className="title">Discover Your Look</h1>
              <div className="controls">
                <select
                  className="input"
                  placeholder="Select Color.."
                  onChange={(event) => setSelectedColor(event.target.value)}
                  value={shirtFilter}
                >
                  <option value="">Select Color</option>
                  {formColors.map((color) => (
                    <option key={color} value={color}>
                      {color}
                    </option>
                  ))}
                </select>
                <button className="button is-danger" onClick={handleReset}>Reset</button>
              </div>
              <div className="browse-columns columns is-multiline is-mobile">
                {filterShirts().map((shirt, index) => {
                  return (
                    <div
                      onClick={()=> handleAddToWishlist(shirt)}
                      className="browse-column column is-one-third-desktop is-half-tablet is-half-mobile"
                      key={index}
                    >
                     
                        <div className="card">
                          <div className="card-content">
                            <div className="media">
                              <div className="media-content">
                                <h2 className="title is-4">{shirt.color}</h2>
                              </div>
                            </div>
                          </div>
                          <div className="card-image">
                            <figure className="image is-4by3">
                              <img src={shirt.frontDesign} alt={`picture of ${shirt.color} shirt`} />
                            </figure>
                          </div>
                        </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </>
      );
    }