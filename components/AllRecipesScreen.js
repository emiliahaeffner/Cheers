import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

const AllRecipesScreen = ({ cocktailData, loading, addToFavoritList }) => {
  const [searchQuery, setSearchQuery] = useState(""); // State to store search query
  const [filteredData, setFilteredData] = useState([]); // Initialize as empty array

  // Function to handle search input change
  const handleSearch = (query) => {
    setSearchQuery(query);
    if (cocktailData) {
      // Filter cocktailData based on search query
      const filtered = cocktailData.filter(
        (cocktail) =>
          cocktail.name &&
          typeof cocktail.name === "string" &&
          cocktail.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredData(filtered);
    }
  };

  useEffect(() => {
    // Set filteredData to cocktailData initially
    setFilteredData(cocktailData);
  }, [cocktailData]);

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.container}>
        {/* Search bar */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search by name..."
            value={searchQuery}
            onChangeText={handleSearch}
          />
          {loading && <ActivityIndicator size="small" color="#999" />}
        </View>

        {filteredData && filteredData.length > 0 ? (
          filteredData.map((cocktail, index) => (
            <TouchableOpacity
              style={styles.cardContainer}
              onPress={() => addToFavoritList(cocktail)}
              key={index}
            >
              <Image
                source={{ uri: cocktail.image }}
                style={styles.cardImage}
              />
              <View style={styles.cardTextContainer}>
                <Text style={styles.cardTitle}>{cocktail.name}</Text>
                <Text style={styles.cardInfo}>Alcohol: {cocktail.alcohol}</Text>
                <Text style={styles.cardInfo}>Glass: {cocktail.glass}</Text>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <Text style={styles.noResultText}>No matching cocktails found.</Text>
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
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginRight: 10,
  },
  cardContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 10,
    width: "100%",
  },
  cardImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 10,
  },
  cardTextContainer: {
    flex: 1,
    paddingVertical: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  cardInfo: {
    fontSize: 14,
    color: "#666",
  },
  noResultText: {
    marginTop: 20,
    fontSize: 16,
    color: "#999",
  },
});

export default AllRecipesScreen;
