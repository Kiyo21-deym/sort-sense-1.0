import {
  Accessibility,
  ArrowLeft,
  Check,
  Clock3,
  Info,
  Navigation,
  Route,
} from "lucide-react"
import { Link, Navigate, useParams } from "react-router-dom"
import { StationMap } from "../components/StationMap"
import { StatusBadge } from "../components/StatusBadge"
import { stations } from "../data"

export function StationPage() {
  const { id } = useParams()
  const station = stations.find((item) => item.id === id)
  if (!station) return <Navigate replace to="/find-bin" />

  return (
    <main className="station-page page-width">
      <Link className="back-link" to="/find-bin">
        <ArrowLeft size={16} /> Back to all stations
      </Link>
      <section className="station-hero">
        <div className="station-title">
          <span className="demo-label">Demo station details</span>
          <h1>
            {station.name} <em>— {station.landmark}</em>
          </h1>
          <p>{station.description}</p>
          <div className="station-meta">
            <span>
              <Route size={16} /> {station.distance} m away · {station.walkTime}{" "}
              min walk
            </span>
            <span>
              <Accessibility size={16} /> {station.accessibility}
            </span>
          </div>
          <div className="station-title-actions">
            <a
              className="button button-primary"
              href={`https://www.openstreetmap.org/directions?to=${station.coordinates[0]},${station.coordinates[1]}`}
              target="_blank"
              rel="noreferrer"
            >
              <Navigation size={16} /> Get Directions
            </a>
            <button className="button button-secondary">
              <Info size={16} /> Report an issue
            </button>
          </div>
        </div>
        <div className="station-mini-map">
          <StationMap
            stations={[station]}
            selected={station}
            category="all"
            onSelect={() => undefined}
            showUser
          />
        </div>
      </section>

      <section className="bins-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Live-state concept</span>
            <h2>Bins at this station</h2>
            <p>
              Status labels are given priority over percentages, with stale
              readings shown as unavailable.
            </p>
          </div>
          <span className="last-refresh">
            <Clock3 size={15} /> Prototype updated moments ago
          </span>
        </div>
        <div className="bin-detail-grid">
          {station.bins.map((bin) => (
            <article className="bin-detail-card" key={bin.id}>
              <div className="bin-detail-head">
                <div>
                  <span className={`category-dot cat-${bin.category}`} />
                  <div>
                    <span>{bin.id}</span>
                    <h3>{bin.label}</h3>
                  </div>
                </div>
                <StatusBadge status={bin.status} />
              </div>
              <div className="fill-reading">
                <div>
                  <span>Estimated fill level</span>
                  <strong>{bin.fill === null ? "—" : `${bin.fill}%`}</strong>
                </div>
                <div className="progress-track">
                  <i
                    className={`fill-${bin.status}`}
                    style={{ width: `${bin.fill ?? 0}%` }}
                  />
                </div>
                <small>
                  {bin.status === "unknown"
                    ? `Last report ${bin.updated} · reading may be stale`
                    : `Updated ${bin.updated}`}
                </small>
              </div>
              <div className="accepted-items">
                <strong>Accepted examples</strong>
                {bin.accepts.map((item) => (
                  <span key={item}>
                    <Check size={13} /> {item}
                  </span>
                ))}
              </div>
              <Link to={`/sorting-guide?category=${bin.category}`}>
                View category guidance
              </Link>
            </article>
          ))}
        </div>
      </section>
      <aside className="prototype-callout">
        <Info size={20} />
        <div>
          <strong>Illustrative information</strong>
          <p>
            Station names, locations, accepted items, and readings are mock data
            for UI/UX evaluation. Actual project teams should configure verified
            campus guidance.
          </p>
        </div>
      </aside>
    </main>
  )
}
