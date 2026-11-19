import { AlertTriangle, CheckCircle2, CircleHelp, CircleX } from "lucide-react"
import { statusLabels, type Availability } from "../data"

export function StatusBadge({ status }: { status: Availability }) {
  const Icon =
    status === "available"
      ? CheckCircle2
      : status === "nearly-full"
        ? AlertTriangle
        : status === "full"
          ? CircleX
          : CircleHelp
  return (
    <span className={`status-badge status-${status}`}>
      <Icon size={13} />
      {statusLabels[status]}
    </span>
  )
}
