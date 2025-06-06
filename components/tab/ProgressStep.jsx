// import react native
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const ProgressStep = ({ steps, activeStep, setActiveStep }) => {
  return (
    <View style={styles.container}>
      {steps.map((step, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => setActiveStep(index)}
          style={[
            styles.step,
            index === activeStep && styles.activeStep,
            index < activeStep && styles.completedStep,
          ]}
        >
          <Text
            style={[
              styles.label,
              index === activeStep && styles.activeLabel,
              index < activeStep && styles.completedLabel,
            ]}
          >
            {step}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export const NavigationButtons = ({
  activeStep,
  steps,
  goToPrevious,
  goToNext,
}) => (
  <View style={styles.buttonContainer}>
    <TouchableOpacity
      onPress={goToPrevious}
      style={[
        styles.navButton,
        activeStep === 0 ? styles.disabledButton : styles.prevActiveButton,
      ]}
    >
      <Text style={styles.buttonText}>Previous</Text>
    </TouchableOpacity>

    <TouchableOpacity
      onPress={goToNext}
      disabled={activeStep === steps.length - 1}
      style={[
        styles.navButton,
        activeStep === steps.length - 1 && styles.disabledButton,
      ]}
    >
      <Text style={styles.buttonText}>Next</Text>
    </TouchableOpacity>
  </View>
);

export default ProgressStep;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    // marginTop: 30,
    marginBottom: 15,
    paddingHorizontal: 15,
    backgroundColor: "#f4f4f4",
    paddingVertical: 15,
    borderRadius: 12,
  },
  step: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderBottomWidth: 3,
    borderColor: "#ccc",
  },
  label: {
    color: "#999",
    fontSize: 16,
    fontWeight: "500",
  },
  activeStep: {
    borderColor: "#007AFF",
  },
  completedStep: {
    borderColor: "#4BB543",
  },
  activeLabel: {
    color: "#007AFF",
    fontWeight: "bold",
    fontSize: 17,
  },
  completedLabel: {
    color: "#4BB543",
    fontWeight: "bold",
    fontSize: 16,
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingVertical: 15,
  },

  navButton: {
    backgroundColor: "#76885B",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 10,
    minWidth: 120,
    alignItems: "center",
    marginHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  prevActiveButton: {
    backgroundColor: "#444",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  disabledButton: {
    backgroundColor: "#ccc",
    shadowOpacity: 0,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
    textAlign: "center",
  },
});
