export function StatusBadge({ status }: { status: string }) {
  const statusStyles: Record<string, string> = {
    pending: "badge-pending",
    approved: "badge-approved",
    rejected: "badge-rejected",
  };

  const statusLabels: Record<string, string> = {
    pending: "Pending",
    approved: "Approved",
    rejected: "Rejected",
  };

  return (
    <span className={`badge ${statusStyles[status] || "badge-pending"}`}>
      {statusLabels[status] || status}
    </span>
  );
}
