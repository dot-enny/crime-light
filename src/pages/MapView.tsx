import { MapContainer, TileLayer, Marker, Popup, Polygon, useMap, useMapEvents } from "react-leaflet";

import type { LatLngTuple } from "leaflet";
import L from 'leaflet';
import "leaflet/dist/leaflet.css"
import "../App.css"
import { dangerousLocations } from "../data";
import React from "react";
import { useFirstLoadAnimation } from "../modules/shared/hooks/useFirstLoadAnimation";
import { CrimeFilter, CrimeTypeBadge } from "../components/CrimeFilter";
import { CRIME_TYPES, getUniqueCrimeTypes, filterLocationsByCrimeType } from "../utils/crimeTypes";

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

// --- Component for handling Lagos-specific map interactions and restrictions ---
function LagosMapInteractions({ center, zoom, bounds }: { 
    center: LatLngTuple; 
    zoom: number; 
    bounds: { north: number; south: number; east: number; west: number; }
}) {
    const map = useMap();

    // Event handler for map clicks with Lagos boundary restrictions
    useMapEvents({
        click: (e) => {
            const { lat, lng } = e.latlng;
            
            // Check if click is within Lagos bounds
            if (lat >= bounds.south && lat <= bounds.north && 
                lng >= bounds.west && lng <= bounds.east) {
                map.flyTo(e.latlng, Math.max(map.getZoom(), 13), {
                    animate: true,
                    duration: 1.5
                });
            }
        },
        moveend: () => {
            // Keep map centered on Lagos if user pans too far
            const currentCenter = map.getCenter();
            if (currentCenter.lat < bounds.south || currentCenter.lat > bounds.north ||
                currentCenter.lng < bounds.west || currentCenter.lng > bounds.east) {
                map.flyTo(center, zoom, { animate: true, duration: 1.0 });
            }
        }
    });

    // Effect to fly to new center/zoom for Lagos locations
    React.useEffect(() => {
        if (center && zoom) {
            map.flyTo(center, zoom, {
                animate: true,
                duration: 1.5
            });
        }
    }, [center, zoom, map]);

    return null;
}

