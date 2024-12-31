import { useEffect, useState } from "react";
import { View, Modal, TouchableWithoutFeedback } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import ContainerComponent from "../components/ContainerComponent";
import {
  spacing,
  styles,
  LIGHT,
  SCREEN_WIDTH,
  ICON_MEDIUM,
  typography,
  PRIMARY_COLOR_TRANSPARENT,
  DANGER_COLOR,
} from "../styles";
import SearchBar from "../components/input/SearchBar";
import Button from "../components/buttons/Button";
import MyFlatList from "../components/utility/MyFlatList";
import { useTranslation } from "react-i18next";
import Filter from "../components/Filter";
import { useDispatch, useSelector } from "react-redux";
import { getAllTasks } from "../redux/actions/taskActions";
import NoRecord from "./NoRecord";
import ClickableCard1 from "../components/card/ClickableCard1";
import MyHeader from "../components/header/MyHeader";
import { H5, P, Span } from "../components/text";
import VendorSelectionScreen from "./VendorSelectionScreen";
import CustomModalContent from "../components/CustomModalContent";

export default function CurrentProjectsScreen({ navigation }) {
  const { staff } = useSelector((state) => state);
  const { tasks } = useSelector((state) => state.tasks);
  const [currentTasks, setCurrentTasks] = useState([]);
  const dispatch = useDispatch();
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showVendorSelection, setShowVendorSelection] = useState(false);
  const [clickedText, setClickedText] = useState(null);
  const [selectedTargets, setSelectedTargets] = useState([])

  const { t } = useTranslation();

  const closeFilter = () => {
    setShowBottomSheet(!showBottomSheet);
  };

  useEffect(() => {
    dispatch(getAllTasks(staff.id));
  }, [staff]);

  useEffect(() => {
    Array.isArray(tasks) && setCurrentTasks(tasks);
  }, [tasks]);

  const toggleModal = () => {
    setShowModal((prev) => !prev);
  };

  const toggleVendorSelection = () => {
    setShowVendorSelection(!showVendorSelection);
  };

  const applyFilterFromRedux = (...args) => { };

  const handleTextClick = (text) => {
    if (text === "toggleVendorSelection") {
      toggleVendorSelection();
    }

    setClickedText(text);
  };

  const selectTargets = (idx) => {
    setSelectedTargets((prevTargets) => {
      const existingTargetIndex = prevTargets.findIndex((target) => target.id === idx);

      if (existingTargetIndex > -1) {
        // If already selected, remove it (unselect)
        const updatedTargets = [...prevTargets];
        updatedTargets.splice(existingTargetIndex, 1);
        return updatedTargets;
      } else {
        // If not selected, add it with `select: true`
        return [...prevTargets, { id: idx, select: true }];
      }
    });
    console.log(selectedTargets)
  };

  return (
    <ContainerComponent>
      <MyHeader
        title="Task"
        hasIcon={true}
        isBack={true}
        rightComponent={true}
        onIconPress={toggleModal}
      />
      <MyFlatList
        data={currentTasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => (
          <ClickableCard1
            key={item.id}
            index={item.id}
            title={item.site?.site_name}
            subtitle={`${item.site?.location}, ${item.site?.district}, ${item.site?.state}`}
            onPress={() => navigation.navigate("targetManagementScreen", { id: item.id })}
            onLongPressAction={(idx) => selectTargets(idx)}
            selected={selectedTargets.find(target => target.id === item.id)}
          >
            <View>
              <H5 style={[typography.font20]}>{item.activity}</H5>
              <View style={[spacing.mt1, styles.row]}>
                <View>
                  <Span
                    style={[typography.font12, { textTransform: "capitalize" }]}
                  >
                    start date
                  </Span>
                  <P style={[typography.font12]}>{item.start_date}</P>
                </View>
                <View>
                  <Span
                    style={[typography.font12, { textTransform: "capitalize" }]}
                  >
                    end date
                  </Span>
                  <P style={[typography.font12]}>{item.start_date}</P>
                </View>
              </View>
            </View>
          </ClickableCard1>
        )}
        contentContainerStyle={[spacing.mh2, spacing.mt1, { flexGrow: 1 }]}
        ListEmptyComponent={() => <NoRecord msg={t("no_project")} />}
        ListHeaderComponent={() => (
          <View
            style={[
              spacing.mv4,
              styles.row,
              spacing.mh1,
              { alignItems: "center" },
            ]}
          >
            <SearchBar
              placeholder="Search"
              style={{ width: SCREEN_WIDTH - 70 }}
            />
            <Button
              style={[styles.btn, styles.bgPrimary, spacing.mh1, { width: 50 }]}
              onPress={() => setShowBottomSheet(!showBottomSheet)}
            >
              <Icon name="options-outline" size={ICON_MEDIUM} color={LIGHT} />
            </Button>
          </View>
        )}
      />

      {showBottomSheet && (
        <Filter onClose={closeFilter} onApply={applyFilterFromRedux} />
      )}
      <Modal
        transparent={true}
        visible={showModal}
        animationType="slide"
        onRequestClose={toggleModal}
      >
        <TouchableWithoutFeedback onPress={() => toggleModal()}>
          <View
            style={{
              flex: 1,
              alignItems: "flex-end",
              paddingTop: 54,
              paddingRight: 4,
            }}
          >
            <TouchableWithoutFeedback onPress={() => { }}>
              <CustomModalContent
                clickedText={clickedText}
                handleTextClick={handleTextClick}
                toggleVendorSelection={toggleVendorSelection}
              />
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {showVendorSelection && (
        <VendorSelectionScreen
          onClose={toggleVendorSelection}
          setVendor={(vendor) => console.log("Assigned vendor:", vendor)}
        />
      )}
    </ContainerComponent>
  );
}
