/* eslint-disable consistent-return */
import axios from "axios";

export const getPlacesData = async (
  type: SearchTypes,
  sw: GoogleMapCoords,
  ne: GoogleMapCoords
) => {
  try {
    const {
      data: { data },
    } = await axios.get(
      `https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`,
      {
        params: {
          bl_latitude: sw.lat,
          bl_longitude: sw.lng,
          tr_longitude: ne.lng,
          tr_latitude: ne.lat,
        },
        headers: {
          "x-rapidapi-key":
            "8157088927mshb6c97d11939fc94p1244ebjsn793d4bde977f",
          "x-rapidapi-host": "travel-advisor.p.rapidapi.com",
        },
      }
    );

    return data;
  } catch (error) {
    console.log(error);
  }
};