export const MapView = () => {
    const { shouldAnimate, isVisible } = useFirstLoadAnimation({ alwaysAnimate: true });
    
    // Lagos State boundaries (approximate)
    const LAGOS_BOUNDS = {
        north: 6.7,
        south: 6.35,
        east: 3.8,
        west: 3.0
    };
    
    // Lagos State boundary polygon (simplified outline)
    const LAGOS_BOUNDARY_POLYGON: LatLngTuple[] = [
        [6.7, 3.0],   // Northwest
        [6.7, 3.8],   // Northeast  
        [6.35, 3.8],  // Southeast
        [6.35, 3.0],  // Southwest
        [6.7, 3.0]    // Close polygon
    ];
    
    // More accurate Lagos center (Victoria Island/Ikoyi area)
    const LAGOS_CENTER: LatLngTuple = [6.5244, 3.3792];
    
    const windowSize = useWindowSize();
    
    // Lagos boundary toggle state
    const [showLagosBoundary, setShowLagosBoundary] = React.useState(false);
    
    // Responsive values based on screen size
    const isMobile = windowSize.width < 640;
    const isTablet = windowSize.width >= 640 && windowSize.width < 1024;
    
    // Lagos-optimized zoom levels
    const getLagosZoom = () => {
        if (isMobile) return 11;   // Closer zoom for mobile
        if (isTablet) return 12;   // Medium zoom for tablet
        return 12;                 // Good overview for desktop
    };
    
    const [mapCenter, setMapCenter] = React.useState<LatLngTuple>(LAGOS_CENTER);
    const [mapZoom, setMapZoom] = React.useState(getLagosZoom());
    
    // Crime filtering state
    const [selectedCrimeType, setSelectedCrimeType] = React.useState<string>(CRIME_TYPES.ALL);
    
    // Get available crime types and filtered locations
    const availableCrimeTypes = React.useMemo(() => getUniqueCrimeTypes(dangerousLocations), []);
    const filteredLocations = React.useMemo(() => 
        filterLocationsByCrimeType(dangerousLocations, selectedCrimeType), 
        [selectedCrimeType]
    );

    // Update zoom when screen size changes
    React.useEffect(() => {
        setMapZoom(getLagosZoom());
    }, [isMobile, isTablet]);

    // Fix for Leaflet marker icons in React
    React.useEffect(() => {
        delete (L.Icon.Default.prototype as any)._getIconUrl;
        L.Icon.Default.mergeOptions({
            iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
            iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
        });
    }, []);
    
    // Create vibrant colored markers using SVG data URLs
    const getMarkerIcon = (safetyRating: number) => {
        const colorMappings = {
            1: '#EF4444',    // Very High Risk - vibrant red
            2: '#F97316',    // High Risk - vibrant orange  
            3: '#FACC15',    // Elevated Risk - vibrant yellow/gold
            4: '#22C55E',    // Moderate Risk - vibrant green
            5: '#3B82F6'     // Low Risk - vibrant blue
        };
        
        const color = colorMappings[safetyRating as keyof typeof colorMappings] || colorMappings[5];
        
        // Create SVG marker with exact vibrant color
        const svgMarker = `
            <svg width="25" height="41" viewBox="0 0 25 41" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.5 0C5.596 0 0 5.596 0 12.5c0 12.5 12.5 28.5 12.5 28.5s12.5-16 12.5-28.5C25 5.596 19.404 0 12.5 0z" 
                      fill="${color}" 
                      stroke="#ffffff" 
                      stroke-width="2"/>
                <circle cx="12.5" cy="12.5" r="6" fill="#ffffff"/>
            </svg>
        `;
        
        const svgUrl = `data:image/svg+xml;base64,${btoa(svgMarker)}`;
        
        return new L.Icon({
            iconUrl: svgUrl,
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
        });
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
                        Lagos Quick Navigation:
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {/* Add Lagos-specific quick navigation buttons */}
                        <button
                            onClick={() => flyToLocation(LAGOS_CENTER)}
                            className={`text-white bg-blue-700 hover:bg-blue-600 transition-colors duration-200 
                                     px-3 py-2 text-xs sm:text-sm rounded-md border border-blue-500
                                     whitespace-nowrap ${
                                shouldAnimate 
                                    ? `transition-all duration-300 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`
                                    : 'opacity-100 translate-y-0'
                            }`}
                            style={shouldAnimate ? { transitionDelay: '400ms' } : {}}
                        >
                            Lagos Center
                        </button>
                        
                        {dangerousLocations.slice(0, 4).map((loc, index) => (
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
                                style={shouldAnimate ? { transitionDelay: `${450 + index * 50}ms` } : {}}
                            >
                                {loc.name}
                            </button>
                        ))}
                    </div>
                </div>
                
                {/* Crime Filter Section */}
                <div className="px-3 sm:px-4 pb-3 bg-neutral-950 border-t border-neutral-800">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-3">
                        <CrimeFilter
                            selectedCrimeType={selectedCrimeType}
                            onCrimeTypeChange={setSelectedCrimeType}
                            availableCrimeTypes={availableCrimeTypes}
                        />
                        
                        {/* Lagos Boundary Toggle */}
                        <div className="flex items-center gap-2">
                            <label className="flex items-center gap-2 text-white text-sm cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={showLagosBoundary}
                                    onChange={(e) => setShowLagosBoundary(e.target.checked)}
                                    className="w-4 h-4 text-blue-600 bg-neutral-800 border-neutral-600 rounded focus:ring-blue-500 focus:ring-2"
                                />
                                <span className="text-xs">Show Lagos Boundary</span>
                            </label>
                        </div>
                    </div>
                    
                    {/* Risk Level Legend */}
                    <div className="flex flex-wrap gap-3 mt-3 text-xs">
                        <span className="text-gray-400">Risk Levels:</span>
                        <div className="flex items-center gap-1">
                            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                            <span className="text-white">Very High</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                            <span className="text-white">High</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                            <span className="text-white">Elevated</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                            <span className="text-white">Moderate</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                            <span className="text-white">Low</span>
                        </div>
                    </div>
                    
                    {selectedCrimeType !== CRIME_TYPES.ALL && (
                        <div className="mt-2 text-xs text-gray-400">
                            Showing {filteredLocations.length} of {dangerousLocations.length} locations
                        </div>
                    )}
                </div>
            </div>

            <div className="flex-1 relative min-h-0">
                <MapContainer 
                    center={mapCenter} 
                    zoom={mapZoom} 
                    scrollWheelZoom={true}
                    className="w-full h-full absolute inset-0"
                    style={{ zIndex: 1 }}
                    maxBounds={[
                        [LAGOS_BOUNDS.south, LAGOS_BOUNDS.west], // Southwest corner
                        [LAGOS_BOUNDS.north, LAGOS_BOUNDS.east]  // Northeast corner
                    ]}
                    maxBoundsViscosity={1.0}
                    minZoom={10}
                    maxZoom={18}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <LagosMapInteractions center={mapCenter} zoom={mapZoom} bounds={LAGOS_BOUNDS} />
                    
                    {/* Lagos State Boundary Polygon */}
                    {showLagosBoundary && (
                        <Polygon
                            positions={LAGOS_BOUNDARY_POLYGON}
                            pathOptions={{
                                color: '#3B82F6',
                                weight: 2,
                                fillColor: '#3B82F6',
                                fillOpacity: 0.1,
                                dashArray: '5, 5'
                            }}
                        />
                    )}
                    
                    {/* Crime Location Markers */}
                    {filteredLocations.map((location, index) => (
                        <Marker
                            key={index}
                            position={location.coordinates}
                            icon={getMarkerIcon(location.safetyRating)} // Use custom icon based on safety rating
                        >
                            <Popup>
                                <div className="text-sm max-w-xs">
                                    <b className={isMobile ? 'text-sm' : 'text-base'}>{location.name}</b><br />
                                    <span className="text-xs">Risk Level: <strong>{getSafetyText(location.safetyRating)}</strong></span><br />
                                    <span className="text-xs mb-2 block">{location.description}</span>
                                    
                                    {/* Crime Type Badges */}
                                    <div className="flex flex-wrap gap-1 mt-2">
                                        {location.crimeTypes.map((crimeType, idx) => (
                                            <CrimeTypeBadge key={idx} crimeType={crimeType} size="sm" />
                                        ))}
                                    </div>
                                </div>
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>
            </div>
        </div>
    )
};