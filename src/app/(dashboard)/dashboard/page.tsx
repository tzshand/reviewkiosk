import { getSupabase } from "@/lib/db";
import { TABLES } from "@/lib/db/schema";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function DashboardOverview() {
  const session = await getSession();
  if (!session) redirect("/login");

  const supabase = getSupabase();

  const { data: business } = await supabase
    .from(TABLES.businesses)
    .select("*")
    .eq("id", session.businessId)
    .single();

  const { data: allFeedback } = await supabase
    .from(TABLES.feedback)
    .select("id, rating")
    .eq("business_id", session.businessId);

  const totalFeedback = allFeedback?.length ?? 0;
  const avgRating =
    totalFeedback > 0
      ? (
          allFeedback!.reduce((sum, f) => sum + f.rating, 0) / totalFeedback
        ).toFixed(1)
      : null;

  const { data: recentFeedback } = await supabase
    .from(TABLES.feedback)
    .select("*")
    .eq("business_id", session.businessId)
    .order("created_at", { ascending: false })
    .limit(5);

  const kioskUrl = `/k/${business?.hash}`;

  return (
    <div className="max-w-4xl">
      <h1 className="text-2xl font-bold mb-1">Dashboard</h1>
      <p className="text-gray-500 mb-8">
        Welcome back, {business?.name || "Business Owner"}
      </p>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <p className="text-sm text-gray-500 mb-1">Total Feedback</p>
          <p className="text-3xl font-bold">{totalFeedback}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <p className="text-sm text-gray-500 mb-1">Average Rating</p>
          <p className="text-3xl font-bold">{avgRating ?? "—"}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <p className="text-sm text-gray-500 mb-1">Kiosk URL</p>
          <p className="text-sm font-mono text-amber-600 break-all">
            {kioskUrl}
          </p>
        </div>
      </div>

      {/* Recent Feedback */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="px-5 py-4 border-b border-gray-100">
          <h2 className="font-semibold">Recent Feedback</h2>
        </div>
        {!recentFeedback || recentFeedback.length === 0 ? (
          <div className="px-5 py-12 text-center text-gray-400">
            No feedback yet. Once customers use your kiosk, their feedback will
            appear here.
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {recentFeedback.map((entry) => (
              <div key={entry.id} className="px-5 py-4">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-1">
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
                  <span className="text-xs text-gray-400">
                    {new Date(entry.created_at).toLocaleDateString()}
                  </span>
                </div>
                {entry.feedback && (
                  <p className="text-sm text-gray-600">{entry.feedback}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
