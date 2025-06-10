import React, { useState } from 'react';

function SignupPage() {
  const [form, setForm] = useState({ email: '', password: '', role: 'regular' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      // Example API POST to register user
      const response = await fetch('http://localhost:5000/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await response.json();
      alert(data.message);
    } catch (error) {
      alert('Signup failed');
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up for Premium Access</h2>
      <form onSubmit={handleSignup}>
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <select name="role" onChange={handleChange}>
          <option value="regular">Regular</option>
          <option value="premium">Premium</option>
        </select>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignupPage;
