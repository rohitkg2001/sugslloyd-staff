import { useEffect, useRef, useState } from "react";
import { View, Modal, TouchableWithoutFeedback } from "react-native";
import ContainerComponent from "../components/ContainerComponent";
import { spacing, styles, typography } from "../styles";
import MyFlatList from "../components/utility/MyFlatList";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { getAllTasks } from "../redux/actions/taskActions";
import NoRecord from "./NoRecord";
import ClickableCard1 from "../components/card/ClickableCard1";
import MyHeader from "../components/header/MyHeader";
import { H5, P, Span } from "../components/text";
import VendorSelectionScreen from "./VendorSelectionScreen";
import CustomModalContent from "../components/CustomModalContent";
import { Menu } from "react-native-paper";
import Button from "../components/buttons/Button";
import TaskCard from "../components/card/TaskCard";

export default function CurrentProjectsScreen({ navigation }) {
  const { staff } = useSelector((state) => state);
  const { tasks } = useSelector((state) => state.tasks);
  const [currentTasks, setCurrentTasks] = useState([]);
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [showVendorSelection, setShowVendorSelection] = useState(false);
  const [clickedText, setClickedText] = useState(null);
  const [selectedTargets, setSelectedTargets] = useState([])
  const menuRef = useRef(null)

  const { t } = useTranslation();

  useEffect(() => {
    dispatch(getAllTasks(staff.id));
  }, [staff]);

  useEffect(() => {
    Array.isArray(tasks) && setCurrentTasks(tasks);
  }, [tasks]);


  const toggleVendorSelection = () => {
    setShowVendorSelection(!showVendorSelection);
  };

  const handleTextClick = (text) => {
    if (text === "toggleVendorSelection") {
      toggleVendorSelection();
    }

    setClickedText(text);
  };

  const openMenu = () => setShowMenu(true);
  const closeMenu = () => setShowMenu(false);

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
        onIconPress={() => {
          menuRef.current?.measure((fx, fy, width, height, px, py) => {
            openMenu()
          })
          console.log(showModal)
        }}
        rightIcon={
          <View
            ref={menuRef} // Attach ref to the anchor
            style={{ width: 40, height: 40 }} // Invisible dummy view
          />
        }
      />
      <MyFlatList
        data={currentTasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => <TaskCard item={item} navigation={navigation} selectTargets={selectTargets} selectedTargets={selectedTargets} />}
        contentContainerStyle={[spacing.mh2, spacing.mt1, { flexGrow: 1 }]}
        ListEmptyComponent={() => <NoRecord msg={t("no_project")} />}
      />

      <Menu
        visible={showModal}
        onDismiss={() => setShowModal(false)}
        anchor={menuRef.current} //Put the anchor on top right icon button from MyHeader
      >
        <Menu.Item title="Assign to Vendor" onPress={() => console.log(selectedTargets)} />
      </Menu>

    </ContainerComponent >
  );
}
