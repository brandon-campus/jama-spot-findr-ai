
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, MapPin, Clock, DollarSign } from "lucide-react";

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

interface PlaceCardProps {
  place: Place;
}

const PlaceCard = ({ place }: PlaceCardProps) => {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'trabajo':
        return 'bg-blue-100 text-blue-700';
      case 'familia':
        return 'bg-green-100 text-green-700';
      case 'pareja':
        return 'bg-pink-100 text-pink-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'trabajo':
        return 'Trabajo';
      case 'familia':
        return 'Familia';
      case 'pareja':
        return 'Pareja';
      default:
        return category;
    }
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer">
      <CardContent className="p-0">
        <div className="flex">
          {/* Image */}
          <div className="w-48 h-40 bg-gradient-to-br from-orange-200 to-green-200 relative overflow-hidden rounded-l-lg">
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-colors duration-300" />
            <div className="absolute top-3 left-3">
              <Badge className={getCategoryColor(place.category)}>
                {getCategoryLabel(place.category)}
              </Badge>
            </div>
            <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center space-x-1">
              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              <span className="text-xs font-medium">{place.rating}</span>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 p-6">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-xl font-semibold text-gray-900 group-hover:text-orange-600 transition-colors">
                {place.name}
              </h3>
              <div className="flex items-center text-gray-600">
                <DollarSign className="w-4 h-4 mr-1" />
                <span className="text-sm font-medium">{place.price}</span>
              </div>
            </div>

            <div className="flex items-center text-gray-500 mb-3">
              <MapPin className="w-4 h-4 mr-1" />
              <span className="text-sm">{place.distance}</span>
              <Clock className="w-4 h-4 ml-4 mr-1" />
              <span className="text-sm">Abierto ahora</span>
            </div>

            <p className="text-gray-600 mb-4 line-clamp-2">{place.description}</p>

            {/* Amenities */}
            <div className="flex flex-wrap gap-1 mb-4">
              {place.amenities.slice(0, 3).map((amenity, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {amenity}
                </Badge>
              ))}
              {place.amenities.length > 3 && (
                <Badge variant="secondary" className="text-xs">
                  +{place.amenities.length - 3} más
                </Badge>
              )}
            </div>

            {/* Actions */}
            <div className="flex space-x-2">
              <Button 
                size="sm" 
                className="bg-gradient-to-r from-orange-500 to-green-500 text-white hover:from-orange-600 hover:to-green-600"
              >
                Ver detalles
              </Button>
              <Button size="sm" variant="outline" className="border-orange-200 text-orange-600 hover:bg-orange-50">
                Cómo llegar
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PlaceCard;
