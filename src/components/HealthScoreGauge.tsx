"use client";

interface HealthScoreGaugeProps {
  score: number;
  size?: number;
  label?: string;
}

export function HealthScoreGauge({ score, size = 120, label = "Health Score" }: HealthScoreGaugeProps) {
  const safeScore = Math.min(100, Math.max(0, Math.round(score)));
  const strokeWidth = 10;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (safeScore / 100) * circumference;

  let strokeColor = "#2563EB"; // brand blue (80+)
  let textColor = "text-blue-600";
  if (safeScore < 50) {
    strokeColor = "#EF4444"; // red
    textColor = "text-red-500";
  } else if (safeScore < 80) {
    strokeColor = "#F59E0B"; // yellow / amber
    textColor = "text-amber-500";
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
        <svg className="transform -rotate-90" width={size} height={size}>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#E2E8F0"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            fill="transparent"
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute flex flex-col items-center">
          <span className={`text-2xl font-black tracking-tight ${textColor}`}>{safeScore}</span>
          <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">/100</span>
        </div>
      </div>
      {label && <span className="mt-2 text-xs font-semibold text-slate-700">{label}</span>}
    </div>
  );
}
