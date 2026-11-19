import {
  Circle,
  CircleMarker,
  MapContainer,
  Popup,
  TileLayer,
  Tooltip,
  useMap,
} from "react-leaflet"
import { Link } from "react-router-dom"
import type { CategorySlug, Station } from "../data"
import { availableCount, statusLabels } from "../data"

function MapFocus({ station }: { station: Station }) {
  const map = useMap()
  map.flyTo(station.coordinates, 17, { duration: 0.6 })
  return null
}

export function StationMap({
  stations,
  selected,
  category,
  onSelect,
  showUser = true,
}: {
  stations: Station[]
  selected: Station
  category: CategorySlug | "all"
  onSelect: (station: Station) => void
  showUser?: boolean
}) {
  return (
    <MapContainer
      center={selected.coordinates}
      zoom={16}
      scrollWheelZoom
      className="station-map"
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapFocus station={selected} />
      {showUser && (
        <>
          <Circle
            center={[1.2964, 103.7754]}
            radius={90}
            pathOptions={{ color: "#4388d6", fillOpacity: 0.06, weight: 1 }}
          />
          <CircleMarker
            center={[1.2964, 103.7754]}
            radius={7}
            pathOptions={{
              color: "#fff",
              fillColor: "#4388d6",
              fillOpacity: 1,
              weight: 3,
            }}
          >
            <Tooltip direction="top">Illustrative current location</Tooltip>
          </CircleMarker>
        </>
      )}
      {stations.map((station) => {
        const bin =
          category === "all"
            ? undefined
            : station.bins.find((item) => item.category === category)
        const status =
          bin?.status ?? (availableCount(station) ? "available" : "unknown")
        const color =
          status === "available"
            ? "#176B45"
            : status === "nearly-full"
              ? "#C48419"
              : status === "full"
                ? "#C84F49"
                : "#7D8881"
        return (
          <CircleMarker
            center={station.coordinates}
            eventHandlers={{ click: () => onSelect(station) }}
            key={station.id}
            radius={selected.id === station.id ? 14 : 10}
            pathOptions={{
              color: "#fff",
              fillColor: color,
              fillOpacity: 1,
              weight: selected.id === station.id ? 4 : 3,
            }}
          >
            <Popup>
              <div className="map-popup">
                <span className="demo-label">Demo station</span>
                <strong>
                  {station.name} — {station.landmark}
                </strong>
                <p>
                  {availableCount(station)} of {station.bins.length} bins
                  available
                </p>
                {bin && (
                  <span>
                    {bin.label}: {statusLabels[bin.status]}
                  </span>
                )}
                <Link to={`/stations/${station.id}`}>View details</Link>
              </div>
            </Popup>
          </CircleMarker>
        )
      })}
    </MapContainer>
  )
}
