import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Avatar, AvatarFallback } from '../components/ui/avatar.jsx';
import { Badge } from '../components/ui/badge.jsx';
import { formatDistanceToNow } from 'date-fns';

const BACKEND_URL = 'https://qanda-2.onrender.com';
const API = `${BACKEND_URL}/api`;

const UserProfile = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserData();
  }, [id]);

  const fetchUserData = async () => {
    try {
      const [userResponse, questionsResponse] = await Promise.all([
        axios.get(`${API}/users/${id}`),
        axios.get(`${API}/questions`),
      ]);

      setUser(userResponse.data);
      const userQuestions = questionsResponse.data.filter(q => q.user_id === id);
      setQuestions(userQuestions);
    } catch (error) {
      console.error('Failed to fetch user data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] bg-[hsl(0,0%,4%)] text-[hsl(0,0%,63%)]">
        Loading profile...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[hsl(0,0%,4%)] text-white flex items-center justify-center">
        <p className="text-[hsl(0,0%,63%)]">User not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[hsl(0,0%,4%)] text-white px-4 md:px-8 lg:px-12 py-8">
      <div className="max-w-4xl mx-auto">

        {/* Profile Header */}
        <div className="bg-[hsl(0,0%,7%)] border border-[hsl(0,0%,15%)] rounded-lg p-8 mb-8">

          <div className="flex items-start gap-6">

            <Avatar className="h-24 w-24">
              <AvatarFallback className="bg-[hsl(217,91%,60%)] text-white text-3xl">
                {user.username.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <h1 className="text-3xl font-bold tracking-tight mb-2">
                {user.username}
              </h1>

              <p className="text-[hsl(0,0%,63%)] mb-4">
                {user.email}
              </p>

              <div className="flex items-center gap-10">

                <div>
                  <div className="text-3xl font-bold text-[hsl(217,91%,60%)]">
                    {user.reputation}
                  </div>
                  <div className="text-sm text-[hsl(0,0%,63%)]">
                    Reputation
                  </div>
                </div>

                <div>
                  <div className="text-3xl font-bold">
                    {questions.length}
                  </div>
                  <div className="text-sm text-[hsl(0,0%,63%)]">
                    Questions
                  </div>
                </div>

              </div>

              <p className="text-sm text-[hsl(0,0%,63%)] mt-4">
                Member for {formatDistanceToNow(new Date(user.created_at))}
              </p>
            </div>
          </div>
        </div>

        {/* User Questions */}
        <div>
          <h2 className="text-2xl font-bold mb-6">
            Questions
          </h2>

          {questions.length === 0 ? (
            <div className="text-center py-12 bg-[hsl(0,0%,7%)] border border-[hsl(0,0%,15%)] rounded-lg">
              <p className="text-[hsl(0,0%,63%)]">
                No questions yet
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {questions.map((question) => (
                <div
                  key={question.id}
                  onClick={() => navigate(`/questions/${question.id}`)}
                  className="bg-[hsl(0,0%,7%)] border border-[hsl(0,0%,15%)] 
                             hover:border-[hsl(217,91%,60%)] 
                             transition-all duration-300 
                             rounded-lg p-6 cursor-pointer"
                >
                  <div className="flex gap-6">

                    <div className="flex gap-6 text-center">
                      <div>
                        <div className="text-xl font-bold">
                          {question.votes}
                        </div>
                        <div className="text-xs text-[hsl(0,0%,63%)]">
                          votes
                        </div>
                      </div>

                      <div>
                        <div className="text-xl font-bold text-[hsl(173,70%,53%)]">
                          {question.answer_count}
                        </div>
                        <div className="text-xs text-[hsl(0,0%,63%)]">
                          answers
                        </div>
                      </div>
                    </div>

                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-2 hover:text-[hsl(217,91%,60%)] transition-colors">
                        {question.title}
                      </h3>

                      <div className="flex flex-wrap gap-2 mb-2">
                        {question.tags.map((tag) => (
                          <Badge key={tag} className="bg-[hsl(0,0%,15%)] text-[hsl(0,0%,93%)] border-none">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <p className="text-xs text-[hsl(0,0%,63%)]">
                        {formatDistanceToNow(new Date(question.created_at), { addSuffix: true })}
                      </p>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default UserProfile;