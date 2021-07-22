export const validateLocation = () => {
  let errors = {};
  const matrix = new window.google.maps.DistanceMatrixService();

  matrix.getDistanceMatrix(
    {
      origins: [{ lat: 32.46676394279375, lng: 74.51652471329868 }],
      destinations: [{ lat: 34.041641701837044, lng: 71.48752907185963 }],
      travelMode: window.google.maps.TravelMode.DRIVING,
    },
    (response, status) => {
      console.log(response);
      let distance = response?.rows[0]?.elements[0]?.distance?.value;

      if (distance && distance > 100) {
        errors.streetAddress = "The chef doesn't deliver to that address";
      }
    }
  );
  return { errors, isValid: Object.keys(errors).length === 0 };
};
