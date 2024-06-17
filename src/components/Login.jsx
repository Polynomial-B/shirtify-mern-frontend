import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Login() {

    const navigate = useNavigate()

    const [formData, setFormData] = useState ({
        username: "",
        password: "",
    })


    function handleChange (e) {
        const newFormData = structuredClone(formData)
        newFormData[e.target.name] = e.target.value
        setFormData(newFormData)
    }

    async function handleSubmit(e) {
        e.preventDefault()
        try {
          const { data } = await axios.post('/api/auth/login', formData)
          toast.success('Login successful');
          const token = data.token 
          
          localStorage.setItem('token', token)
          navigate('/shirts/browse')
        
        } catch (err) {
            console.log(err.response.data)
            toast.error('Login failed');
        }
    }


    return <div className="section">
      <div className="container">
        <form onSubmit ={handleSubmit}>
          <div className="field">
            <label className="label">Username</label>
            <div className="control">
              <input
                className="input"
                type="text"
                name={'username'}
                onChange={handleChange}
                value={formData.username}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Password</label>
            <div className="control">
              <input
                className="input"
                type="password"
                name={'password'}
                onChange={handleChange}
                value={formData.password}
              />
            </div>
          </div>
          <button className="button" type="submit"> Login</button>
        </form>
      </div>
    </div>
  }