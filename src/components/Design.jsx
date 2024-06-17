import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"


export default function Design() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        color: "",
        size: "",
        frontDesign: "",
        price: 15,
        // createdBy: user 
    });

    const [color, setColor] = useState("");
    const [frontDesign, setFrontDesign] = useState("");


    const formColors = ["white", "Black", "Red", "Green", "Grey", "Purple", "Pink", "Blue", "Yellow"];
    const formSizes = ["S", "M", "L"];

    const token = localStorage.getItem('token');
    console.log(token)

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            // const token = localStorage.getItem('token');
            const { data } = await axios.post('/api/shirts', formData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            console.log("DATAAA ------> ", data);
            toast.success("Shirt created and added to your wishlist!")
            navigate('/wishlist');
        } catch (err) {
            toast.error("Sorry, we have encountered an error!")
        }
    }
    function handleChange(e) {
        const newFormData = { ...formData, [e.target.name]: e.target.value };
        newFormData[e.target.name] = e.target.value
        setFormData(newFormData)
        // !
        // setFrontDesign()
    }

    return (
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
                                    <option key={color} value={color}>{color}</option>
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
                                    <option key={size} value={size}>{size}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Design</label>
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

                    <button className="button" type="submit">Create Shirt</button>
                </form>
            </div>
        </div>
    )
}