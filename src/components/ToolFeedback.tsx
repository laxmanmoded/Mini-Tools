import React, { useState, useEffect } from 'react';
import { Star, MessageSquare, Send, Check, Trash2, ThumbsUp, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export interface FeedbackEntry {
  id: string;
  toolId: string;
  rating: number;
  userName: string;
  comment: string;
  tags: string[];
  date: string;
  helpfulCount: number;
  isUserSubmission?: boolean;
}

interface ToolFeedbackProps {
  toolId: string;
  toolName: string;
  darkMode: boolean;
}

const FEEDBACK_TAGS = [
  '⚡ Lightning Fast',
  '💎 High Resolution',
  '🔒 Privacy Respected',
  '✨ Clean Interface',
  '💡 Feature Request',
  '📱 Mobile Friendly'
];

export const ToolFeedback: React.FC<ToolFeedbackProps> = ({ toolId, toolName, darkMode }) => {
  const storageKey = `omnitool_feedback_${toolId}`;

  // Default seed community feedback for each tool
  const defaultFeedback: FeedbackEntry[] = [
    {
      id: `seed-1-${toolId}`,
      toolId,
      rating: 5,
      userName: 'Elena Rostova',
      comment: `Incredible utility. The speed and client-side processing make ${toolName} our go-to in daily production workflows.`,
      tags: ['⚡ Lightning Fast', '💎 High Resolution'],
      date: '2 days ago',
      helpfulCount: 14,
    },
    {
      id: `seed-2-${toolId}`,
      toolId,
      rating: 5,
      userName: 'Marcus Chen',
      comment: 'Super crisp export output and zero telemetry tracking. Works seamlessly right in the browser without friction.',
      tags: ['🔒 Privacy Respected', '✨ Clean Interface'],
      date: '5 days ago',
      helpfulCount: 9,
    }
  ];

  const [feedbackList, setFeedbackList] = useState<FeedbackEntry[]>([]);
  const [userRating, setUserRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [userName, setUserName] = useState<string>('');
  const [comment, setComment] = useState<string>('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [hasUserReview, setHasUserReview] = useState<boolean>(false);

  // Load from localStorage on toolId change
  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const parsed = JSON.parse(saved) as FeedbackEntry[];
        setFeedbackList(parsed);
        const existing = parsed.find(f => f.isUserSubmission);
        if (existing) {
          setHasUserReview(true);
          setUserRating(existing.rating);
          setComment(existing.comment);
          setSelectedTags(existing.tags);
          setUserName(existing.userName);
        } else {
          setHasUserReview(false);
          setComment('');
          setSelectedTags([]);
        }
      } else {
        setFeedbackList(defaultFeedback);
        setHasUserReview(false);
        setComment('');
        setSelectedTags([]);
      }
    } catch {
      setFeedbackList(defaultFeedback);
    }
    setSubmitted(false);
  }, [toolId]);

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userRating === 0) return;

    const newEntry: FeedbackEntry = {
      id: `user-${Date.now()}`,
      toolId,
      rating: userRating,
      userName: userName.trim() || 'You (Verified User)',
      comment: comment.trim() || 'Great experience using this utility!',
      tags: selectedTags,
      date: 'Just now',
      helpfulCount: 1,
      isUserSubmission: true,
    };

    // Filter out previous user review if updating
    const updated = [newEntry, ...feedbackList.filter(f => !f.isUserSubmission)];
    setFeedbackList(updated);
    setHasUserReview(true);
    setSubmitted(true);

    try {
      localStorage.setItem(storageKey, JSON.stringify(updated));
      confetti({ particleCount: 30, spread: 60, origin: { y: 0.85 } });
    } catch (err) {
      console.error('Failed to save feedback to localStorage', err);
    }
  };

  const handleDeleteUserReview = () => {
    const updated = feedbackList.filter(f => !f.isUserSubmission);
    setFeedbackList(updated);
    setHasUserReview(false);
    setSubmitted(false);
    setComment('');
    setSelectedTags([]);
    setUserRating(5);
    try {
      localStorage.setItem(storageKey, JSON.stringify(updated));
    } catch (err) {
      console.error(err);
    }
  };

  const handleHelpful = (id: string) => {
    const updated = feedbackList.map(item => {
      if (item.id === id) {
        return { ...item, helpfulCount: item.helpfulCount + 1 };
      }
      return item;
    });
    setFeedbackList(updated);
    try {
      localStorage.setItem(storageKey, JSON.stringify(updated));
    } catch (err) {
      console.error(err);
    }
  };

  // Compute rating metrics
  const totalCount = feedbackList.length;
  const avgRating = totalCount > 0 
    ? (feedbackList.reduce((acc, f) => acc + f.rating, 0) / totalCount).toFixed(1)
    : '5.0';

  const starCounts = [5, 4, 3, 2, 1].map(stars => ({
    stars,
    count: feedbackList.filter(f => f.rating === stars).length,
    percentage: totalCount > 0 
      ? Math.round((feedbackList.filter(f => f.rating === stars).length / totalCount) * 100) 
      : 0
  }));

  return (
    <div className={`mt-10 pt-8 border-t ${darkMode ? 'border-slate-800' : 'border-slate-200'} space-y-8`}>
      {/* Header section with ratings summary */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
            <h3 className={`text-base font-bold tracking-tight ${darkMode ? 'text-slate-100' : 'text-slate-900'}`}>
              Community Ratings & Feedback
            </h3>
          </div>
          <p className={`text-xs mt-0.5 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            Rate <span className="font-semibold">{toolName}</span> to help us improve performance and feature capabilities.
          </p>
        </div>

        {/* Global tool score badge */}
        <div className={`flex items-center gap-3 px-4 py-2 rounded-2xl border ${
          darkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <div className="flex items-center gap-1">
            <span className={`text-2xl font-extrabold font-mono tabular-nums ${darkMode ? 'text-slate-100' : 'text-slate-900'}`}>
              {avgRating}
            </span>
            <span className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>/ 5</span>
          </div>
          <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star
                key={s}
                className={`w-3.5 h-3.5 ${
                  s <= Math.round(Number(avgRating)) 
                    ? 'text-amber-400 fill-amber-400' 
                    : darkMode ? 'text-slate-700' : 'text-slate-300'
                }`}
              />
            ))}
          </div>
          <span className={`text-xs font-mono tabular-nums ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            ({totalCount} reviews)
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Interactive Rating & Submission Form (7 cols) */}
        <div className={`lg:col-span-7 p-6 rounded-2xl border ${
          darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
        } space-y-5`}>
          <div className="flex items-center justify-between">
            <h4 className={`text-xs font-semibold uppercase tracking-wider ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
              {hasUserReview ? 'Your Submitted Review' : 'Rate this Utility'}
            </h4>
            {hasUserReview && (
              <button
                type="button"
                onClick={handleDeleteUserReview}
                className="flex items-center gap-1 text-xs text-rose-500 hover:text-rose-600 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete Review</span>
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Interactive 5-Star Selection */}
            <div>
              <label className={`block text-xs font-medium mb-1.5 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                Overall Score
              </label>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setUserRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="p-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-transform hover:scale-110"
                      aria-label={`Rate ${star} stars`}
                    >
                      <Star
                        className={`w-6 h-6 transition-colors ${
                          star <= (hoverRating || userRating)
                            ? 'text-amber-400 fill-amber-400'
                            : darkMode ? 'text-slate-700' : 'text-slate-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
                <span className={`text-xs font-semibold ml-2 ${darkMode ? 'text-amber-400' : 'text-amber-600'}`}>
                  {userRating === 5 && 'Outstanding ★★★★★'}
                  {userRating === 4 && 'Very Good ★★★★☆'}
                  {userRating === 3 && 'Average ★★★☆☆'}
                  {userRating === 2 && 'Needs Work ★★☆☆☆'}
                  {userRating === 1 && 'Poor ★☆☆☆☆'}
                </span>
              </div>
            </div>

            {/* Quick Tag Selectors */}
            <div>
              <label className={`block text-xs font-medium mb-1.5 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                Feedback Tags (Click to select)
              </label>
              <div className="flex flex-wrap gap-1.5">
                {FEEDBACK_TAGS.map((tag) => {
                  const isSelected = selectedTags.includes(tag);
                  return (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => toggleTag(tag)}
                      className={`px-3 py-1 text-xs rounded-lg transition-all ${
                        isSelected
                          ? 'bg-indigo-600 text-white font-medium shadow-sm'
                          : darkMode
                          ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {tag}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* User Name input (optional) */}
            <div>
              <label className={`block text-xs font-medium mb-1 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                Your Name / Handle (Optional)
              </label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="e.g. Sarah Jenkins or @frontend_dev"
                className={`w-full px-3.5 py-2 rounded-xl text-xs border focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-colors ${
                  darkMode 
                    ? 'bg-slate-950 border-slate-700 text-slate-100 placeholder-slate-500' 
                    : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400'
                }`}
              />
            </div>

            {/* Comment Textarea */}
            <div>
              <label className={`block text-xs font-medium mb-1 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                Detailed Feedback or Suggestion
              </label>
              <textarea
                rows={3}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder={`How was your experience generating or processing with ${toolName}?`}
                className={`w-full px-3.5 py-2.5 rounded-xl text-xs border focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-colors ${
                  darkMode 
                    ? 'bg-slate-950 border-slate-700 text-slate-100 placeholder-slate-500' 
                    : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400'
                }`}
              />
            </div>

            {/* Submit Action */}
            <div className="flex items-center justify-between pt-2">
              <span className={`text-[11px] ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                Saved locally to browser state.
              </span>
              <button
                type="submit"
                className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl shadow-md shadow-indigo-600/20 transition-all"
              >
                {submitted ? <Check className="w-3.5 h-3.5" /> : <Send className="w-3.5 h-3.5" />}
                <span>{hasUserReview ? 'Update Feedback' : 'Submit Rating'}</span>
              </button>
            </div>
          </form>
        </div>

        {/* Right Column: Breakdown & Community Reviews Feed (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          {/* Rating Breakdown Bars */}
          <div className={`p-5 rounded-2xl border ${
            darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
          } space-y-2.5`}>
            <h4 className={`text-xs font-semibold uppercase tracking-wider mb-2 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
              Rating Distribution
            </h4>
            {starCounts.map(({ stars, count, percentage }) => (
              <div key={stars} className="flex items-center gap-2 text-xs">
                <span className={`w-12 font-mono tabular-nums ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                  {stars} Stars
                </span>
                <div className={`flex-1 h-2 rounded-full overflow-hidden ${darkMode ? 'bg-slate-800' : 'bg-slate-200'}`}>
                  <div
                    className="h-full bg-amber-400 rounded-full transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className={`w-8 text-right font-mono tabular-nums ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                  {percentage}%
                </span>
              </div>
            ))}
          </div>

          {/* Recent Reviews List */}
          <div className="space-y-3">
            <h4 className={`text-xs font-semibold uppercase tracking-wider ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Recent Community Reviews ({feedbackList.length})
            </h4>

            <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
              {feedbackList.map((entry) => (
                <div
                  key={entry.id}
                  className={`p-4 rounded-xl border transition-all ${
                    entry.isUserSubmission
                      ? darkMode
                        ? 'bg-indigo-950/20 border-indigo-500/30'
                        : 'bg-indigo-50/50 border-indigo-200'
                      : darkMode
                      ? 'bg-slate-900/40 border-slate-800/80'
                      : 'bg-white border-slate-200 shadow-sm'
                  } space-y-2`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                        entry.isUserSubmission 
                          ? 'bg-indigo-600 text-white' 
                          : darkMode ? 'bg-slate-800 text-slate-300' : 'bg-slate-200 text-slate-700'
                      }`}>
                        {entry.userName.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className={`text-xs font-semibold ${darkMode ? 'text-slate-200' : 'text-slate-800'}`}>
                            {entry.userName}
                          </span>
                          {entry.isUserSubmission && (
                            <span className="text-[10px] text-indigo-400 font-medium">· You</span>
                          )}
                        </div>
                        <span className={`text-[10px] ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                          {entry.date}
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star
                          key={s}
                          className={`w-3 h-3 ${
                            s <= entry.rating
                              ? 'text-amber-400 fill-amber-400'
                              : darkMode ? 'text-slate-800' : 'text-slate-200'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <p className={`text-xs leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                    {entry.comment}
                  </p>

                  {/* Feedback Tags */}
                  {entry.tags && entry.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 pt-1">
                      {entry.tags.map((t, idx) => (
                        <span
                          key={idx}
                          className={`text-[10px] px-2 py-0.5 rounded ${
                            darkMode 
                              ? 'bg-slate-800/70 text-slate-300' 
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Helpful Button */}
                  <div className="flex items-center justify-end pt-1">
                    <button
                      onClick={() => handleHelpful(entry.id)}
                      className={`flex items-center gap-1 text-[11px] transition-colors ${
                        darkMode ? 'text-slate-400 hover:text-slate-200' : 'text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      <ThumbsUp className="w-3 h-3" />
                      <span>Helpful ({entry.helpfulCount})</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
