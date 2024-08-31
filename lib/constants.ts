export const propetyTypeOptions = [
  { value: "Apartment", label: "Apartment" },
  { value: "Studio", label: "Studio" },
  { value: "Condo", label: "Condo" },
  { value: "House", label: "House" },
  { value: "Cabin Or Cottage", label: "Cabin Or Cottage" },
  { value: "Loft", label: "Loft" },
  { value: "Room", label: "Room" },
  { value: "Chalet", label: "Chalet" },
  { value: "Other", label: "Other" },
];

export const amenitiesItems = [
  { id: "amenity_wifi", label: "Wifi" },
  { id: "amenity_kitchen", label: "Full Kitchen" },
  { id: "amenity_washer_dryer", label: "Washer & Dryer" },
  { id: "amenity_free_parking", label: "Free Parking" },
  { id: "amenity_pool", label: "Swimming Pool" },
  { id: "amenity_hot_tub", label: "Hot Tub" },
  { id: "amenity_24_7_security", label: "24/7 Security" },
  { id: "amenity_wheelchair_accessible", label: "Wheelchair Accessible" },
  { id: "amenity_elevator_access", label: "Elevator Access" },
  { id: "amenity_dishwasher", label: "Dishwasher" },
  { id: "amenity_gym_fitness_center", label: "Gym/Fitness Center" },
  { id: "amenity_pets_friendly", label: "Pet-Friendly" },
  { id: "amenity_high_speed_internet", label: "High-Speed Internet" },
  { id: "amenity_air_conditioning", label: "Air Conditioning" },
  { id: "amenity_balcony_patio", label: "Balcony/Patio" },
  { id: "amenity_smart_tv", label: "Smart TV" },
  { id: "amenity_coffee_maker", label: "Coffee Maker" },
  { id: "amenity_outdoor_grill_bbq", label: "Outdoor Grill/BBQ" },
  { id: "amenity_beach_access", label: "Beach Access" },
  { id: "amenity_fireplace", label: "Fireplace" },
  { id: "amenity_hiking_trails_access", label: "Hiking Trails Access" },
  { id: "amenity_ski_equipment_storage", label: "Ski Equipment Storage" },
  { id: "mountain_view", label: "Mountain View" },
];

export const getAmenityLabel = (id: string) => {
  return amenitiesItems.find((item) => item.id === id)?.label;
};
