const api = "https://api.foursquare.com/v2/venues/";
const clientId = "NCEB4E34GSBVGJCGTP4HYKF1PVNLEQKNEPK0MG1QVGYE4Y4X";
const clientSecret = "5LAP1JGPOCC0LU5RTFIZPTGOVFVLR2KZPMEGAK52EBHN4XHB";
// const errorClientId = "NCEB4E34GSBVGJCGTP4HYKF1PVNLEQKNEPK0MG1QVGYE4";

// const clientId = "YX4J5GEEKAM0ERLOSCLZJPREGF543KQTXJVIWY0NK4Z1EF3C";
// const clientSecret = "FI31ZDXK0ONJGTMUH5J1EOQFCOYWBVFWTG3JJVKNIKF2FUBG";

export const getVenueDetail = venueId =>
  fetch(
    `${api}${venueId}?&v=20181030&client_id=${clientId}&client_secret=${clientSecret}`
  )
    .then(res => res.json())
    .then(data => {
      if (data.meta.code === 200) {
        let newData = { status: "success", content: data.response.venue };
        return newData;
      } else {
        return {
          status: "error",
          content: data.meta.code
        };
      }
    })
    .catch(e => {
      return e;
    });
