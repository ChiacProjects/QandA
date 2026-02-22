import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import axios from 'axios';
import { Button } from '../components/ui/button.jsx';
import { Input } from '../components/ui/input.jsx';
import { Label } from '../components/ui/label.jsx';
import { Textarea } from '../components/ui/textarea.jsx';
import { Badge } from '../components/ui/badge.jsx';
import { X } from 'lucide-react';
import { toast } from 'sonner';

const BACKEND_URL ='http://localhost:8001';
const API = `${BACKEND_URL}/api`;

const AskQuestion = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleAddTag = (e) => {
    e.preventDefault();
    const trimmedTag = tagInput.trim().toLowerCase();
    if (trimmedTag && !tags.includes(trimmedTag)) {
      setTags([...tags, trimmedTag]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (tags.length === 0) {
      toast.error('Please add at least one tag');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(`${API}/questions`, {
        title,
        description,
        tags,
      });
      toast.success('Question posted successfully!');
      navigate(`/questions/${response.data.id}`);
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Failed to post question');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 md:px-8 lg:px-12 py-8 bg-[hsl(0,0%,4%)] text-[hsl(0,0%,93%)] min-h-screen">
      <div className="max-w-3xl mx-auto">

        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight mb-2">
            Ask a Question
          </h1>
          <p className="text-[hsl(0,0%,63%)]">
            Be specific and imagine you're asking a question to another person
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Title */}
          <div className="bg-[hsl(0,0%,7%)] border border-[hsl(0,0%,15%)] rounded-lg p-6">
            <Label htmlFor="title" className="text-base font-semibold mb-2">
              Title
            </Label>
            <p className="text-sm text-[hsl(0,0%,63%)] mb-4">
              Be specific and imagine you're asking a question to another person
            </p>
            <Input
              id="title"
              placeholder="e.g., How do I implement authentication in React?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="bg-[hsl(0,0%,4%)] border-[hsl(0,0%,15%)] text-white"
            />
          </div>

          {/* Description */}
          <div className="bg-[hsl(0,0%,7%)] border border-[hsl(0,0%,15%)] rounded-lg p-6">
            <Label htmlFor="description" className="text-base font-semibold mb-2">
              Description
            </Label>
            <p className="text-sm text-[hsl(0,0%,63%)] mb-4">
              Include all the information someone would need to answer your question
            </p>
            <Textarea
              id="description"
              placeholder="Provide more details about your question..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows={8}
              className="bg-[hsl(0,0%,4%)] border-[hsl(0,0%,15%)] text-white resize-none"
            />
          </div>

          {/* Tags */}
          <div className="bg-[hsl(0,0%,7%)] border border-[hsl(0,0%,15%)] rounded-lg p-6">
            <Label htmlFor="tags" className="text-base font-semibold mb-2">
              Tags
            </Label>
            <p className="text-sm text-[hsl(0,0%,63%)] mb-4">
              Add up to 5 tags to describe what your question is about
            </p>

            <div className="flex gap-2 mb-4">
              <Input
                id="tags"
                placeholder="e.g., javascript, react, authentication"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleAddTag(e);
                  }
                }}
                disabled={tags.length >= 5}
                className="bg-[hsl(0,0%,4%)] border-[hsl(0,0%,15%)] text-white"
              />
              <Button
                type="button"
                onClick={handleAddTag}
                disabled={tags.length >= 5 || !tagInput.trim()}
                className="bg-[hsl(217,91%,60%)] hover:bg-[hsl(217,91%,55%)] text-white"
              >
                Add
              </Button>
            </div>

            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <Badge 
                    key={tag} 
                    className="px-3 py-1 bg-[hsl(0,0%,15%)] text-white"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="ml-2 hover:text-[hsl(0,84%,60%)]"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Submit */}
          <div className="flex gap-4">
            <Button
              type="submit"
              disabled={loading}
              className="bg-[hsl(217,91%,60%)] hover:bg-[hsl(217,91%,55%)] text-white shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              {loading ? 'Posting...' : 'Post Your Question'}
            </Button>

            <Button
              type="button"
              onClick={() => navigate('/')}
              className="bg-transparent border border-[hsl(0,0%,15%)] text-[hsl(0,0%,93%)] hover:bg-[hsl(0,0%,10%)]"
            >
              Cancel
            </Button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AskQuestion;