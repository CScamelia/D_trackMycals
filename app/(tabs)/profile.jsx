import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";

const Profile = () => {
  const [form, setForm] = useState({
    age: "",
    gender: "",
    height: "",
    weight: "",
    activity: "",
  });

  const handleInputChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const calculateBMI = () => {
    const { height, weight } = form;
    const heightNum = parseFloat(height);
    const weightNum = parseFloat(weight);
    if (heightNum && weightNum) {
      const heightInMeters = heightNum / 100; // Convert height to meters
      const bmi = weightNum / (heightInMeters * heightInMeters);
      return bmi.toFixed(2);
    }
    return "";
  };

  const calculateBMR = () => {
    const { age, gender, height, weight } = form;
    const ageNum = parseInt(age, 10);
    const heightNum = parseFloat(height);
    const weightNum = parseFloat(weight);
    if (ageNum && gender && heightNum && weightNum) {
      if (gender.toLowerCase() === "male") {
        return 10 * weightNum + 6.25 * heightNum - 5 * ageNum + 5;
      } else if (gender.toLowerCase() === "female") {
        return 10 * weightNum + 6.25 * heightNum - 5 * ageNum - 161;
      }
    }
    return "";
  };

  const calculateCalories = () => {
    const bmr = calculateBMR();
    if (bmr) {
      const { activity } = form;
      let activityFactor = 1.2; // Default sedentary

      if (activity.toLowerCase() === "light") {
        activityFactor = 1.375;
      } else if (activity.toLowerCase() === "moderate") {
        activityFactor = 1.55;
      } else if (activity.toLowerCase() === "active") {
        activityFactor = 1.725;
      } else if (activity.toLowerCase() === "very active") {
        activityFactor = 1.9;
      }

      return (bmr * activityFactor).toFixed(2);
    }
    return "";
  };

  const handleSubmit = () => {
    const bmi = calculateBMI();
    const calories = calculateCalories();
    if (bmi && calories) {
      Alert.alert("Results", `BMI: ${bmi}\nDaily Calorie Intake: ${calories}`);
    } else {
      Alert.alert("Error", "Please fill in all fields correctly.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={styles.header}>Profile</Text>

        <TextInput
          style={styles.input}
          placeholder="Age"
          keyboardType="numeric"
          value={form.age}
          onChangeText={(value) => handleInputChange("age", value)}
        />

        <TextInput
          style={styles.input}
          placeholder="Gender (male/female)"
          value={form.gender}
          onChangeText={(value) => handleInputChange("gender", value)}
        />

        <TextInput
          style={styles.input}
          placeholder="Height (cm)"
          keyboardType="numeric"
          value={form.height}
          onChangeText={(value) => handleInputChange("height", value)}
        />

        <TextInput
          style={styles.input}
          placeholder="Weight (kg)"
          keyboardType="numeric"
          value={form.weight}
          onChangeText={(value) => handleInputChange("weight", value)}
        />

        <TextInput
          style={styles.input}
          placeholder="Activity Level (sedentary, light, moderate, active, very active)"
          value={form.activity}
          onChangeText={(value) => handleInputChange("activity", value)}
        />

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Calculate</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#161622",
    paddingHorizontal: 20,
  },
  scrollView: {
    paddingVertical: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
