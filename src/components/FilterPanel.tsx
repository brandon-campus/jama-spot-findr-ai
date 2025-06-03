
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

interface FilterPanelProps {
  filters: {
    category: string;
    budget: string;
    distance: string;
    amenities: string[];
  };
  onFiltersChange: (filters: any) => void;
}

const FilterPanel = ({ filters, onFiltersChange }: FilterPanelProps) => {
  const categories = [
    { id: "trabajo", label: "Trabajo" },
    { id: "familia", label: "Familia" },
    { id: "pareja", label: "Pareja" }
  ];

  const budgets = [
    { id: "bajo", label: "Bajo ($)", value: "bajo" },
    { id: "medio", label: "Medio ($$)", value: "medio" },
    { id: "alto", label: "Alto ($$$)", value: "alto" }
  ];

  const distances = [
    { id: "500m", label: "500m", value: "500m" },
    { id: "1km", label: "1km", value: "1km" },
    { id: "2km", label: "2km", value: "2km" },
    { id: "5km", label: "5km+", value: "5km" }
  ];

  const amenities = [
    "WiFi gratuito",
    "Enchufes",
    "Ambiente tranquilo",
    "Terraza",
    "Estacionamiento",
    "Accesible",
    "Menú veggie",
    "Acepta mascotas",
    "Juegos infantiles",
    "Música en vivo"
  ];

  const handleCategoryChange = (category: string) => {
    onFiltersChange({
      ...filters,
      category: filters.category === category ? "" : category
    });
  };

  const handleBudgetChange = (budget: string) => {
    onFiltersChange({
      ...filters,
      budget
    });
  };

  const handleDistanceChange = (distance: string) => {
    onFiltersChange({
      ...filters,
      distance
    });
  };

  const handleAmenityChange = (amenity: string, checked: boolean) => {
    const newAmenities = checked 
      ? [...filters.amenities, amenity]
      : filters.amenities.filter(a => a !== amenity);
    
    onFiltersChange({
      ...filters,
      amenities: newAmenities
    });
  };

  return (
    <Card className="sticky top-20">
      <CardHeader>
        <CardTitle className="text-lg">Filtros</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Categorías */}
        <div>
          <h4 className="font-medium mb-3">Tipo de salida</h4>
          <div className="space-y-2">
            {categories.map((category) => (
              <div key={category.id} className="flex items-center space-x-2">
                <Checkbox
                  id={category.id}
                  checked={filters.category === category.id}
                  onCheckedChange={() => handleCategoryChange(category.id)}
                />
                <Label htmlFor={category.id} className="text-sm">
                  {category.label}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Presupuesto */}
        <div>
          <h4 className="font-medium mb-3">Presupuesto</h4>
          <RadioGroup 
            value={filters.budget} 
            onValueChange={handleBudgetChange}
          >
            {budgets.map((budget) => (
              <div key={budget.id} className="flex items-center space-x-2">
                <RadioGroupItem value={budget.value} id={budget.id} />
                <Label htmlFor={budget.id} className="text-sm">
                  {budget.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <Separator />

        {/* Distancia */}
        <div>
          <h4 className="font-medium mb-3">Distancia</h4>
          <RadioGroup 
            value={filters.distance} 
            onValueChange={handleDistanceChange}
          >
            {distances.map((distance) => (
              <div key={distance.id} className="flex items-center space-x-2">
                <RadioGroupItem value={distance.value} id={distance.id} />
                <Label htmlFor={distance.id} className="text-sm">
                  {distance.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <Separator />

        {/* Comodidades */}
        <div>
          <h4 className="font-medium mb-3">Comodidades</h4>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {amenities.map((amenity) => (
              <div key={amenity} className="flex items-center space-x-2">
                <Checkbox
                  id={amenity}
                  checked={filters.amenities.includes(amenity)}
                  onCheckedChange={(checked) => handleAmenityChange(amenity, checked as boolean)}
                />
                <Label htmlFor={amenity} className="text-sm">
                  {amenity}
                </Label>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FilterPanel;
