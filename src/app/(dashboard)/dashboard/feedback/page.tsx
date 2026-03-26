"use client";

import { useState, useEffect } from "react";

interface FeedbackEntry {
  id: number;
  rating: number;
  feedback: string | null;
  name: string | null;
  createdAt: string;
}

export default function FeedbackPage() {
  const [entries, setEntries] = useState<FeedbackEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/dashboard/feedback")
      .then((r) => r.json())
      .then((data) => {
        setEntries(data.feedback || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-400">
        Loading feedback...
      </div>
    );
  }

  return (
    <div className="max-w-4xl">
      <h1 className="text-2xl font-bold mb-1">Feedback</h1>
      <p className="text-gray-500 mb-8">
        All ratings and feedback from your kiosk customers.
      </p>

      {entries.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 px-5 py-16 text-center text-gray-400">
          No feedback yet. Once customers start using your kiosk, their
          responses will appear here.
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-left px-5 py-3 font-medium text-gray-500">
                  Rating
                </th>
                <th className="text-left px-5 py-3 font-medium text-gray-500">
                  Feedback
                </th>
                <th className="text-left px-5 py-3 font-medium text-gray-500">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {entries.map((entry) => (
                <tr key={entry.id}>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <svg
                          key={i}
                          className={`w-4 h-4 ${
                            i < entry.rating
                              ? "text-amber-400"
                              : "text-gray-200"
                          }`}
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                      ))}
                    </div>
                  </td>
                  <td className="px-5 py-4 text-gray-600">
                    {entry.feedback || (
                      <span className="text-gray-300 italic">
                        No comment
                      </span>
                    )}
                  </td>
                  <td className="px-5 py-4 text-gray-400 whitespace-nowrap">
                    {new Date(entry.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
