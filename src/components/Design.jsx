import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"


export default function Design() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState ({
        color: "",
        size: "",
        frontDesign: "",
    });

    const [color, setColor] = useState("");
    const [frontDesign, setFrontDesign] = useState("");


    const formColors = ["white", "black", "red", "green", "grey", "purple", "pink", "blue", "yellow"];
    const formSizes = ["S", "M", "L"];




    async function handleSubmit(e) {
        e.preventDefault();
        try {
        const token = localStorage.getItem('token');
        const { data } = await axios.post('/api/shirts', formData, {
            headers: {Authorization: `Bearer ${token}`}
        });
        console.log("DATAAA ------> ", data);
        toast.success("Shirt created and added to your wishlist!")
        navigate('/wishlist');
    } catch (err) {
        toast.error("Sorry, we have encountered an error!")
    }
    }
    function handleChange(e) {
        const newFormData = structuredClone(formData)
        newFormData[e.target.name] = e.target.value
        setFormData(newFormData)
      }
    return (
        <div className="section">
            <div className="container">
                <form onSubmit={handleSubmit}>
                    <div className="field">
                        <label className="label">Color</label>
                        <div className="control">
                            <input
                                className="input"
                                type="text"
                                name="color"
                                onChange={handleChange}
                                value={formData.color}
                            />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Select Image</label>
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
                    <div className="field">
                        <label className="label">Size</label>
                        <div className="control">
                            <input
                                className="input"
                                type="button"
                                name="size"
                                onChange={handleChange}
                                value={formData.size}
                            />
                        </div>
                    </div>

                    <button className="button" type="submit">Create Shirt</button>
                </form>
            </div>
        </div>
    )
}