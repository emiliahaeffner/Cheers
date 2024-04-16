import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView, Image } from "react-native";
import { db } from "../firebase"; // Import db and userRef from firebase.js
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  getDoc,
} from "firebase/firestore";

const FriendListScreen = ({ userId }) => {
  const [friendList, setFriendList] = useState([]); // State to store friend list
  const [friendsData, setFriendsData] = useState([]); // State to store friend details

  useEffect(() => {
    const fetchFriendList = async () => {
      try {
        const userRef = doc(db, "user", userId);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setFriendList(userData.friends || []);
        }
      } catch (error) {
        console.error("Error fetching friend list:", error);
      }
    };

    fetchFriendList();
  }, [userId]);

  useEffect(() => {
    const fetchFriendsData = async () => {
      try {
        const friendsDataPromises = friendList.map(async (friendId) => {
          const friendRef = doc(db, "user", friendId);
          const friendDoc = await getDoc(friendRef);
          return friendDoc.data();
        });
        const friendsData = await Promise.all(friendsDataPromises);
        setFriendsData(friendsData.filter((friend) => friend)); // Filter out null values
      } catch (error) {
        console.error("Error fetching friends data:", error);
      }
    };

    fetchFriendsData();
  }, [friendList]);

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Friend List</Text>
        {friendsData && friendsData.length > 0 ? (
          friendsData.map((friend, index) => (
            <View style={styles.friendContainer} key={index}>
              {friend.profilePicture && (
                <Image
                  source={{ uri: friend.profilePicture }}
                  style={styles.profileImage}
                />
              )}
              <Text style={styles.friendInfo}>Name: {friend.name}</Text>
              <Text style={styles.friendInfo}>Age: {friend.age}</Text>
              <Text style={styles.friendInfo}>Hobby: {friend.hobby}</Text>
              <Text style={styles.friendInfo}>
                Favorite Drink: {friend.favoriteDrink}
              </Text>
            </View>
          ))
        ) : (
          <Text>No friends found.</Text>
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
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  friendContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: "100%",
  },
  friendInfo: {
    marginBottom: 5,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
});

export default FriendListScreen;
