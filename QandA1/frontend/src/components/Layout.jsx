import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Search, Plus, LogOut } from 'lucide-react';
import { useState } from 'react';

const Layout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-[hsl(0,0%,4%)] text-[hsl(0,0%,93%)]">
      
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-[hsl(0,0%,15%)/0.5] bg-[hsl(0,0%,4%)/0.95] backdrop-blur">
        
        <div className="container mx-auto px-4 md:px-8 lg:px-12">
          <div className="flex h-16 items-center justify-between">

            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-[hsl(217,91%,60%)] text-white font-bold text-xl">
                Q
              </div>
              <span className="font-bold text-xl tracking-tight hidden sm:inline-block">
                QuestionHub
              </span>
            </Link>

            {/* Search */}
            <form onSubmit={handleSearch} className="flex-1 max-w-md mx-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[hsl(0,0%,63%)]" />
                <Input
                  type="search"
                  placeholder="Search questions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 bg-[hsl(0,0%,15%)] border-[hsl(0,0%,15%)]"
                />
              </div>
            </form>

            {/* Actions */}
            <div className="flex items-center space-x-2">
              {user ? (
                <>
                  <Button
                    onClick={() => navigate('/ask')}
                    className="bg-[hsl(217,91%,60%)] text-white hover:opacity-90 transition-all hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    <span className="hidden sm:inline">Ask Question</span>
                  </Button>

                  <Button
                    variant="ghost"
                    onClick={() => navigate(`/users/${user.id}`)}
                    className="hover:bg-[hsl(173,70%,53%)/0.1]"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-[hsl(217,91%,60%)] text-white text-sm">
                        {user.username.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="ml-2 hidden md:inline">
                      {user.username}
                    </span>
                  </Button>

                  <Button
                    variant="ghost"
                    onClick={handleLogout}
                    className="hover:bg-[hsl(0,84%,60%)/0.1] hover:text-[hsl(0,84%,60%)]"
                  >
                    <LogOut className="h-4 w-4" />
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="ghost"
                    onClick={() => navigate('/login')}
                    className="hover:bg-[hsl(173,70%,53%)/0.1]"
                  >
                    Login
                  </Button>

                  <Button
                    onClick={() => navigate('/signup')}
                    className="bg-[hsl(217,91%,60%)] text-white hover:opacity-90"
                  >
                    Sign Up
                  </Button>
                </>
              )}
            </div>

          </div>
        </div>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;