
import { useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";

interface Place {
  id: number;
  name: string;
  category: string;
  rating: number;
  distance: string;
  price: string;
  image: string;
  description: string;
  amenities: string[];
  location: { lat: number; lng: number };
}

interface MapViewProps {
  places: Place[];
}

const MapView = ({ places }: MapViewProps) => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Simular la carga de un mapa
    if (mapRef.current) {
      mapRef.current.innerHTML = '';
      
      // Crear contenedor del mapa simulado
      const mapContainer = document.createElement('div');
      mapContainer.className = 'w-full h-96 bg-gradient-to-br from-blue-100 to-green-100 rounded-lg relative overflow-hidden';
      
      // Agregar "marcadores" simulados
      places.forEach((place, index) => {
        const marker = document.createElement('div');
        marker.className = 'absolute w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold cursor-pointer hover:scale-110 transition-transform shadow-lg';
        marker.textContent = (index + 1).toString();
        
        // Posición simulada
        const left = 20 + (index * 15) % 60;
        const top = 20 + (index * 10) % 60;
        marker.style.left = `${left}%`;
        marker.style.top = `${top}%`;
        
        // Tooltip al hacer hover
        marker.title = place.name;
        
        mapContainer.appendChild(marker);
      });
      
      // Agregar controles simulados
      const controls = document.createElement('div');
      controls.className = 'absolute top-4 right-4 flex flex-col space-y-2';
      controls.innerHTML = `
        <button class="bg-white shadow-lg rounded-lg p-2 hover:bg-gray-50 transition-colors">
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 2L3 7v11h4v-6h6v6h4V7l-7-5z"/>
          </svg>
        </button>
        <button class="bg-white shadow-lg rounded-lg p-2 hover:bg-gray-50 transition-colors">
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
            <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd"/>
          </svg>
        </button>
      `;
      
      mapContainer.appendChild(controls);
      
      // Agregar texto informativo
      const info = document.createElement('div');
      info.className = 'absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg';
      info.innerHTML = `
        <p class="text-sm text-gray-600 mb-1">Vista del mapa</p>
        <p class="text-xs text-gray-500">${places.length} lugares encontrados</p>
      `;
      
      mapContainer.appendChild(info);
      mapRef.current.appendChild(mapContainer);
    }
  }, [places]);

  return (
    <Card>
      <CardContent className="p-6">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Mapa de resultados
          </h3>
          <p className="text-sm text-gray-600">
            Explora los {places.length} lugares encontrados en el mapa
          </p>
        </div>
        
        <div ref={mapRef} className="w-full">
          {/* El mapa se renderiza aquí */}
        </div>
        
        {/* Lista de lugares en el mapa */}
        <div className="mt-4 space-y-2">
          <h4 className="font-medium text-gray-900">Lugares en el mapa:</h4>
          {places.map((place, index) => (
            <div key={place.id} className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
              <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                {index + 1}
              </div>
              <div className="flex-1">
                <p className="font-medium text-sm">{place.name}</p>
                <p className="text-xs text-gray-500">{place.distance} • {place.price}</p>
              </div>
              <div className="flex items-center">
                <svg className="w-4 h-4 fill-yellow-400 text-yellow-400" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
                <span className="text-sm ml-1">{place.rating}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MapView;
