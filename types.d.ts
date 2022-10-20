type SearchTypes = "restaurants" | "hotels" | "attractions";
type RatingOptions = 0 | 3 | 4 | 4.5;
type LatLng = { lat: number; lng: number };
type Bounds = { ne: GoogleMapCoords; sw: GoogleMapCoords } | null;

type GoogleMapCoords = GoogleMapReact.Coords;

// Place types

interface Place {
  location_id: string;
  name: string;
  latitude: string;
  longitude: string;
  num_reviews: string;
  timezone: string;
  location_string: string;
  photo: Photo;
  awards: any[];
  doubleclick_zone: string;
  preferred_map_engine: string;
  raw_ranking: string;
  ranking_geo: string;
  ranking_geo_id: string;
  ranking_position: string;
  ranking_denominator: string;
  ranking_category: string;
  ranking: string;
  distance: string;
  distance_string: string;
  bearing: string;
  rating: string;
  is_closed: boolean;
  open_now_text: string;
  is_long_closed: boolean;
  price_level: string;
  price: string;
  description: string;
  web_url: string;
  write_review: string;
  ancestors: Ancestor[];
  category: KeyName;
  subcategory: KeyName[];
  parent_display_name: string;
  is_jfy_enabled: boolean;
  nearest_metro_station: any[];
  phone: string;
  website: string;
  email: string;
  address_obj: AddressObj;
  address: string;
  hours: Hours;
  is_candidate_for_contact_info_suppression: boolean;
  cuisine: KeyName[];
  dietary_restrictions: KeyName[];
  establishment_types: KeyName[];
}

interface Image {
  width: string;
  url: string;
  height: string;
}

interface Images {
  small: Image;
  thumbnail: Image;
  original: Image;
  large: Image;
  medium: Image;
}

interface User {
  user_id?: any;
  member_id: string;
  type: string;
}

interface Photo {
  id: string;
  user: User;
  images: Images;
  caption: string;
  is_blessed: boolean;
  uploaded_date: Date;
  helpful_votes: string;
  published_date: Date;
}

interface KeyName {
  key: string;
  name: string;
}

interface Ancestor {
  name: string;
  abbrv?: any;
  subcategory: KeyName[];
  location_id: string;
}

interface AddressObj {
  street1: string;
  street2: string;
  city: string;
  state?: any;
  country: string;
  postalcode: string;
}

interface Hours {
  week_ranges: { open_time: number; close_time: number }[][];
  timezone: string;
}
