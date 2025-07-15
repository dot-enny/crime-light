import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from "react-leaflet";

import type { LatLngTuple } from "leaflet";
import L from 'leaflet';
import "leaflet/dist/leaflet.css"
import "../App.css"
import { dangerousLocations } from "../data";
import React from "react";

// --- Component for handling map interactions (e.g., click-to-fly) ---
function MapInteractions({ center, zoom }: { center: LatLngTuple; zoom: number }) {
    const map = useMap(); // Get the map instance

    // Event handler for general map clicks
    useMapEvents({
        click: (e) => {
            map.flyTo(e.latlng, map.getZoom(), {
                animate: true,
                duration: 1.5 // Animation duration in seconds
            });
            // Optionally, you could set a marker at the clicked location here
        },
    });

    // Effect to fly to a new center/zoom if props change (e.g., from an external button)
    React.useEffect(() => {
        if (center && zoom) {
            map.flyTo(center, zoom, {
                animate: true,
                duration: 1.5
            });
        }
    }, [center, zoom, map]); // Re-run effect if center, zoom, or map instance changes

    return null; // This component doesn't render anything directly
}

export const Home = () => {
    const defaultLagosCenter: LatLngTuple = [6.5244, 3.3792]; // A general center point for Lagos
    const [mapCenter, setMapCenter] = React.useState<LatLngTuple>(defaultLagosCenter);
    const [mapZoom, setMapZoom] = React.useState(11); // Initial zoom level

    L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
        iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    });
    const getSafetyColor = (rating: number) => {
        switch (rating) {
            case 1: return 'red';     // Very High Risk
            case 2: return 'orange';  // High Risk
            case 3: return 'yellow';  // Elevated Risk
            case 4: return 'lightgreen'; // Moderate Risk (if you add safer areas later)
            case 5: return 'green';   // Low Risk (if you add safer areas later)
            default: return 'gray';
        }
    };

    const getSafetyText = (rating: number) => {
        switch (rating) {
            case 1: return 'Very High Risk';
            case 2: return 'High Risk';
            case 3: return 'Elevated Risk';
            case 4: return 'Moderate Risk';
            case 5: return 'Low Risk';
            default: return 'Unknown Risk';
        }
    };

    // Function to call when a marker or an external button is clicked
    interface FlyToLocationArgs {
        lat: number;
        lng: number;
    }

    const flyToLocation = (coords: FlyToLocationArgs | LatLngTuple) => {
        // Accepts either a LatLngTuple or an object with lat/lng
        if (Array.isArray(coords)) {
            // Ensure the array is exactly two numbers
            setMapCenter([coords[0], coords[1]]);
        } else {
            setMapCenter([coords.lat, coords.lng]);
        }
        setMapZoom(14); // Zoom in a bit when flying to a specific location
    };


    return (
        <div className="flex flex-row h-[100vh] w-[100vw] overflow-x-hidden max-md:flex-col">
            {/* Optional: Add buttons to fly to specific locations */}
            <h3 className="md:text-lg md:mb-4 text-center md:hidden">Quick Fly To</h3>
            <div className="flex flex-wrap md:flex-col p-4 max-md:w-full w-[20%] min-w-0 items-center max-md:justify-center">
            <h3 className="md:text-lg md:mb-4 text-center max-md:hidden">Quick Fly To</h3>
                {dangerousLocations.slice(0, 5).map((loc) => ( // Show first 5 for brevity
                    <button
                        key={loc.name}
                        onClick={() => flyToLocation(loc.coordinates)}
                        className="m-1 max-md:w-fit md:px-2 md:py-3 p-1 cursor-pointer w-full box-border"
                    >
                        {loc.name}
                    </button>
                ))}
            </div>
            <div className="flex-1 md:w-[80%] min-w-0 overflow-hidden">
                <MapContainer center={mapCenter} zoom={mapZoom} scrollWheelZoom={true} style={{ width: '100%', height: '100%' }}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <MapInteractions center={mapCenter} zoom={mapZoom} />
                    {dangerousLocations.map((location, index) => (
                        <Marker
                            key={index}
                            position={location.coordinates}
                            // You could customize the icon color based on the safetyRating
                            icon={L.divIcon({
                                className: 'custom-div-icon',
                                html: `<div style="background-color:${getSafetyColor(location.safetyRating)}; width: 20px; height: 20px; border-radius: 50%; border: 2px solid white;"></div>`,
                                iconSize: [24, 24],
                                iconAnchor: [12, 12]
                            })}
                        >
                            <Popup>
                                <b>{location.name}</b><br />
                                Risk Level: <strong>{getSafetyText(location.safetyRating)}</strong><br />
                                {location.description}
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>
            </div>
        </div>
    )
};