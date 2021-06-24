// function FindMeButton() {
//   return (
//     <div>
//       <button
//         onClick={() => {
//           navigator.geolocation.getCurrentPosition(
//             function success(position){
//               const latitude = position.coords.latitude;
//               const longitude = position.coords.longitude;
//             return longitude, latitude;
//               }
//             function error () {
//               alert('could not get your position');
//             },);

//         }}
//       >
//         Find Me!
//       </button>
//     </div>
//   );
// }

// export default FindMeButton;

// Get the GPS coordinates from browsers geolocation API
// if (navigator.geolocation)
// navigator.geolocation.getCurrentPosition(
//   function (position) {
//     const latitude = position.coords.latitude;
//     const longitude = position.coords.longitude;
//     console.log(latitude, longitude);
//   },
//   function () {
//     alert('could not get your position');
//   },
// );
