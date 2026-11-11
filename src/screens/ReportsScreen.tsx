import { useNavigate } from 'react-router-dom'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'
import BottomNav from '../components/BottomNav'

const chartData = [
  { day: 'Mon', analyzed: 2 },
  { day: 'Tue', analyzed: 4 },
  { day: 'Wed', analyzed: 1 },
  { day: 'Thu', analyzed: 5 },
  { day: 'Fri', analyzed: 3 },
  { day: 'Sat', analyzed: 6 },
  { day: 'Sun', analyzed: 2 },
]

const sourceDiversityData = [
  { name: 'Major News', value: 35, color: '#8a1538' },
  { name: 'Fact-Check Sites', value: 28, color: '#aa304f' },
  { name: 'Academic', value: 18, color: '#debfc2' },
  { name: 'Social Media', value: 12, color: '#e9e0e0' },
  { name: 'Blogs / Other', value: 7, color: '#f0eded' },
]

const stats = [
  { label: 'Items Analyzed', value: '23', icon: 'search', trend: '+4', positive: true },
  { label: 'Pauses Taken', value: '18', icon: 'timer', trend: '+6', positive: true },
  { label: 'Habit Score', value: '88%', icon: 'psychology', trend: '+5%', positive: true },
  { label: 'Bias Flagged', value: '7', icon: 'warning', trend: '-2', positive: true },
]

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-inverse-surface text-inverse-on-surface text-caption-sm px-2 py-1 rounded-lg shadow-lg">
        <p className="font-bold">{label}</p>
        <p>{payload[0].value} analyzed</p>
      </div>
    )
  }
  return null
}

export default function ReportsScreen() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col min-h-dvh w-full bg-surface animate-fade-in">
      {/* Header */}
      <header className="px-margin pt-12 pb-4 bg-surface">
        <h1 className="font-serif font-bold text-headline-lg text-on-surface">Weekly Report</h1>
        <p className="text-body-md text-secondary mt-0.5">Sept 20 – Sept 26, 2026</p>
      </header>

      <main className="flex-1 overflow-y-auto pb-24 px-margin flex flex-col gap-5">

        {/* Motivational banner */}
        <div className="rounded-2xl bg-gradient-to-r from-primary-container to-surface-tint p-5 relative overflow-hidden">
          <div className="absolute -right-4 -bottom-4 w-24 h-24 rounded-full bg-primary/30 blur-2xl pointer-events-none" />
          <p className="text-caption-sm text-on-primary/70 font-bold uppercase tracking-widest mb-1">Your Progress</p>
          <p className="font-serif font-bold text-headline-sm text-on-primary leading-snug">
            You're in the top 12% of<br />critical thinkers this week! 🎯
          </p>
          <p className="text-body-md text-on-primary/80 mt-2">
            Keep questioning before sharing. Your habit score rose by 5%.
          </p>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 gap-space-sm">
          {stats.map((stat) => (
            <div key={stat.label} className="card p-space-md flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <div className="w-8 h-8 rounded-lg bg-secondary-container flex items-center justify-center text-primary-container">
                  <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>{stat.icon}</span>
                </div>
                <span className={`text-caption-sm font-bold rounded-full px-2 py-0.5 ${
                  stat.positive ? 'text-tertiary-container bg-tertiary-fixed/30' : 'text-error bg-error-container'
                }`}>
                  {stat.trend}
                </span>
              </div>
              <div className="mt-1">
                <span className="font-serif font-bold text-headline-md text-primary-container">{stat.value}</span>
                <p className="text-caption-sm text-secondary mt-0.5">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Daily analysis bar chart */}
        <section className="card p-space-md">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-body-md-bold text-on-surface">Daily Activity</h3>
            <span className="text-caption-lg text-secondary">This week</span>
          </div>
          <ResponsiveContainer width="100%" height={140}>
            <BarChart data={chartData} barSize={24} barCategoryGap="30%">
              <XAxis
                dataKey="day"
                tick={{ fontSize: 11, fill: '#635d5d', fontFamily: 'Plus Jakarta Sans' }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis hide />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(138,21,56,0.06)' }} />
              <Bar dataKey="analyzed" radius={[6, 6, 0, 0]}>
                {chartData.map((_entry, index) => (
                  <Cell
                    key={index}
                    fill={index === 5 ? '#8a1538' : '#debfc2'}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <p className="text-caption-sm text-secondary text-center mt-1">Saturday had your highest activity</p>
        </section>

        {/* Source diversity chart */}
        <section className="card p-space-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-body-md-bold text-on-surface">Source Diversity</h3>
            <span className="text-caption-lg text-secondary">23 sources</span>
          </div>
          {/* Horizontal bar chart */}
          <div className="flex flex-col gap-2.5">
            {sourceDiversityData.map((item) => (
              <div key={item.name} className="flex items-center gap-3">
                <span className="text-caption-sm text-secondary w-28 shrink-0">{item.name}</span>
                <div className="flex-1 h-2.5 bg-surface-container-high rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${item.value}%`, backgroundColor: item.color, border: item.color === '#f0eded' ? '1px solid #debfc2' : 'none' }}
                  />
                </div>
                <span className="text-caption-sm font-bold text-on-surface w-8 text-right shrink-0">{item.value}%</span>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 bg-surface-container-low rounded-xl flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px] text-primary-container" style={{ fontVariationSettings: "'FILL' 1" }}>tips_and_updates</span>
            <p className="text-caption-sm text-secondary flex-1">
              <strong className="text-on-surface">Tip:</strong> Try exploring more academic sources to diversify your information diet.
            </p>
          </div>
        </section>

        {/* CTA */}
        <button
          className="btn-primary mt-1"
          onClick={() => navigate('/share')}
        >
          <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>add_circle</span>
          Analyze New Content
        </button>

      </main>

      <BottomNav active="reports" />
    </div>
  )
}
