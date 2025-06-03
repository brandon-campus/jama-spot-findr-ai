import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Search as SearchIcon, Star, Filter, ArrowLeft, MessageCircle } from "lucide-react";
import ChatAssistant from "@/components/ChatAssistant";
import FilterPanel from "@/components/FilterPanel";
import PlaceCard from "@/components/PlaceCard";
import MapView from "@/components/MapView";

const Search = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const [showFilters, setShowFilters] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    category: searchParams.get("category") || "",
    budget: "",
    distance: "",
    amenities: []
  });

  // Datos simulados de lugares
  const mockPlaces = [
    {
      id: 1,
      name: "Café Palermo",
      category: "trabajo",
      rating: 4.8,
      distance: "0.5 km",
      price: "$$",
      image: "/placeholder.svg",
      description: "Cafetería tranquila con excelente wifi y ambiente para trabajar",
      amenities: ["WiFi gratuito", "Enchufes", "Ambiente tranquilo", "Café de especialidad"],
      location: { lat: -34.5875, lng: -58.4156 }
    },
    {
      id: 2,
      name: "Parque Centenario",
      category: "familia",
      rating: 4.6,
      distance: "1.2 km",
      price: "Gratis",
      image: "/placeholder.svg",
      description: "Amplio parque con juegos infantiles y espacios verdes",
      amenities: ["Juegos infantiles", "Espacio verde", "Seguro", "Baños públicos"],
      location: { lat: -34.6063, lng: -58.4227 }
    },
    {
      id: 3,
      name: "Rooftop Romance",
      category: "pareja",
      rating: 4.9,
      distance: "0.8 km",
      price: "$$$",
      image: "/placeholder.svg",
      description: "Bar en terraza con vista panorámica y ambiente romántico",
      amenities: ["Terraza", "Vista panorámica", "Ambiente íntimo", "Carta de cocktails"],
      location: { lat: -34.5756, lng: -58.4124 }
    },
    {
      id: 4,
      name: "Co-working Hub",
      category: "trabajo",
      rating: 4.7,
      distance: "0.3 km",
      price: "$$",
      image: "/placeholder.svg",
      description: "Espacio de coworking moderno con todas las comodidades",
      amenities: ["WiFi ultra rápido", "Salas de reunión", "Café ilimitado", "Impresora"],
      location: { lat: -34.5912, lng: -58.4098 }
    }
  ];

  const [filteredPlaces, setFilteredPlaces] = useState(mockPlaces);

  useEffect(() => {
    // Simular filtrado basado en query y filtros
    let filtered = mockPlaces;
    
    if (selectedFilters.category) {
      filtered = filtered.filter(place => 
        place.category === selectedFilters.category.toLowerCase()
      );
    }
    
    if (searchQuery) {
      filtered = filtered.filter(place => 
        place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        place.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        place.amenities.some(amenity => 
          amenity.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
    
    setFilteredPlaces(filtered);
  }, [searchQuery, selectedFilters]);

  const handleSearch = () => {
    // Trigger search
    console.log("Searching for:", searchQuery);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-orange-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/")}
                className="text-orange-600 hover:text-orange-700"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Volver
              </Button>
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-gradient-to-r from-orange-500 to-green-500 rounded-lg flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-white" />
                </div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-orange-600 to-green-600 bg-clip-text text-transparent">
                  Jama
                </h1>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowChat(!showChat)}
                className="border-orange-200 text-orange-600 hover:bg-orange-50"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Chat IA
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Search Bar */}
        <div className="mb-6">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Input
                type="text"
                placeholder="¿Qué estás buscando?"
                className="w-full px-4 py-3 border-2 border-orange-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
              <Button
                onClick={handleSearch}
                size="sm"
                className="absolute right-2 top-2 bg-gradient-to-r from-orange-500 to-green-500 hover:from-orange-600 hover:to-green-600 text-white"
              >
                <SearchIcon className="w-4 h-4" />
              </Button>
            </div>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="border-orange-200 text-orange-600 hover:bg-orange-50"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filtros
            </Button>
          </div>
        </div>

        {/* Active Filters */}
        {(selectedFilters.category || searchQuery) && (
          <div className="mb-6 flex flex-wrap gap-2">
            {selectedFilters.category && (
              <Badge variant="secondary" className="bg-orange-100 text-orange-700">
                {selectedFilters.category}
                <button
                  onClick={() => setSelectedFilters(prev => ({ ...prev, category: "" }))}
                  className="ml-2 hover:text-orange-900"
                >
                  ×
                </button>
              </Badge>
            )}
            {searchQuery && (
              <Badge variant="secondary" className="bg-green-100 text-green-700">
                "{searchQuery}"
                <button
                  onClick={() => setSearchQuery("")}
                  className="ml-2 hover:text-green-900"
                >
                  ×
                </button>
              </Badge>
            )}
          </div>
        )}

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Filters Panel */}
          {showFilters && (
            <div className="lg:col-span-1">
              <FilterPanel 
                filters={selectedFilters}
                onFiltersChange={setSelectedFilters}
              />
            </div>
          )}

          {/* Results */}
          <div className={showFilters ? "lg:col-span-3" : "lg:col-span-4"}>
            <div className="mb-4 flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-gray-900">
                {filteredPlaces.length} lugares encontrados
              </h2>
            </div>

            <Tabs defaultValue="list" className="w-full">
              <TabsList className="grid w-full max-w-md grid-cols-2 mb-6">
                <TabsTrigger value="list">Lista</TabsTrigger>
                <TabsTrigger value="map">Mapa</TabsTrigger>
              </TabsList>
              
              <TabsContent value="list" className="space-y-4">
                {filteredPlaces.map((place) => (
                  <PlaceCard key={place.id} place={place} />
                ))}
              </TabsContent>
              
              <TabsContent value="map">
                <MapView places={filteredPlaces} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Chat Assistant */}
      {showChat && (
        <ChatAssistant 
          onClose={() => setShowChat(false)}
          onSearch={(query) => {
            setSearchQuery(query);
            setShowChat(false);
          }}
        />
      )}
    </div>
  );
};

export default Search;
