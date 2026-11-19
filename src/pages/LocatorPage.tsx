import {
  ArrowDownUp,
  ArrowRight,
  Check,
  ChevronDown,
  Crosshair,
  Info,
  ListFilter,
  MapPin,
  Navigation,
  Search,
  SlidersHorizontal,
} from "lucide-react"
import { useMemo, useState } from "react"
import { Link, useSearchParams } from "react-router-dom"
import { StationMap } from "../components/StationMap"
import { StatusBadge } from "../components/StatusBadge"
import {
  availableCount,
  categories,
  stations,
  type CategorySlug,
  type Station,
} from "../data"

export function LocatorPage() {
  const [params, setParams] = useSearchParams()
  const initialCategory = params.get("category") as CategorySlug | null
  const [category, setCategory] = useState<CategorySlug | "all">(
    categories.some((item) => item.slug === initialCategory)
      ? initialCategory!
      : "all",
  )
  const [selected, setSelected] = useState<Station>(stations[0])
  const [query, setQuery] = useState("")
  const [sort, setSort] = useState<"nearest" | "availability">("nearest")
  const [locationEnabled, setLocationEnabled] = useState(false)

  const filtered = useMemo(() => {
    const result = stations.filter((station) => {
      const matchesSearch = `${station.name} ${station.landmark}`
        .toLowerCase()
        .includes(query.toLowerCase())
      return (
        matchesSearch &&
        (category === "all" ||
          station.bins.some((bin) => bin.category === category))
      )
    })
    return result.sort((a, b) => {
      if (sort === "availability") return availableCount(b) - availableCount(a)
      if (category !== "all") {
        const aBin = a.bins.find((bin) => bin.category === category)
        const bBin = b.bins.find((bin) => bin.category === category)
        const rank = { available: 0, "nearly-full": 1, unknown: 2, full: 3 }
        if (aBin && bBin && rank[aBin.status] !== rank[bBin.status])
          return rank[aBin.status] - rank[bBin.status]
      }
      return a.distance - b.distance
    })
  }, [category, query, sort])

  const recommendation = filtered.find((station) =>
    category === "all"
      ? availableCount(station) > 0
      : station.bins.find((bin) => bin.category === category)?.status ===
        "available",
  )

  const changeCategory = (value: CategorySlug | "all") => {
    setCategory(value)
    if (value === "all") setParams({})
    else setParams({ category: value })
  }

  return (
    <main className="locator-page">
      <div className="locator-header page-width">
        <div>
          <span className="demo-label">
            Interactive UI prototype · demo data
          </span>
          <h1>Find the right bin nearby.</h1>
          <p>
            Choose what you’re disposing of, then compare suitability and
            availability.
          </p>
        </div>
        <div className="location-state">
          <Info size={16} />
          <span>
            Distances are illustrative until a real location service is
            connected.
          </span>
        </div>
      </div>

      <div className="locator-toolbar page-width">
        <label className="search-field">
          <Search size={19} />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search a building, landmark, or location..."
          />
          <span className="key-hint">⌘ K</span>
        </label>
        <button
          className={`button near-me ${locationEnabled ? "active" : ""}`}
          onClick={() => setLocationEnabled((value) => !value)}
        >
          <Crosshair size={17} />{" "}
          {locationEnabled ? "Demo location on" : "Near Me"}
        </button>
      </div>

      <div
        className="category-bar page-width"
        aria-label="Waste category filters"
      >
        <button
          className={category === "all" ? "active" : ""}
          onClick={() => changeCategory("all")}
        >
          <ListFilter size={15} /> All waste
        </button>
        {categories.map((item) => (
          <button
            className={category === item.slug ? "active" : ""}
            key={item.slug}
            onClick={() => changeCategory(item.slug)}
          >
            <span style={{ background: item.color }} /> {item.name}
          </button>
        ))}
      </div>

      <section className="locator-workspace">
        <div className="station-panel">
          <div className="panel-summary">
            <div>
              <strong>{filtered.length} stations</strong>
              <span>Illustrative campus area</span>
            </div>
            <label>
              <ArrowDownUp size={14} />
              <select
                value={sort}
                onChange={(event) =>
                  setSort(event.target.value as "nearest" | "availability")
                }
              >
                <option value="nearest">Nearest first</option>
                <option value="availability">Best availability</option>
              </select>
              <ChevronDown size={13} />
            </label>
          </div>
          <div className="station-scroll">
            {recommendation && (
              <article className="recommendation-card">
                <span className="recommendation-label">
                  <Check size={13} /> Recommended
                  {category !== "all" ? ` for ${category}` : ""}
                </span>
                <h2>
                  {recommendation.name} — {recommendation.landmark}
                </h2>
                <p>
                  {recommendation.distance} m away · {recommendation.walkTime}{" "}
                  min walk
                </p>
                <strong>
                  The nearest demo station with a confirmed available option.
                </strong>
                <button onClick={() => setSelected(recommendation)}>
                  View on map <ArrowRight size={15} />
                </button>
              </article>
            )}
            {filtered.map((station) => {
              const relevant =
                category === "all"
                  ? station.bins
                  : station.bins.filter((bin) => bin.category === category)
              return (
                <article
                  className={`station-card ${
                    selected.id === station.id ? "selected" : ""
                  }`}
                  key={station.id}
                  onClick={() => setSelected(station)}
                >
                  <div className="station-card-head">
                    <div>
                      <span className="station-pin">
                        <MapPin size={17} />
                      </span>
                      <div>
                        <h2>{station.name}</h2>
                        <p>{station.landmark}</p>
                      </div>
                    </div>
                    <span className="distance-label">{station.distance} m</span>
                  </div>
                  <div className="availability-summary">
                    <strong>
                      {availableCount(station)} of {station.bins.length} bins
                      available
                    </strong>
                    <span>
                      {station.walkTime} min walk · {station.bins.length}{" "}
                      categories
                    </span>
                  </div>
                  <div className="mini-bin-list">
                    {relevant.slice(0, 3).map((bin) => (
                      <div key={bin.id}>
                        <span>{bin.label}</span>
                        <StatusBadge status={bin.status} />
                      </div>
                    ))}
                  </div>
                  <div className="station-actions">
                    <Link to={`/stations/${station.id}`}>View details</Link>
                    <a
                      href={`https://www.openstreetmap.org/directions?to=${station.coordinates[0]},${station.coordinates[1]}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Navigation size={14} /> Directions
                    </a>
                  </div>
                </article>
              )
            })}
            {!filtered.length && (
              <div className="empty-state">
                <SlidersHorizontal />
                <h2>No stations found in this area.</h2>
                <p>Clear your search or choose another category.</p>
                <button
                  onClick={() => {
                    setQuery("")
                    changeCategory("all")
                  }}
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="map-panel">
          <StationMap
            stations={filtered.length ? filtered : stations}
            selected={selected}
            category={category}
            onSelect={setSelected}
            showUser={locationEnabled}
          />
          <div className="map-demo-notice">
            Demo locations for prototype review
          </div>
          <div className="map-selected-preview">
            <span>
              <MapPin size={16} />
            </span>
            <div>
              <strong>{selected.name}</strong>
              <small>
                {selected.landmark} · {selected.distance} m
              </small>
            </div>
            <Link to={`/stations/${selected.id}`}>
              Details <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
