import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from "react-leaflet";

import type { LatLngTuple } from "leaflet";
import L from 'leaflet';
import "leaflet/dist/leaflet.css"
import "../App.css"
import { dangerousLocations } from "../data";
import React from "react";
import { useFirstLoadAnimation } from "../hooks/useFirstLoadAnimation";

// Custom hook to track window size for responsive behavior
function useWindowSize() {
    const [windowSize, setWindowSize] = React.useState({
        width: typeof window !== 'undefined' ? window.innerWidth : 1200,
        height: typeof window !== 'undefined' ? window.innerHeight : 800,
    });

    React.useEffect(() => {
        function handleResize() {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return windowSize;
}

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

export const MapView = () => {
    const { shouldAnimate, isVisible } = useFirstLoadAnimation({ alwaysAnimate: true });
    const defaultLagosCenter: LatLngTuple = [6.5244, 3.3792]; // A general center point for Lagos
    const windowSize = useWindowSize();
    
    // Responsive values based on screen size
    const isMobile = windowSize.width < 640;
    const isTablet = windowSize.width >= 640 && windowSize.width < 1024;
    
    // Set initial zoom based on screen size
    const getInitialZoom = () => {
        if (isMobile) return 10;
        if (isTablet) return 11;
        return 11;
    };
    
    const [mapCenter, setMapCenter] = React.useState<LatLngTuple>(defaultLagosCenter);
    const [mapZoom, setMapZoom] = React.useState(getInitialZoom());

    // Update zoom when screen size changes
    React.useEffect(() => {
        setMapZoom(getInitialZoom());
    }, [isMobile, isTablet]);

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
        // Use responsive zoom levels - closer zoom on mobile for better detail
        setMapZoom(isMobile ? 15 : 14);
    };


    return (
        <div className="flex flex-col h-full">
            {/* Responsive header with location buttons */}
            <div className={`bg-black ${
                shouldAnimate 
                    ? `transition-all duration-500 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`
                    : 'opacity-100 translate-y-0'
            }`}>
                <div className="flex flex-col sm:flex-row sm:items-center p-3 sm:p-4 bg-neutral-950 gap-3"
                    style={{
                        backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)`,
                        backgroundSize: "30px 30px",
                    }}
                >
                    <h3 className="text-white text-sm sm:text-base font-medium whitespace-nowrap mb-2 sm:mb-0 sm:mr-4">
                        Quick Fly To:
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {dangerousLocations.slice(0, 5).map((loc, index) => (
                            <button
                                key={loc.name}
                                onClick={() => flyToLocation(loc.coordinates)}
                                className={`text-white bg-neutral-800 hover:bg-neutral-700 transition-colors duration-200 
                                         px-3 py-2 text-xs sm:text-sm rounded-md border border-neutral-600
                                         whitespace-nowrap ${
                                    shouldAnimate 
                                        ? `transition-all duration-300 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`
                                        : 'opacity-100 translate-y-0'
                                }`}
                                style={shouldAnimate ? { transitionDelay: `${400 + index * 50}ms` } : {}}
                            >
                                {loc.name}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="flex-1 relative min-h-0">
                <MapContainer 
                    center={mapCenter} 
                    zoom={mapZoom} 
                    scrollWheelZoom={true}
                    className="w-full h-full absolute inset-0"
                    style={{ zIndex: 1 }}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <MapInteractions center={mapCenter} zoom={mapZoom} />
                    {dangerousLocations.map((location, index) => (
                        <Marker
                            key={index}
                            position={location.coordinates}
                            icon={L.divIcon({
                                className: 'custom-div-icon',
                                html: `<div style="background-color:${getSafetyColor(location.safetyRating)}; 
                                       width: ${isMobile ? '16px' : '20px'}; 
                                       height: ${isMobile ? '16px' : '20px'}; 
                                       border-radius: 50%; border: 2px solid white;"></div>`,
                                iconSize: isMobile ? [20, 20] : [24, 24],
                                iconAnchor: isMobile ? [10, 10] : [12, 12]
                            })}
                        >
                            <Popup>
                                <div className="text-sm max-w-xs">
                                    <b className={isMobile ? 'text-sm' : 'text-base'}>{location.name}</b><br />
                                    <span className="text-xs">Risk Level: <strong>{getSafetyText(location.safetyRating)}</strong></span><br />
                                    <span className="text-xs">{location.description}</span>
                                </div>
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>
            </div>
        </div>
    )
};