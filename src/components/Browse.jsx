import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'





export default function Browse () {
    const [shirts, setShirts]= useState([])
    const [shirtFilter, setShirtFilter]= useState('')
    const [selectedColor, setSelectedColor]= useState('')

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
          return name.includes(filterText)
            && (selectedColor === '' || shirt.color === selectedColor)
        })
        return filteredShirts
      }
    
      function getColors() {
        const mappedShirts= shirts.map(shirt => shirt.color)
        console.log(mappedShirts)
        const uniqShirts = new Set(mappedShirts)
        const arrayShirts = Array.from(uniqShirts)
        return arrayShirts
      }

    
    console.log(shirts)

    return (
        <>
          <div className="section">
            <div className="container">
              <input
                className="input"
                placeholder="Select Color.."
                onChange={(event) => setSelectedColor(event.target.value)}
                value={shirtFilter}
              />
              <h1>Take a look!</h1>
              <div className="columns is-multiline is-mobile">
                {filterShirts().map((shirt, index) => {
                  console.log(shirt)
                  return (
                    <div
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
                                <p className="subtitle is-4">
                                  {shirt.size}
                                </p>
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