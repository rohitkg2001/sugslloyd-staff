import { View, TouchableOpacity, ScrollView } from "react-native";
import { styles, spacing, typography } from "../../styles";
import { P, H6 } from "../text";

const ProgressStep = ({ steps, activeStep, setActiveStep }) => {
  return (
    <View style={{ height: 50 }}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[
          styles.row,
          spacing.ph1,
          { alignItems: "flex-end" },
        ]}
      >
        {steps.map((step, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => setActiveStep(index)}
            style={{
              paddingHorizontal: 12,
              paddingVertical: 8,
              borderBottomWidth: 3,
              borderColor:
                index === activeStep
                  ? "#020409"
                  : index < activeStep
                  ? "#76885B"
                  : "#ccc",
            }}
          >
            <P
              style={{
                color:
                  index === activeStep
                    ? "#007AFF"
                    : index < activeStep
                    ? "#76885B"
                    : "#999",
                fontWeight: "bold",
                ...typography.font14,
              }}
            >
              {step}
            </P>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export const NavigationButtons = ({
  activeStep,
  steps,
  goToPrevious,
  goToNext,
}) => (
  <View style={[styles.row, spacing.pv3]}>
    <TouchableOpacity
      onPress={goToPrevious}
      style={[
        spacing.pv3,
        spacing.br2,
        spacing.mh5,
        {
          backgroundColor: activeStep === 0 ? "#ccc" : "#444",
          minWidth: 120,
          alignItems: "center",
        },
      ]}
    >
      <H6 style={[typography.font14, typography.textLight]}>Previous</H6>
    </TouchableOpacity>

    <TouchableOpacity
      onPress={goToNext}
      disabled={activeStep === steps.length - 1}
      style={[
        spacing.pv3,
        spacing.br2,
        spacing.mh4,
        {
          backgroundColor: activeStep === steps.length - 1 ? "#ccc" : "#76885B",
          minWidth: 120,
          alignItems: "center",
        },
      ]}
    >
      <H6 style={[typography.font14, typography.textLight]}>Next</H6>
    </TouchableOpacity>
  </View>
);

export default ProgressStep;
