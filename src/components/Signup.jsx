import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify'
import '../../styles/Signup.css'

export default function Signup() {

    const navigate = useNavigate()

    const [formData, setFormData] = useState ({
        username: "",
        email: "",
        password: "",
        passwordConfirmation: "",
    });

  

    function handleChange (e) {
        const newFormData = structuredClone(formData);
        newFormData[e.target.name] = e.target.value;
        setFormData(newFormData);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            await axios.post('/api/auth/signup', formData);
            toast.success('Signup successful');
            navigate('/auth/login');
            
        } catch (err) {
            // console.log(err.response.data);
            toast.error('Signup failed');
        }
    }
    return (
      <div className="signup-section section" id="signup-section">
          <div className="container" id="signup-container">
              <form onSubmit={handleSubmit} id="signup-form">
                  <div className="field" id="username-field">
                      <label className="label" htmlFor="username" id="username-label">Username</label>
                      <div className="control" id="username-control">
                          <input
                              className="input"
                              type="text"
                              name="username"
                              id="username-input"
                              onChange={handleChange}
                              value={formData.username}
                          />
                      </div>
                  </div>
                  <div className="field" id="email-field">
                      <label className="label" htmlFor="email" id="email-label">Email</label>
                      <div className="control" id="email-control">
                          <input
                              className="input"
                              type="text"
                              name="email"
                              id="email-input"
                              onChange={handleChange}
                              value={formData.email}
                          />
                      </div>
                  </div>
                  <div className="field" id="password-field">
                      <label className="label" htmlFor="password" id="password-label">Password</label>
                      <div className="control" id="password-control">
                          <input
                              className="input"
                              type="password"
                              name="password"
                              id="password-input"
                              onChange={handleChange}
                              value={formData.password}
                          />
                      </div>
                  </div>
                  <div className="field" id="passwordConfirmation-field">
                      <label className="label" htmlFor="passwordConfirmation" id="passwordConfirmation-label">Confirm password</label>
                      <div className="control" id="passwordConfirmation-control">
                          <input
                              className="input"
                              type="password"
                              name="passwordConfirmation"
                              id="passwordConfirmation-input"
                              onChange={handleChange}
                              value={formData.passwordConfirmation}
                          />
                      </div>
                  </div>
                  <button className="button" type="submit" id="submit-button">Submit</button>
              </form>
          </div>
          
      </div>
  );
}