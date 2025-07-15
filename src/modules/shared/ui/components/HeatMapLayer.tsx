// components/HeatmapLayer.js
import { useMap } from 'react-leaflet';
import { useEffect } from 'react';
import 'leaflet.heat';

// TypeScript declaration for leaflet.heat
declare global {
  interface Window {
    L: typeof import('leaflet') & {
      heatLayer: (latlngs: any[], options?: any) => any;
    };
  }
}

export default function HeatmapLayer({ points }: { points: any[] }) {
  const map = useMap();

  useEffect(() => {
    const heatLayer = window.L.heatLayer(
      points.map(p => [p.lat, p.lng, p.intensity]),
      { radius: 25 }
    ).addTo(map);

    return () => {
      map.removeLayer(heatLayer);
    };
  }, [map, points]);

  return null;
}
