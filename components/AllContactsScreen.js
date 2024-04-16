import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";

const AllContactsScreen = ({ userData, loading, addToFriendList }) => {
  const [searchQuery, setSearchQuery] = useState(""); // State to store search query
  const [filteredData, setFilteredData] = useState(userData); // State to store filtered data

  // Function to handle search input change
  const handleSearch = (query) => {
    setSearchQuery(query);
    if (userData) {
      // Filter userData based on search query
      const filtered = userData.filter(
        (user) =>
          user.name &&
          typeof user.name === "string" &&
          user.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredData(filtered);
    }
  };

  useEffect(() => {
    setFilteredData(userData);
  }, [userData]);

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.container}>
        {/* Search bar */}
        <TextInput
          style={styles.searchInput}
          placeholder="Search by name..."
          value={searchQuery}
          onChangeText={handleSearch}
        />

        {loading ? (
          <Text>Loading user data...</Text>
        ) : filteredData && filteredData.length > 0 ? (
          filteredData.map((user, index) => (
            <View style={styles.userContainer} key={index}>
              {user.profilePicture && (
                <Image
                  source={{ uri: user.profilePicture }}
                  style={styles.profileImage}
                />
              )}
              <Text style={styles.userInfo}>Name: {user.name}</Text>
              <Text style={styles.userInfo}>Age: {user.age}</Text>
              <Text style={styles.userInfo}>Hobby: {user.hobby}</Text>
              <Text style={styles.userInfo}>
                Favorite Drink: {user.favoriteDrink}
              </Text>
              {/* Add Friend button */}
              <TouchableOpacity onPress={() => addToFriendList(user)}>
                <Text style={styles.addFriendButton}>Add Friend</Text>
              </TouchableOpacity>
            </View>
          ))
        ) : (
          <Text>No matching contacts found.</Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  userContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: "100%",
  },
  userInfo: {
    marginBottom: 5,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  addFriendButton: {
    marginTop: 5,
    color: "blue", // You can style this button as needed
    textDecorationLine: "underline",
  },
  searchInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: "100%",
  },
});

export default AllContactsScreen;
