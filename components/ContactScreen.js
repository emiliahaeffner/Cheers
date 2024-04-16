// import React, { useState, useEffect } from "react";
// import {
//   StyleSheet,
//   Text,
//   TextInput,
//   View,
//   ScrollView,
//   Image,
//   TouchableOpacity,
// } from "react-native";
// import { db } from "../firebase"; // Import db and userRef from firebase.js
// import {
//   QuerySnapshot,
//   collection,
//   onSnapshot,
//   getDocs,
//   query,
// } from "firebase/firestore";

// const ContactScreen = ({ navigation, route, userId }) => {
//   const [userData, setUserData] = useState(null); // State to store user data
//   const [loading, setLoading] = useState(true); // State to track loading status
//   const [filteredData, setFilteredData] = useState(null); // State to store filtered data
//   const [searchQuery, setSearchQuery] = useState(""); // State to store search query

//   const userRef = collection(db, "user");

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const querySnapshot = await getDocs(userRef); // Simplify the usage of userRef here
//         const data = querySnapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));
//         setUserData(data);
//         setFilteredData(data); // Initially set filtered data to all users
//       } catch (error) {
//         console.error("Error fetching user data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   // Function to add friend to user's friend list
//   const addFriend = (friendId) => {
//     // Implement logic to add friend to user's friend list
//     console.log("Added friend with ID:", friendId);
//   };

//   // Function to handle search input change
//   const handleSearch = (query) => {
//     setSearchQuery(query);
//     if (userData) {
//       // Filter userData based on search query
//       const filtered = userData.filter(
//         (user) =>
//           user.name && user.name.toLowerCase().includes(query.toLowerCase())
//       );
//       setFilteredData(filtered);
//     }
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.scrollViewContainer}>
//       <View style={styles.container}>
//         {/* Search bar */}
//         <TextInput
//           style={styles.searchInput}
//           placeholder="Search by name..."
//           value={searchQuery}
//           onChangeText={handleSearch}
//         />

//         {loading ? ( // Render loading indicator if data is still loading
//           <Text>Loading user data...</Text>
//         ) : filteredData && filteredData.length > 0 ? ( // Check if filteredData is not null and has elements before rendering
//           // Render filtered user data
//           filteredData.map((user, index) => (
//             <View style={styles.userContainer} key={index}>
//               {user.profilePicture && (
//                 <Image
//                   source={{ uri: user.profilePicture }}
//                   style={styles.profileImage}
//                 />
//               )}
//               <Text style={styles.userInfo}>Name: {user.name}</Text>
//               <Text style={styles.userInfo}>Age: {user.age}</Text>
//               <Text style={styles.userInfo}>Hobby: {user.hobby}</Text>
//               <Text style={styles.userInfo}>
//                 Favorite Drink: {user.favoriteDrink}
//               </Text>
//               {/* Add Friend button */}
//               <TouchableOpacity onPress={() => addFriend(user.id)}>
//                 <Text style={styles.addFriendButton}>Add Friend</Text>
//               </TouchableOpacity>
//             </View>
//           ))
//         ) : (
//           <Text>No matching contacts found.</Text>
//         )}
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   scrollViewContainer: {
//     flexGrow: 1,
//   },
//   container: {
//     justifyContent: "center",
//     alignItems: "center",
//     paddingHorizontal: 20,
//   },
//   userContainer: {
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 5,
//     padding: 10,
//     marginBottom: 10,
//     width: "100%",
//   },
//   userInfo: {
//     marginBottom: 5,
//   },
//   profileImage: {
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//     marginBottom: 10,
//   },
//   addFriendButton: {
//     marginTop: 5,
//     color: "blue", // You can style this button as needed
//     textDecorationLine: "underline",
//   },
//   searchInput: {
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 5,
//     padding: 10,
//     marginBottom: 10,
//     width: "100%",
//   },
// });

// export default ContactScreen;

import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import AllContactsScreen from "./AllContactsScreen";
import FriendListScreen from "./FriendListScreen"; // Import FriendListScreen component
import { db } from "../firebase"; // Import db and userRef from firebase.js
import { getDocs, collection } from "firebase/firestore";

const Tab = createMaterialTopTabNavigator();

const ContactScreen = ({ navigation, route, userId }) => {
  const [userData, setUserData] = useState(null); // State to store user data
  const [loading, setLoading] = useState(true); // State to track loading status

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRef = collection(db, "user");
        const querySnapshot = await getDocs(userRef);
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Tab.Navigator>
      <Tab.Screen name="All Contacts">
        {(props) => (
          <AllContactsScreen {...props} userData={userData} loading={loading} />
        )}
      </Tab.Screen>
      <Tab.Screen name="Friend List">
        {(props) => <FriendListScreen {...props} userId={userId} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export default ContactScreen;
