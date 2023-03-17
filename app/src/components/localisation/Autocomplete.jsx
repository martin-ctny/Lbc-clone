import { TextField } from "@mui/material";
import React, { useRef, useEffect, useState, useContext } from "react";
import { PostContext } from "../../src/context/PostContex";

function Autocomplete({ id }) {
  const inputLocation = useRef(null);
  const [TemporaryAdresse, setTemporaryAdresse] = useState({});

  const { setNewPost, address } = useContext(PostContext);

  function AddAutoComplete() {
    const options = {
      componentRestrictions: { country: "fr" },
      fields: ["address_components", "geometry", "icon", "name"],
      strictBounds: false,
    };
    console.log(inputLocation.current);
    const autocomplete = new window.google.maps.places.Autocomplete(
      inputLocation.current,
      options
    );

    window.google.maps.event.addListener(
      autocomplete,
      "place_changed",
      function () {
        const autocompleteValue = autocomplete.getPlace();

        inputLocation.current.addEventListener("keyup", (e) => {
          if (e.keyCode == 13) {
            e.preventDefault();
            const adresse = {
              formatted_address: autocompleteValue?.name,
              street: autocompleteValue?.address_components[0]?.long_name,
              street_number:
                autocompleteValue?.address_components[0]?.long_name,
              route: autocompleteValue?.address_components[1]?.long_name,
              city: autocompleteValue?.address_components[2]?.long_name,
              administrative_area_level_1:
                autocompleteValue?.address_components[3]?.long_name,
              administrative_area_level_2:
                autocompleteValue?.address_components[4]?.long_name,
              country: autocompleteValue?.address_components[5]?.long_name,
              postal_code: autocompleteValue?.address_components[6]?.long_name,
              lat: autocompleteValue?.geometry?.location?.lat(),
              lng: autocompleteValue?.geometry?.location?.lng(),
            };

            setNewPost((newPost) => {
              return {
                ...newPost,
                adresse,
              };
            });
            setTemporaryAdresse(autocompleteValue);
          }
        });
      }
    );
  }

  useEffect(() => {
    window.initMap = AddAutoComplete;
    AddAutoComplete();
  }, [inputLocation.current]);

  return (
    <>
      <TextField
        label="Entrez votre adresse"
        variant="outlined"
        type="text"
        name="title"
        defaultValue={address || ""}
        id={id}
        inputRef={inputLocation}
      />
    </>
  );
}

export default Autocomplete;
