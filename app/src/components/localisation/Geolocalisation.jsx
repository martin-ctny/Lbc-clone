import React, { useState, useEffect, useContext } from "react";
import { PostContext } from "../../src/context/PostContex";

const GeoLocalisation = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const { setAddress } = useContext(PostContext);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation(position.coords);
          getAddressFromLatLng(
            position.coords.latitude,
            position.coords.longitude
          );
        },
        (error) => {
          setErrorMsg(error);
        }
      );
    } else {
      setErrorMsg(<div>Geolocation is not supported by this browser.</div>);
    }
  }, []);

  const getAddressFromLatLng = (latitude, longitude) => {
    fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyCdLmmlsKudTLknJq-f3z0Yz-YMUSrZ4LU      `
    )
      .then((response) => response.json())
      .then((data) => {
        const address = data.results[0].formatted_address;
        setAddress(address);
      })
      .catch((error) => console.error(error));
  };

  return <></>;
};

export default GeoLocalisation;
