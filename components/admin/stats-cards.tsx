import { BarChart3, CheckCircle2, Clock, XCircle } from "lucide-react";

interface StatsCardsProps {
  stats: {
    total: number;
    pending: number;
    approved: number;
    rejected: number;
  };
}

export function StatsCards({ stats }: StatsCardsProps) {
  const cards = [
    {
      label: "Total Bookings",
      value: stats.total,
      icon: BarChart3,
      iconColor: "var(--color-primary)",
      panelColor: "var(--color-approved-bg)",
      sublabel: "All requests",
    },
    {
      label: "Pending Requests",
      value: stats.pending,
      icon: Clock,
      iconColor: "var(--color-pending)",
      panelColor: "var(--color-pending-bg)",
      sublabel: "Needs review",
    },
    {
      label: "Approved",
      value: stats.approved,
      icon: CheckCircle2,
      iconColor: "var(--color-approved)",
      panelColor: "var(--color-approved-bg)",
      sublabel: "Confirmed",
    },
    {
      label: "Rejected",
      value: stats.rejected,
      icon: XCircle,
      iconColor: "var(--color-rejected)",
      panelColor: "var(--color-rejected-bg)",
      sublabel: "Declined",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">
      {cards.map((card) => (
        <div
          key={card.label}
          className="card p-5 sm:p-6"
          id={`stat-${card.label.toLowerCase().replace(/\s/g, "-")}`}
        >
          <div className="flex items-start justify-between mb-4">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: card.panelColor }}
            >
              <card.icon size={20} style={{ color: card.iconColor }} />
            </div>
          </div>

          <p className="text-3xl font-extrabold text-[var(--color-text)] leading-none">
            {card.value}
          </p>
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--color-text-light)] mt-3">
            {card.label}
          </p>
          <p className="text-xs text-[var(--color-text-muted)] mt-1">{card.sublabel}</p>
        </div>
      ))}
    </div>
  );
}
