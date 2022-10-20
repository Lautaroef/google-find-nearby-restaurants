import { CssBaseline, Grid } from "@material-ui/core";
import { useState, useEffect } from "react";
import { getPlacesData } from "./api/travelAdvisorAPI";
import Header from "./components/Header/Header";
import List from "./components/List/List";
import Map from "./components/Map/Map";

const App = () => {
  const [type, setType] = useState<SearchTypes>("restaurants");

  const [coords, setCoords] = useState<LatLng>({ lat: 0, lng: 0 });
  const [bounds, setBounds] = useState<Bounds>(null);

  const [rating, setRating] = useState<RatingOptions>(0);

  const [filteredPlaces, setFilteredPlaces] = useState<Place[]>([]);
  const [places, setPlaces] = useState<Place[]>([]);

  const [childClicked, setChildClicked] = useState<HTMLElement | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // get user's location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
      setCoords({ lat: latitude, lng: longitude });
    });
  }, []);

  // filter places based on rating
  useEffect(() => {
    const filtered = places?.filter((place) => Number(place.rating) > rating);
    setFilteredPlaces(filtered);
  }, [rating]);

  useEffect(() => {
    if (bounds) {
      setIsLoading(true);

      // fetch places based on user's location
      getPlacesData(type, bounds.sw, bounds.ne).then((data: any) => {
        setPlaces(data.filter((place: any) => place.name && place.num_reviews > 0));
        setFilteredPlaces([]);
        setRating(0);
        setIsLoading(false);
      });
    }
  }, [bounds, type]);

  return (
    <>
      <CssBaseline />
      <Header />
      <Grid container spacing={3} style={{ width: "100%" }}>
        <Grid item xs={12} md={4}>
          <List
            type={type}
            rating={rating}
            setType={setType}
            setRating={setRating}
            isLoading={isLoading}
            childClicked={childClicked}
            places={filteredPlaces?.length ? filteredPlaces : places}
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={8}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Map
            coords={coords}
            setBounds={setBounds}
            setCoords={setCoords}
            setChildClicked={setChildClicked}
            places={filteredPlaces?.length ? filteredPlaces : places}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default App;
