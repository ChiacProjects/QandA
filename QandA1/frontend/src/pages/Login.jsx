import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { Button } from '../components/ui/button.jsx';
import { Input } from '../components/ui/input.jsx';
import { Label } from '../components/ui/label.jsx';
import { toast } from 'sonner';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await login(email, password);
      toast.success('Welcome back!');
      navigate('/');
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Failed to login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[hsl(0,0%,4%)] text-[hsl(0,0%,93%)]">
      
      <div className="w-full max-w-md">
        <div className="bg-[hsl(0,0%,7%)] border border-[hsl(0,0%,15%)] rounded-lg p-8 shadow-2xl">
          
          <div className="text-center mb-8">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-lg 
              bg-[hsl(217,91%,60%)] text-[hsl(0,0%,100%)] 
              font-bold text-3xl mb-4">
              Q
            </div>

            <h1 className="text-3xl font-bold tracking-tight mb-2">
              Welcome Back
            </h1>

            <p className="text-[hsl(0,0%,63%)]">
              Sign in to continue to QuestionHub
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-[hsl(0,0%,4%)] border-[hsl(0,0%,15%)] text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-[hsl(0,0%,4%)] border-[hsl(0,0%,15%)] text-white"
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full 
                bg-[hsl(217,91%,60%)] 
                hover:bg-[hsl(217,91%,55%)] 
                text-[hsl(0,0%,100%)]
                shadow-[0_0_20px_rgba(59,130,246,0.3)]
                transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>

          </form>

          <div className="mt-6 text-center text-sm">
            <span className="text-[hsl(0,0%,63%)]">
              Don't have an account? 
            </span>
            <Link 
              to="/signup" 
              className="ml-1 text-[hsl(217,91%,60%)] hover:underline font-medium"
            >
              Sign up
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Login;