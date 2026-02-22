import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import axios from 'axios';
import { Button } from '../components/ui/button.jsx';
import { Badge } from '../components/ui/badge.jsx';
import { formatDistanceToNow } from 'date-fns';

const BACKEND_URL = 'https://qanda-2.onrender.com';
const API = `${BACKEND_URL}/api`;

const Home = () => {
  const [questions, setQuestions] = useState([]);
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const searchQuery = searchParams.get('search');
  const tagFilter = searchParams.get('tag');

  useEffect(() => {
    fetchQuestions();
    fetchTags();
  }, [searchQuery, tagFilter]);

  const fetchQuestions = async () => {
    try {
      const params = {};
      if (searchQuery) params.search = searchQuery;
      if (tagFilter) params.tag = tagFilter;

      const response = await axios.get(`${API}/questions`, { params });
      setQuestions(response.data);
    } catch (error) {
      console.error('Failed to fetch questions:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTags = async () => {
    try {
      const response = await axios.get(`${API}/tags`);
      setTags(response.data);
    } catch (error) {
      console.error('Failed to fetch tags:', error);
    }
  };

  const handleTagClick = (tag) => {
    navigate(`/?tag=${encodeURIComponent(tag)}`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[hsl(0,0%,4%)] text-[hsl(0,0%,63%)]">
        Loading questions...
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 md:px-8 lg:px-12 py-8 bg-[hsl(0,0%,4%)] text-[hsl(0,0%,93%)] min-h-screen">

      {/* Hero Section */}
      {!searchQuery && !tagFilter && (
        <div className="mb-12 text-center relative">
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] -z-10 pointer-events-none"
            style={{
              background:
                'radial-gradient(circle at 50% 0%, rgba(59,130,246,0.15) 0%, transparent 70%)',
            }}
          />
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
            Every question has{' '}
            <span className="text-[hsl(217,91%,60%)]">an answer</span>
          </h1>
        </div>
      )}

      {/* Filter Info */}
      {(searchQuery || tagFilter) && (
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">
                {searchQuery && `Search results for "${searchQuery}"`}
                {tagFilter && `Questions tagged with "${tagFilter}"`}
              </h2>
              <p className="text-[hsl(0,0%,63%)] mt-1">
                {questions.length} questions found
              </p>
            </div>
            <Button
              className="border border-[hsl(0,0%,15%)] hover:bg-[hsl(0,0%,10%)]"
              onClick={() => navigate('/')}
            >
              Clear filters
            </Button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* Main Content */}
        <div className="col-span-1 lg:col-span-8">

          {questions.length === 0 ? (
            <div className="text-center py-12 bg-[hsl(0,0%,7%)] border border-[hsl(0,0%,15%)] rounded-lg">
              <p className="text-[hsl(0,0%,63%)] mb-4">
                No questions yet. Be the first to ask!
              </p>
              {user && (
                <Button
                  onClick={() => navigate('/ask')}
                  className="bg-[hsl(217,91%,60%)] hover:bg-[hsl(217,91%,55%)] text-white"
                >
                  Ask a Question
                </Button>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              {questions.map((question) => (
                <QuestionCard
                  key={question.id}
                  question={question}
                  onTagClick={handleTagClick}
                />
              ))}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="hidden lg:block lg:col-span-4 space-y-6">

          {/* Popular Tags */}
          <div className="bg-[hsl(0,0%,7%)] border border-[hsl(0,0%,15%)] rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Popular Tags</h3>

            {tags.length === 0 ? (
              <p className="text-sm text-[hsl(0,0%,63%)]">No tags yet</p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <Badge
                    key={tag.name}
                    className="cursor-pointer bg-[hsl(0,0%,15%)] text-white hover:bg-[hsl(217,91%,60%)]/20 hover:text-[hsl(217,91%,60%)] transition-colors"
                    onClick={() => handleTagClick(tag.name)}
                  >
                    {tag.name}
                    <span className="ml-1.5 text-xs text-[hsl(0,0%,63%)]">
                      {tag.count}
                    </span>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Stats */}
          <div className="bg-[hsl(0,0%,7%)] border border-[hsl(0,0%,15%)] rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Community Stats</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-[hsl(0,0%,63%)]">
                  Questions
                </span>
                <span className="font-semibold text-[hsl(217,91%,60%)]">
                  {questions.length}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-[hsl(0,0%,63%)]">
                  Tags
                </span>
                <span className="font-semibold text-[hsl(217,91%,60%)]">
                  {tags.length}
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

const QuestionCard = ({ question, onTagClick }) => {
  const navigate = useNavigate();

  return (
    <div
      className="bg-[hsl(0,0%,7%)] border border-[hsl(0,0%,15%)] hover:border-[hsl(217,91%,60%)]/30 transition-all duration-300 rounded-lg p-6 cursor-pointer group"
      onClick={() => navigate(`/questions/${question.id}`)}
    >
      <div className="flex gap-6">

        {/* Stats */}
        <div className="flex flex-col items-center gap-4 text-center min-w-[80px]">
          <div>
            <div className="text-2xl font-bold text-[hsl(0,0%,93%)]">
              {question.votes}
            </div>
            <div className="text-xs text-[hsl(0,0%,63%)] uppercase tracking-wide">
              votes
            </div>
          </div>

          <div>
            <div className="text-2xl font-bold text-[hsl(173,70%,53%)]">
              {question.answer_count}
            </div>
            <div className="text-xs text-[hsl(0,0%,63%)] uppercase tracking-wide">
              answers
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1">
          <h3 className="text-xl font-semibold mb-2 group-hover:text-[hsl(217,91%,60%)] transition-colors">
            {question.title}
          </h3>

          <p className="text-[hsl(0,0%,63%)] text-sm mb-4 line-clamp-2">
            {question.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {question.tags.map((tag) => (
              <Badge
                key={tag}
                className="cursor-pointer bg-[hsl(0,0%,15%)] text-white hover:bg-[hsl(217,91%,60%)]/20 hover:text-[hsl(217,91%,60%)] transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  onTagClick(tag);
                }}
              >
                {tag}
              </Badge>
            ))}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between text-xs text-[hsl(0,0%,63%)]">
            <span>
              asked by{' '}
              <span className="font-medium text-[hsl(0,0%,93%)]">
                {question.username}
              </span>
            </span>
            <span>
              {formatDistanceToNow(new Date(question.created_at), {
                addSuffix: true,
              })}
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Home;