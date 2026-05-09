import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Mood Chart function generates chart based on mood data
function MoodChart({ entries }) {
  const moodCounts = Object.entries(
    entries.reduce((count, entry) => {
      count[entry.mood] = (count[entry.mood] || 0) + 1;
      return count;
    }, {})
  ).map(([mood, count]) => ({
    mood,
    count,
  }));

  // Handle Empty Chart
  if (entries.length === 0) {
    return (
      <section className="chart-section">
        <p>No chart data available yet.</p>
      </section>
    );
  }

  return (
    <section className="chart-section">
      <h2>Mood Frequency</h2>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={moodCounts}>
          <XAxis dataKey="mood" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="count" />
        </BarChart>
      </ResponsiveContainer>
    </section>
  );
}

export default MoodChart;