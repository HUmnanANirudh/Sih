import { useState } from 'react';
import axios from 'axios';

const SignIn = () => {
  const [isEmail, setIsEmail] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    Username: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = isEmail ? '/signin/email' : '/signin/username';
      const response = await axios.post(url, formData);
      console.log(response.data);
    } catch (error) {
      console.error('Sign in error:', error.response?.data);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        <input type="radio" checked={isEmail} onChange={() => setIsEmail(true)} /> Email
      </label>
      <label>
        <input type="radio" checked={!isEmail} onChange={() => setIsEmail(false)} /> Username
      </label>
      {isEmail ? (
        <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
      ) : (
        <input name="Username" value={formData.Username} onChange={handleChange} placeholder="Username" required />
      )}
      <input name="password" type="password" value={formData.password} onChange={handleChange} placeholder="Password" required />
      <button type="submit">Sign In</button>
    </form>
  );
};

export default SignIn;
