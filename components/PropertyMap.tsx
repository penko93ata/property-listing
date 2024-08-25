"use client";
import { TProperty } from "@/types/properties.types";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import axios from "axios";
import Map, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Image from "next/image";
import pin from "@/assets/images/pin.svg";
import Spinner from "./Spinner";

type TGeocodeResponse = {
  place_id: string;
  license: string;
  osm_type: string;
  osm_id: string;
  boundingbox: string[];
  lat: string;
  lon: string;
  display_name: string;
  class: string;
  type: string;
  importance: number;
};

function useGeocode(searchTerm: string) {
  return useQuery({
    queryKey: ["geocode"],
    queryFn: async () => {
      axios;
      const response = await axios.get<TGeocodeResponse[]>(
        `https://us1.locationiq.com/v1/search?key=${process.env.NEXT_PUBLIC_LOCATION_IQ_ACCESS_TOKEN}&q=${searchTerm}&format=json&`
      );
      return response.data;
    },
  });
}

export default function PropertyMap({ property }: { property: TProperty }) {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [viewport, setViewport] = useState({
    latitude: 0,
    longitude: 0,
    zoom: 12,
    width: "100%",
    height: "500px",
  });
  const { data = [], isLoading, error } = useGeocode(`${property.location.street}, ${property.location.city}, ${property.location.state}`);
  console.log({ data, isLoading, error });

  // useEffect(() => {
  //     const geocode = async () => {
  //         try {
  //             const response = await fetch(
  //                 `https://api.mapbox.com/geocoding/v5/mapbox.places/${property.location.street}, ${property.location.city}, ${property.location.state}.json?access_token=${process.env.NEXT_PUBLIC_MAPBOX_API_KEY}`
  //             );
  //             const data = await response.json();
  //             setLat(data.features[0].center[1]);
  //             setLng(data.features[0].center[0]);
  //             setViewport({
  //                 ...viewport,
  //                 latitude: data.features[0].center[1],
  //                 longitude: data.features[0].center[0],
  //             });
  //         } catch (error) {
  //             setGeocodeError(error);
  //         } finally {
  //             setLoading(false);
  //         }
  //     };

  //     geocode();
  // }, []);

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <div className='text-xl'>No location data found</div>;
  }

  return (
    <Map
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
      initialViewState={{
        longitude: parseInt(data[0].lon),
        latitude: parseInt(data[0].lat),
        zoom: 14,
      }}
      style={{ width: "100%", height: 500 }}
      mapStyle='mapbox://styles/mapbox/streets-v9'
    >
      <Marker latitude={parseInt(data[0].lat)} longitude={parseInt(data[0].lon)} anchor='bottom'>
        <Image src={pin} alt='location pin' width={40} height={40} />
      </Marker>
    </Map>
  );
}
