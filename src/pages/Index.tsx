
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Search, Users, Heart, Briefcase, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const categories = [
    {
      icon: Briefcase,
      title: "Trabajar en remoto",
      description: "Cafeterías, coworkings y espacios con wifi",
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600"
    },
    {
      icon: Users,
      title: "Salir con la familia",
      description: "Parques, restaurantes y actividades familiares",
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      iconColor: "text-green-600"
    },
    {
      icon: Heart,
      title: "Salir con la pareja",
      description: "Restaurantes románticos, bares y experiencias",
      color: "from-pink-500 to-pink-600",
      bgColor: "bg-pink-50",
      iconColor: "text-pink-600"
    }
  ];

  const featuredPlaces = [
    {
      name: "Café Central",
      category: "Trabajo",
      rating: 4.8,
      image: "/placeholder.svg",
      tags: ["WiFi gratuito", "Enchufes", "Ambiente tranquilo"]
    },
    {
      name: "Parque de los Niños",
      category: "Familia",
      rating: 4.6,
      image: "/placeholder.svg",
      tags: ["Juegos infantiles", "Espacio verde", "Seguro"]
    },
    {
      name: "Bistró Romance",
      category: "Pareja",
      rating: 4.9,
      image: "/placeholder.svg",
      tags: ["Ambiente íntimo", "Terraza", "Carta de vinos"]
    }
  ];

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleCategoryClick = (category: string) => {
    navigate(`/search?category=${encodeURIComponent(category.toLowerCase())}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-orange-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-green-500 rounded-lg flex items-center justify-center">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-green-600 bg-clip-text text-transparent">
                Jama
              </h1>
            </div>
            <Button variant="outline" className="border-orange-200 text-orange-600 hover:bg-orange-50">
              Explorar
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Encuentra el lugar
            <span className="block bg-gradient-to-r from-orange-500 to-green-500 bg-clip-text text-transparent">
              perfecto para ti
            </span>
          </h2>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Ya sea para trabajar, disfrutar en familia o una cita romántica, 
            te ayudamos a descubrir lugares ideales cerca de ti.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-16">
            <div className="relative">
              <Input
                type="text"
                placeholder="Dime qué buscas... ej: 'cafetería tranquila para trabajar en Palermo'"
                className="w-full px-6 py-4 text-lg border-2 border-orange-200 rounded-2xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 shadow-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
              <Button
                onClick={handleSearch}
                className="absolute right-2 top-2 bg-gradient-to-r from-orange-500 to-green-500 hover:from-orange-600 hover:to-green-600 text-white rounded-xl px-6"
              >
                <Search className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Categories */}
          <div className="grid md:grid-cols-3 gap-6 mb-20">
            {categories.map((category, index) => (
              <Card 
                key={index} 
                className="group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl border-0 bg-white/80 backdrop-blur-sm"
                onClick={() => handleCategoryClick(category.title)}
              >
                <CardContent className="p-8 text-center">
                  <div className={`w-16 h-16 ${category.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <category.icon className={`w-8 h-8 ${category.iconColor}`} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{category.title}</h3>
                  <p className="text-gray-600">{category.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Places */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Lugares destacados cerca de ti
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {featuredPlaces.map((place, index) => (
              <Card key={index} className="group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl border-0 overflow-hidden">
                <div className="aspect-video bg-gradient-to-br from-orange-200 to-green-200 relative">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{place.rating}</span>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="text-xl font-semibold text-gray-900">{place.name}</h4>
                    <span className="text-sm text-orange-600 bg-orange-100 px-2 py-1 rounded-full">
                      {place.category}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {place.tags.map((tag, tagIndex) => (
                      <span key={tagIndex} className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-orange-500 to-green-500 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-2xl font-bold">Jama</h3>
          </div>
          <p className="text-white/80 mb-6">
            Encuentra lugares perfectos para cada momento de tu vida
          </p>
          <p className="text-white/60 text-sm">
            © 2024 Jama. Hecho con ❤️ para conectar personas con lugares increíbles.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
