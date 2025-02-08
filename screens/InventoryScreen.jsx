// import all react native 
import { useEffect, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useTranslation } from "react-i18next";

// import all components
import ContainerComponent from "../components/ContainerComponent";
import MyHeader from "../components/header/MyHeader";
import MyFlatList from "../components/utility/MyFlatList";
import InventoryCard from "../components/card/InventoryCard";
import NoRecord from "./NoRecord";
import Button from "../components/buttons/Button";
import InventoryDetailsModal from "../components/InventoryDetailsModal";

// import faker 
import { inventoryData, projects, totalsitesData } from "../utils/faker";
// import all redux
import { useSelector } from "react-redux";

// import all styles
import { styles } from "../styles";


export default function InventoryScreen({ navigation }) {
  const [isVisible, setVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const { t } = useTranslation();
  const { inventory } = useSelector((state) => state.inventory);

  const viewItem = (id) => {
    setVisible(true);
    const thisItem = inventoryData.find((item) => item.id === id);
    const thisProject = projects.find((item) => item.id === thisItem.projectId);
    const thisSite = totalsitesData.find((item) => item.id === thisItem.siteId);
    const itemDetails = { ...thisItem, ...thisProject, ...thisSite };
    setSelectedItem(itemDetails);
  };

  useEffect(() => {}, [inventory]);

  return (
    <ContainerComponent>
      <MyHeader title={t("inventory_title")} hasIcon={true} isBack={true} />

      <MyFlatList
        data={inventory}
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
        style={styles.addButton}
        onPress={() => navigation.navigate("inventoryFormScreen")}
      >
        <Ionicons name="add" size={28} color="white" />
      </Button>
    </ContainerComponent>
  );
}
