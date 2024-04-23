import { ref, onValue } from "firebase/database";
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { FirebaseRTDB } from "../firebase"; // Import your Firebase Realtime Database instance

const MapsScreen = ({ route }) => {
  const { selectedDrink, userId } = route.params ?? {};
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    const dbRef = ref(FirebaseRTDB);
    const locationRef = ref(dbRef, `select/${userId}/location`);

    const unsubscribe = onValue(locationRef, (snapshot) => {
      if (snapshot.exists()) {
        const locationData = snapshot.val();
        setUserLocation(locationData);
      } else {
        console.log("User location not found in Firebase.");
        // You might want to set userLocation to null here or handle this case differently
      }
    });

    // Cleanup function to unsubscribe from the listener when the component unmounts
    return () => unsubscribe();
  }, [userId]);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: userLocation ? userLocation.coords.latitude : 0,
          longitude: userLocation ? userLocation.coords.longitude : 0,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {/* Display user marker */}
        {userLocation && (
          <Marker
            coordinate={{
              latitude: userLocation.coords.latitude,
              longitude: userLocation.coords.longitude,
            }}
            title="You"
          />
        )}
      </MapView>
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>
          Username: {userLocation ? userLocation.username : ""}
        </Text>
        <Text style={styles.infoText}>Selected Drink: {selectedDrink}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  infoContainer: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    borderRadius: 10,
    padding: 10,
  },
  infoText: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default MapsScreen;

// import { ref, onValue } from "firebase/database";
// import React, { useState, useEffect } from "react";
// import { View, Text, StyleSheet } from "react-native";
// import MapView, { Marker } from "react-native-maps";
// import { FirebaseRTDB } from "../firebase"; // Import your Firebase Realtime Database instance

// const MapsScreen = ({ route }) => {
//   const { selectedDrink, userId } = route.params ?? {};
//   const [userLocation, setUserLocation] = useState(null);

//   useEffect(() => {
//     const dbRef = ref(FirebaseRTDB);
//     const locationRef = ref(dbRef, `select/${userId}/location`);

//     const unsubscribe = onValue(locationRef, (snapshot) => {
//       if (snapshot.exists()) {
//         const locationData = snapshot.val();
//         setUserLocation(locationData);
//       } else {
//         console.log("User location not found in Firebase.");
//         // You might want to set userLocation to null here or handle this case differently
//       }
//     });

//     // Cleanup function to unsubscribe from the listener when the component unmounts
//     return () => unsubscribe();
//   }, [userId]);

//   return (
//     <View style={styles.container}>
//       <MapView
//         style={styles.map}
//         initialRegion={{
//           latitude: userLocation ? userLocation.coords.latitude : 0,
//           longitude: userLocation ? userLocation.coords.longitude : 0,
//           latitudeDelta: 0.0922,
//           longitudeDelta: 0.0421,
//         }}
//       >
//         {/* Display user marker */}
//         {userLocation && (
//           <Marker
//             coordinate={{
//               latitude: userLocation.coords.latitude,
//               longitude: userLocation.coords.longitude,
//             }}
//             title="You"
//           />
//         )}
//       </MapView>
//       <View style={styles.infoContainer}>
//         <Text style={styles.infoText}>
//           Username: {userLocation ? userLocation.username : ""}
//         </Text>
//         <Text style={styles.infoText}>Selected Drink: {selectedDrink}</Text>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   map: {
//     flex: 1,
//   },
//   infoContainer: {
//     position: "absolute",
//     bottom: 20,
//     left: 20,
//     right: 20,
//     backgroundColor: "rgba(255, 255, 255, 0.7)",
//     borderRadius: 10,
//     padding: 10,
//   },
//   infoText: {
//     fontSize: 16,
//     marginBottom: 5,
//   },
// });

// export default MapsScreen;
