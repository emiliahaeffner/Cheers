import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";

const SelectScreen = () => {
  const [drinks, setDrinks] = useState([
    { name: "Water", selected: false },
    { name: "Tea", selected: false },
    { name: "Coffee", selected: false },
    // Add more drink options as needed
  ]);

  const timeOptions = [
    { label: "15 min", value: 15 },
    { label: "30 min", value: 30 },
    { label: "45 min", value: 45 },
    { label: "60 min", value: 60 },
  ];

  const [selectedDrink, setSelectedDrink] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [drinkPickerVisible, setDrinkPickerVisible] = useState(false);
  const [timePickerVisible, setTimePickerVisible] = useState(false);

  const navigation = useNavigation();

  const handleNavigateToRecipes = () => {
    navigation.navigate("RecipeScreen");
  };

  const selectDrink = (drink) => {
    const updatedDrinks = drinks.map((d) =>
      d.name === drink.name
        ? { ...d, selected: true }
        : { ...d, selected: false }
    );
    setSelectedDrink(drink);
    setDrinkPickerVisible(false);
    console.log("Selected drink:", drink.name);
    setDrinks(updatedDrinks);
  };

  const selectTime = (time) => {
    setSelectedTime(time);
    setTimePickerVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Your Drink</Text>
      <View style={styles.optionsContainer}>
        {drinks.map((drink, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.drinkOption,
              drink.selected ? styles.selectedOption : null,
            ]}
            onPress={() => selectDrink(drink)}
          >
            {/* <Image source={drink.image} style={styles.drinkImage} /> */}
            <Text style={styles.drinkName}>{drink.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity onPress={handleNavigateToRecipes}>
        <Text>Go to Recipes</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Select Drinking Time</Text>
      <View style={styles.pickerContainer}>
        <TouchableOpacity
          style={styles.selectedTime}
          onPress={() => setTimePickerVisible(true)}
        >
          <Text>{selectedTime ? `${selectedTime} min` : "Select Time"}</Text>
        </TouchableOpacity>
        {timePickerVisible && (
          <Picker
            selectedValue={selectedTime}
            onValueChange={(itemValue) => selectTime(itemValue)}
            style={styles.picker}
          >
            {timeOptions.map((option, index) => (
              <Picker.Item
                key={index}
                label={option.label}
                value={option.value}
              />
            ))}
          </Picker>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
  },
  optionsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  drinkOption: {
    alignItems: "center",
    marginHorizontal: 10,
    padding: 10,
    borderRadius: 8,
  },
  drinkName: {
    fontSize: 16,
  },
  selectedOption: {
    backgroundColor: "#6FCF97", // Change color to indicate selection
  },
  pickerContainer: {
    alignItems: "center",
  },
  picker: {
    height: 50,
    width: 200,
    marginBottom: 20,
  },
  selectedTime: {
    height: 50,
    width: 200,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});

export default SelectScreen;
