import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import logo from '../../assets/icon/logo.svg';
import Button from '../common/Button';
import { useAuth } from '../../api/hooks/useAuth';
import { isAuthenticated } from '../../utils/auth';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();
  const { login, loading, error } = useAuth();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    try {
      const data = await login({
        email: formData.email,
        password: formData.password,
        remember: rememberMe,
      });
      
      // Check if token was actually saved to storage (more reliable than checking response)
      const authenticated = isAuthenticated();
      
      if (!authenticated) {
        console.error('Login succeeded but token was not saved. Response:', data);
        setMessage('Login successful but authentication token not received. Please check console for details.');
        return;
      }

      // Optional: store user info if backend returns it
      if (data?.user) {
        localStorage.setItem('user', JSON.stringify(data.user));
      } else if (data?.data?.user) {
        localStorage.setItem('user', JSON.stringify(data.data.user));
      } else if (data?.result?.user) {
        localStorage.setItem('user', JSON.stringify(data.result.user));
      }
      
      setMessage('Login successful. Redirecting...');
      
      // Navigate immediately - token is already saved synchronously
      navigate('/dashboard', { replace: true });
    } catch (err) {
      // error state is set inside the hook; nothing else to do here
      console.error('Login error:', err);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <header className="w-full bg-white px-6 py-4 border-b border-gray-200">
        <div className="flex items-center">
          <img src={logo} alt="Aussie Mate" className="h-11 w-auto" />
        </div>
      </header>

      {/* Login Form */}
      <div className="flex-1 flex items-center justify-center p-4 bg-gray-100">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-xl p-6 md:p-8 border-2 border-[#8B92A620]">
            <form onSubmit={handleSubmit} className="space-y-6">
            {/* Logo */}
            <div className="flex items-center justify-center mb-6">
              <img src={logo} alt="Aussie Mate" className="h-16 w-auto" />
            </div>

            {/* Heading */}
            <h2 className="text-xl font-bold text-gray-800 mb-0 text-center">
              Sign in to your account
            </h2>
            <p className="text-sm md:text-base text-gray-500 font-medium text-center mb-6">
              Fill below details to get into it.
            </p>

            {error && (
              <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2">
                {error}
              </div>
            )}
            {message && (
              <div className="text-sm text-green-600 bg-green-50 border border-green-200 rounded-md px-3 py-2">
                {message}
              </div>
            )}

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-primary mb-2">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="text"
                placeholder="email@email.com"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-[#FCFCFC] border border-[#DBDFE9] rounded-lg outline-none focus:border-gray-400 transition-colors"
                required
              />
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-primary mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter Password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-[#FCFCFC] border border-[#DBDFE9] rounded-lg outline-none pr-12 focus:border-gray-400 transition-colors"
                  required
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none cursor-pointer"
                >
                  {showPassword ? (
                    <Eye className="w-5 h-5" />
                  ) : (
                    <EyeOff className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me Checkbox */}
            <div className="flex items-center">
              <input
                id="rememberMe"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700">
                Remember me
              </label>
            </div>

            {/* Sign In Button */}
            <Button
              type="submit"
              variant="primary"
              fullWidth
              size="md"
              className="rounded-[10px]"
              disabled={loading}
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </Button>
          </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;