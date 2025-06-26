import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

import type { LatLngTuple } from "leaflet";
import "leaflet/dist/leaflet.css"
import "../App.css"
import HeatmapLayer from "../components/HeatMapLayer";

const position: LatLngTuple = [6.5244, 3.3792]

const locations: { name: string; position: [number, number] }[] = [
    { name: "Ikeja (Mainland)", position: [6.6018, 3.3515] },
    { name: "Yaba (Tech hub)", position: [6.5117, 3.3716] },
    { name: "Surulere", position: [6.5007, 3.3486] },
    { name: "Lekki Phase 1", position: [6.4402, 3.4836] },
    { name: "Ajah", position: [6.4671, 3.6022] },
    { name: "Victoria Island", position: [6.4281, 3.4216] },
    { name: "Ikorodu", position: [6.6194, 3.5104] },
    { name: "Agege", position: [6.6238, 3.3260] },
    { name: "Badagry", position: [6.4156, 2.8852] },
    { name: "Epe", position: [6.5752, 3.9832] },
];


export const Home = () => {
    return (
        <MapContainer center={position} zoom={10} scrollWheelZoom={false}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <HeatmapLayer points={[
                { lat: 6.5244, lng: 3.3792, intensity: 1 },
                { lat: 6.525, lng: 3.38, intensity: 1 },
                { lat: 6.526, lng: 3.381, intensity: 1 },
                { lat: 6.527, lng: 3.382, intensity: 1 },
            ]} />
            <Marker position={position}>
                <Popup>
                    Central Lagos
                </Popup>
            </Marker>
            {locations.map((loc, index) => (
                <Marker key={index} position={loc.position}>
                    <Popup>{loc.name}</Popup>
                </Marker>
            ))}

        </MapContainer>
    )
};