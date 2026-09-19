type Props = { value: number; size?: number; stroke?: number; label?: string }
export function ScoreRing({ value, size = 92, stroke = 9, label }: Props) {
  const radius = (size - stroke) / 2
  const circumference = 2 * Math.PI * radius
  const dash = (value / 100) * circumference
  return <div className="score-ring" style={{ width: size, height: size }}>
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-label={`${value}% ${label ?? 'score'}`}>
      <circle className="ring-track" cx={size / 2} cy={size / 2} r={radius} strokeWidth={stroke} />
      <circle className="ring-value" cx={size / 2} cy={size / 2} r={radius} strokeWidth={stroke} strokeDasharray={`${dash} ${circumference - dash}`} />
    </svg>
    <span>{value}<small>%</small></span>
  </div>
}
