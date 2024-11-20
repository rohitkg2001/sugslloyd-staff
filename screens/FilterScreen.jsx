import { useState } from "react";
import { View, Modal, ScrollView } from "react-native";
import { RadioButton, Button, Chip } from "react-native-paper";
import ContainerComponent from "../components/ContainerComponent";
import { SCREEN_WIDTH, LIGHT, typography, spacing } from "../styles";
import { H4, H5 } from "../components/text";
import { styles } from "../styles/components.styles";
import { filterOptions } from "../utils/faker";

const FilterScreen = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [modalContent, setModalContent] = useState("Budget");

  const openModal = (content) => {
    setModalContent(content);
    setModalVisible(true);
  };

  const closeModal = () => setModalVisible(false);

  const renderModalOptions = () => {
    return (
      <RadioButton.Group
        onValueChange={(value) => setSelectedOption(value)}
        value={selectedOption}
      >
        {filterOptions[modalContent]?.map((option) => (
          <RadioButton.Item
            key={option.value}
            label={option.label}
            value={option.value}
          />
        ))}
      </RadioButton.Group>
    );
  };

  return (
    <ContainerComponent width={SCREEN_WIDTH - 10}>
      <View style={styles.row}>
        <Chip
          style={{ backgroundColor: "#C3D1C0", marginHorizontal: 4 }}
          onPress={() => openModal("Budget")}
        >
          Budget
        </Chip>
        <Chip
          style={{ backgroundColor: "#C3D1C0", marginHorizontal: 4 }}
          onPress={() => openModal("Project")}
        >
          Project
        </Chip>
        <Chip
          style={{ backgroundColor: "#C3D1C0", marginHorizontal: 4 }}
          onPress={() => openModal("Location")}
        >
          Location
        </Chip>
        <Chip
          style={{ backgroundColor: "#C3D1C0", marginHorizontal: 4 }}
          onPress={() => openModal("State")}
        >
          State
        </Chip>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={closeModal}
      >
        <View
          backgroundColor={LIGHT}
          style={{
            flex: 1,
            justifyContent: "flex-end",
          }}
        >
          <View
            backgroundColor={LIGHT}
            style={{
              padding: 20,
            }}
          >
            <H4
              style={{
                fontSize: 18,
                fontWeight: "bold",
                marginBottom: 16,
              }}
            >
              {modalContent.toUpperCase()}
            </H4>
            <ScrollView>{renderModalOptions()}</ScrollView>
            <Button
              style={[styles.bgPrimary, { justifyContent: "center" }]}
              mode="outlined"
              onPress={closeModal}
            >
              <H5
                style={[
                  styles.btnText,
                  styles.textLarge,
                  typography.textLight,
                ]}
              >
                Close
              </H5>
            </Button>
          </View>
        </View>
      </Modal>

    </ContainerComponent>
  );
};

export default FilterScreen;
