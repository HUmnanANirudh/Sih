import { useState } from 'react';
import axios from 'axios';

const SignUp = () => {
  const [formData, setFormData] = useState({
    Firstname: '',
    Lastname: '',
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
      const response = await axios.post('http://localhost:6969/api/v1/user/signup', formData);
      console.log(response.data);
    } catch (error) {
      console.error('Sign up error:', error.response?.data);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="Firstname" value={formData.Firstname} onChange={handleChange} placeholder="First Name" required />
      <input name="Lastname" value={formData.Lastname} onChange={handleChange} placeholder="Last Name" required />
      <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
      <input name="Username" value={formData.Username} onChange={handleChange} placeholder="Username" required />
      <input name="password" type="password" value={formData.password} onChange={handleChange} placeholder="Password" required />
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignUp;
