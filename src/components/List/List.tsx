import { useState, useEffect, createRef } from "react";
import {
  Grid,
  Select,
  MenuItem,
  Typography,
  InputLabel,
  FormControl,
  CircularProgress,
} from "@material-ui/core";

import PlaceDetails from "../PlaceDetails/PlaceDetails";
import useStyles from "./styles.js";

type Props = {
  places: Place[];
  type: SearchTypes;
  isLoading: boolean;
  setType: (type: SearchTypes) => void;
  rating: RatingOptions;
  setRating: (rating: RatingOptions) => void;
  childClicked: HTMLElement | null;
};

const ratingOptions: { value: RatingOptions; label: string }[] = [
  { value: 0, label: "All" },
  { value: 3, label: "Above 3" },
  { value: 4, label: "Above 4" },
  { value: 4.5, label: "Above 4.5" },
];

const List = ({
  places,
  type,
  rating,
  setType,
  isLoading,
  setRating,
  childClicked,
}: Props) => {
  const [elRefs, setElRefs] = useState<React.RefObject<HTMLDivElement>[]>([]);
  const classes = useStyles();

  useEffect(() => {
    setElRefs((refs) =>
      Array(places?.length)
        .fill(0)
        .map((_, i) => refs[i] || createRef())
    );
  }, [places]);

  const handleTypeChange = (
    e: React.ChangeEvent<{
      name?: string | undefined;
      value: unknown;
    }>
  ) => {
    const value = e.target.value as SearchTypes;
    setType(value);
  };

  return (
    <div className={classes.container}>
      <Typography variant="h5">Food & Dining around you</Typography>
      {isLoading ? (
        <div className={classes.loading}>
          <CircularProgress size="5rem" />
        </div>
      ) : (
        <>
          <div>
            <FormControl className={classes.formControl}>
              <InputLabel id="type">Type</InputLabel>
              <Select id="type" value={type} onChange={handleTypeChange}>
                <MenuItem value="restaurants">Restaurants</MenuItem>
                <MenuItem value="hotels">Hotels</MenuItem>
                <MenuItem value="attractions">Attractions</MenuItem>
              </Select>
            </FormControl>

            <FormControl className={classes.formControl}>
              <InputLabel id="rating">Rating</InputLabel>
              <Select
                id="rating"
                value={rating}
                onChange={(e) => setRating(e.target.value as RatingOptions)}
              >
                {ratingOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          <Grid container spacing={3} className={classes.list}>
            {places ? (
              //@ts-ignore
              places?.map((place, i: number) => (
                <Grid ref={elRefs[i]} key={i} item xs={12}>
                  <PlaceDetails
                    selected={Number(childClicked) === i}
                    refProp={elRefs[i]}
                    place={place}
                  />
                </Grid>
              ))
            ) : (
              <>
                <div className={classes.noData}>
                  <Typography variant="h6"> No data found </Typography>
                </div>
              </>
            )}
          </Grid>
        </>
      )}
    </div>
  );
};

export default List;
