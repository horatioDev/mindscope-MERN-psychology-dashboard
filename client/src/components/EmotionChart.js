import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function EmotionChart({ entries }) {
  const emotionCounts = Object.entries(
    entries.reduce((count, entry) => {
      const emotion = entry.emotion || "Not analyzed";
      count[emotion] = (count[emotion] || 0) + 1;
      return count;
    }, {})
  ).map(([emotion, count]) => ({
    emotion,
    count,
  }));

  if (entries.length === 0) {
    return (
      <section className="chart-section">
        <p>No emotion data available yet.</p>
      </section>
    );
  }

  return (
    <section className="chart-section">
      <h2>Emotion Frequency</h2>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={emotionCounts}>
          <XAxis dataKey="emotion" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="count" />
        </BarChart>
      </ResponsiveContainer>
    </section>
  );
}

export default EmotionChart;