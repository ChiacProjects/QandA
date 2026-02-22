import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import axios from 'axios';
import { Button } from '../components/ui/button.jsx';
import { Textarea } from '../components/ui/textarea.jsx';
import { Badge } from '../components/ui/badge.jsx';
import { Avatar, AvatarFallback } from '../components/ui/avatar.jsx';
import { ThumbsUp, ThumbsDown, Check } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { toast } from 'sonner';

const BACKEND_URL = 'http://localhost:8001';
const API = `${BACKEND_URL}/api`;

const QuestionDetail = () => {
  const { id } = useParams();
  const [question, setQuestion] = useState(null);
  const [answerContent, setAnswerContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    fetchQuestion();
  }, [id]);

  const fetchQuestion = async () => {
    try {
      const response = await axios.get(`${API}/questions/${id}`);
      setQuestion(response.data);
    } catch (error) {
      toast.error('Question not found');
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  const handleVoteQuestion = async (vote) => {
    if (!user) return toast.error('Please login to vote');
    try {
      const res = await axios.post(`${API}/questions/${id}/vote`, { vote });
      setQuestion({ ...question, votes: res.data.votes, user_voted: res.data.user_voted });
    } catch {
      toast.error('Failed to vote');
    }
  };

  const handleVoteAnswer = async (answerId, vote) => {
    if (!user) return toast.error('Please login to vote');
    try {
      const res = await axios.post(`${API}/answers/${answerId}/vote`, { vote });
      setQuestion({
        ...question,
        answers: question.answers.map((a) =>
          a.id === answerId ? { ...a, votes: res.data.votes, user_voted: res.data.user_voted } : a
        ),
      });
    } catch {
      toast.error('Failed to vote');
    }
  };

  const handleAcceptAnswer = async (answerId) => {
    try {
      await axios.post(`${API}/answers/${answerId}/accept`);
      toast.success('Answer accepted!');
      fetchQuestion();
    } catch (err) {
      toast.error(err.response?.data?.detail || 'Failed to accept answer');
    }
  };

  const handleSubmitAnswer = async (e) => {
    e.preventDefault();
    if (!user) return toast.error('Please login to answer');

    setSubmitting(true);
    try {
      await axios.post(`${API}/questions/${id}/answers`, { content: answerContent });
      toast.success('Answer posted!');
      setAnswerContent('');
      fetchQuestion();
    } catch {
      toast.error('Failed to post answer');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[hsl(0,0%,4%)] text-[hsl(0,0%,63%)]">
        Loading question...
      </div>
    );
  }

  if (!question) return null;

  const isQuestionOwner = user && user.id === question.user_id;

  return (
    <div className="container mx-auto px-4 md:px-8 lg:px-12 py-8 bg-[hsl(0,0%,4%)] text-[hsl(0,0%,93%)] min-h-screen">
      <div className="max-w-4xl mx-auto">

        {/* Question */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            {question.title}
          </h1>

          <div className="flex gap-4 text-sm text-[hsl(0,0%,63%)] mb-6">
            <span>
              Asked {formatDistanceToNow(new Date(question.created_at), { addSuffix: true })}
            </span>
            <span>{question.answer_count} answers</span>
            <span>{question.votes} votes</span>
          </div>

          <div className="bg-[hsl(0,0%,7%)] border border-[hsl(0,0%,15%)] rounded-lg p-6">
            <div className="flex gap-4">

              {/* Voting */}
              <div className="flex flex-col items-center gap-2">
                <Button
                  onClick={() => handleVoteQuestion(question.user_voted === 1 ? 0 : 1)}
                  className={`hover:bg-[hsl(173,70%,53%)]/10 ${
                    question.user_voted === 1 ? 'text-[hsl(173,70%,53%)]' : ''
                  }`}
                >
                  <ThumbsUp className="h-6 w-6" />
                </Button>

                <span className="text-2xl font-bold">
                  {question.votes}
                </span>

                <Button
                  onClick={() => handleVoteQuestion(question.user_voted === -1 ? 0 : -1)}
                  className={`hover:bg-[hsl(0,84%,60%)]/10 ${
                    question.user_voted === -1 ? 'text-[hsl(0,84%,60%)]' : ''
                  }`}
                >
                  <ThumbsDown className="h-6 w-6" />
                </Button>
              </div>

              {/* Content */}
              <div className="flex-1">
                <p className="whitespace-pre-wrap mb-6">
                  {question.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {question.tags.map((tag) => (
                    <Badge
                      key={tag}
                      className="bg-[hsl(0,0%,15%)] text-white hover:bg-[hsl(217,91%,60%)]/20 hover:text-[hsl(217,91%,60%)]"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Author */}
                <div className="flex items-center gap-3 bg-[hsl(217,91%,60%)]/5 border border-[hsl(217,91%,60%)]/20 rounded-md p-4 w-fit ml-auto">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-[hsl(217,91%,60%)] text-white">
                      {question.username.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="text-xs text-[hsl(0,0%,63%)]">asked by</div>
                    <div
                      className="font-medium cursor-pointer hover:text-[hsl(217,91%,60%)]"
                      onClick={() => navigate(`/users/${question.user_id}`)}
                    >
                      {question.username}
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* Answers */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">
            {question.answers.length} {question.answers.length === 1 ? 'Answer' : 'Answers'}
          </h2>

          <div className="space-y-6">
            {question.answers.map((answer) => (
              <div
                key={answer.id}
                className={`bg-[hsl(0,0%,7%)] rounded-lg p-6 border ${
                  answer.is_accepted
                    ? 'border-[hsl(173,70%,53%)] shadow-[0_0_20px_rgba(45,212,191,0.2)]'
                    : 'border-[hsl(0,0%,15%)]'
                }`}
              >
                <div className="flex gap-4">

                  {/* Voting */}
                  <div className="flex flex-col items-center gap-2">
                    <Button
                      onClick={() =>
                        handleVoteAnswer(answer.id, answer.user_voted === 1 ? 0 : 1)
                      }
                      className={`hover:bg-[hsl(173,70%,53%)]/10 ${
                        answer.user_voted === 1 ? 'text-[hsl(173,70%,53%)]' : ''
                      }`}
                    >
                      <ThumbsUp className="h-6 w-6" />
                    </Button>

                    <span className="text-2xl font-bold">
                      {answer.votes}
                    </span>

                    <Button
                      onClick={() =>
                        handleVoteAnswer(answer.id, answer.user_voted === -1 ? 0 : -1)
                      }
                      className={`hover:bg-[hsl(0,84%,60%)]/10 ${
                        answer.user_voted === -1 ? 'text-[hsl(0,84%,60%)]' : ''
                      }`}
                    >
                      <ThumbsDown className="h-6 w-6" />
                    </Button>

                    {isQuestionOwner && (
                      <Button
                        onClick={() => handleAcceptAnswer(answer.id)}
                        disabled={answer.is_accepted}
                        className={`mt-2 ${
                          answer.is_accepted
                            ? 'text-[hsl(173,70%,53%)]'
                            : 'hover:text-[hsl(173,70%,53%)]'
                        }`}
                      >
                        <Check className="h-8 w-8" />
                      </Button>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    {answer.is_accepted && (
                      <div className="flex items-center gap-2 text-[hsl(173,70%,53%)] mb-4">
                        <Check className="h-5 w-5" />
                        <span className="font-semibold">Accepted Answer</span>
                      </div>
                    )}

                    <p className="whitespace-pre-wrap mb-6">
                      {answer.content}
                    </p>

                    <div className="flex items-center gap-3 bg-[hsl(0,0%,15%)] rounded-md p-4 w-fit ml-auto">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-[hsl(217,91%,60%)] text-white">
                          {answer.username.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="text-xs text-[hsl(0,0%,63%)]">
                          answered{' '}
                          {formatDistanceToNow(new Date(answer.created_at), {
                            addSuffix: true,
                          })}
                        </div>
                        <div
                          className="font-medium cursor-pointer hover:text-[hsl(217,91%,60%)]"
                          onClick={() => navigate(`/users/${answer.user_id}`)}
                        >
                          {answer.username}
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Answer Form */}
        {user ? (
          <div className="bg-[hsl(0,0%,7%)] border border-[hsl(0,0%,15%)] rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Your Answer</h3>
            <form onSubmit={handleSubmitAnswer}>
              <Textarea
                placeholder="Write your answer here..."
                value={answerContent}
                onChange={(e) => setAnswerContent(e.target.value)}
                required
                rows={6}
                className="bg-[hsl(0,0%,4%)] border-[hsl(0,0%,15%)] resize-none mb-4 text-white"
              />
              <Button
                type="submit"
                disabled={submitting}
                className="bg-[hsl(217,91%,60%)] hover:bg-[hsl(217,91%,55%)] text-white shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all hover:scale-[1.02]"
              >
                {submitting ? 'Posting...' : 'Post Your Answer'}
              </Button>
            </form>
          </div>
        ) : (
          <div className="bg-[hsl(0,0%,7%)] border border-[hsl(0,0%,15%)] rounded-lg p-6 text-center">
            <p className="text-[hsl(0,0%,63%)] mb-4">
              You must be logged in to answer
            </p>
            <Button
              onClick={() => navigate('/login')}
              className="bg-[hsl(217,91%,60%)] hover:bg-[hsl(217,91%,55%)] text-white"
            >
              Sign In
            </Button>
          </div>
        )}

      </div>
    </div>
  );
};

export default QuestionDetail;