import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Card } from "react-native-paper";
import { SCREEN_WIDTH, spacing } from "../styles";

const ViewDetailScreen = ({ route }) => {
  const { site } = route.params;

  return (
    <View
      style={[
        spacing.mh2,
        {
          width: SCREEN_WIDTH - 16,
          paddingVertical: 10,
        },
      ]}
    >
      <Card style={styles.card}>
        <Text style={styles.title}>{site.siteName}</Text>
        <Text style={styles.detail}>Dist: {site.dist}</Text>
        <Text style={styles.detail}>Location: {site.location}</Text>
        <Text style={styles.detail}>Sanction Load: {site.Sanctionload}</Text>
        <Text style={styles.detail}>
          Project Capacity: {site.ProjectCapacity}
        </Text>
        <Text style={styles.detail}>Contact No: {site.ContactNo}</Text>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  detail: {
    fontSize: 16,
    marginTop: 8,
  },
});

export default ViewDetailScreen;
