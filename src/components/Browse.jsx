import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'





export default function Browse () {
    const [shirts, setShirts]= useState([])
    const [shirtFilter, setShirtFilter]= useState('')
    const [selectedColor, setSelectedColor]= useState('')

    const formColors = [
        "white",
        "black",
        "red",
        "green",
        "grey",
        "purple",
        "pink",
        "blue",
        "yellow",
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



    return (
        <>
          <div className="section">
            <div className="container">
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
              <h1>Take a look!</h1>
              <div className="columns is-multiline is-mobile">
                {filterShirts().map((shirt, index) => {
                  return (
                    shirt.size === "M" && <div
                      className="column is-one-third-desktop is-half-tablet is-half-mobile"
                      key={index}
                    >
                      <Link to={`/api/shirts/${shirt._id}`}>
                        <div className="card">
                          <div className="card-content">
                            <div className="media">
                              <div className="media-content">
                                <h2 className="title is-4">
                                  {shirt.color}
                                </h2>
                              </div>
                            </div>
                          </div>
                          <div className="card-image">
                            <figure className="image is-4by3">
                              <img src={shirt.frontDesign} alt={`picture of ${shirt.color} shirt`} />
                            </figure>
                          </div>
                        </div>
                      </Link>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </>
      )
    }