import { useState } from "react";
import ContainerComponent from "../components/ContainerComponent";
import MyHeader from "../components/header/MyHeader";
import MyFlatList from "../components/utility/MyFlatList";
import { inventoryData, projects } from "../utils/faker";
import InventoryCard from "../components/card/InventoryCard";
import NoRecord from "./NoRecord";
import { useTranslation } from "react-i18next";
import Icon from "react-native-vector-icons/Ionicons";
import Button from "../components/buttons/Button";
import { PRIMARY_COLOR, spacing, typography } from "../styles";
import InventoryDetailsModal from "../components/InventoryDetailsModal";
import { useSelector } from "react-redux";
import { Text } from "react-native";

export default function InventoryScreen({ navigation }) {
  const [isVisible, setVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const { t } = useTranslation();
  const { inventory } = useSelector((state) => state.inventory);

  const viewItem = (id) => {
    setVisible(true);
    const thisItem = inventoryData.find((item) => item.id === id);
    const thisProject = projects.find((item) => item.id === thisItem.projectId);
    const itemDetails = { ...thisItem, ...thisProject };
    setSelectedItem(itemDetails);
  };

  return (
    <ContainerComponent>
      <MyHeader title={t("inventory_title")} hasIcon={true} isBack={true} />

      {/* <MyFlatList
        data={inventoryData}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={() => <NoRecord msg={t("no_inventory")} />}
        renderItem={({ item }) => (
          <InventoryCard
            key={item.id}
            item={item}
            onPress={() => viewItem(item.id)}
          />
        )}
      /> */}

      <MyFlatList
        data={inventory} // Now using Redux state
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={() => <NoRecord msg={t("no_inventory")} />}
        renderItem={({ item }) => (
          <InventoryCard
            key={item.id}
            item={item}
            onPress={() => viewItem(item.id)}
          />
        )}
      />

      <InventoryDetailsModal
        visible={isVisible}
        onClose={() => setVisible(false)}
        selectedItem={selectedItem}
      />

      <Button
        style={[
          spacing.p3,
          spacing.br3,
          {
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: PRIMARY_COLOR,
            left: 65,
            bottom: 24,
          },
        ]}
        onPress={() => navigation.navigate("inventoryFormScreen")}
      >
        <Icon name="add" size={28} color="white" />
        <Text
          style={[
            typography.font16,
            typography.fontLato,
            spacing.ml2,
            typography.textLight,
          ]}
        >
          New Material
        </Text>
      </Button>
    </ContainerComponent>
  );
}
