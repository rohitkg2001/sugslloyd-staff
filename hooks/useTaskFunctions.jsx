import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getAllTasks } from "../redux/actions/taskActions";

export function useTaskFunctions(staff) {
  const dispatch = useDispatch();
  const { tasks } = useSelector((state) => state.tasks);
  const [currentTasks, setCurrentTasks] = useState([]);
  const [menuVisible, setMenuVisible] = useState(false);
  const [selectedTargets, setSelectedTargets] = useState([]);
  const [showVendorSelection, setShowVendorSelection] = useState(false);
  const [activeTab, setActiveTab] = useState("Unassigned");
  const menuRef = useRef(null);
  const [showBottomSheet, setShowBottomSheet] = useState(false);

  useEffect(() => {
    if (staff?.id) dispatch(getAllTasks(staff.id));
  }, [staff]);

  useEffect(() => {
    if (Array.isArray(tasks)) setCurrentTasks(tasks);
  }, [tasks]);

  const toggleMenu = () => setMenuVisible((prev) => !prev);
  const closeMenu = () => setMenuVisible(false);

  const selectTargets = (idx) => {
    setSelectedTargets((prevTargets) => {
      const existingTargetIndex = prevTargets.findIndex(
        (target) => target.id === idx
      );

      if (existingTargetIndex > -1) {
        const updatedTargets = [...prevTargets];
        updatedTargets.splice(existingTargetIndex, 1);
        return updatedTargets;
      } else {
        const selectedTask = tasks.find((task) => task.id === idx);
        return [
          ...prevTargets,
          { id: idx, select: true, hasVendor: !!selectedTask.vendor_id },
        ];
      }
    });
  };

  const assignMultipleTasksToVendor = () => {
    closeMenu();
    setShowVendorSelection(true);
  };

  const handleApprove = async (taskId) => {
    try {
      const response = await axios.post(
        `https://slldm.com/api/tasks/${taskId}/approve`
      );
      alert(response.data.message);
      dispatch(getAllTasks(staff.id));
    } catch (error) {
      console.error("Error approving the task:", error);
    }
  };

  const approveMultipleTasks = () => {
    if (!selectedTargets || selectedTargets.length === 0) return;
    selectedTargets.forEach((task) => handleApprove(task.id));
    closeMenu();
    setSelectedTargets([]);
  };

  const handleTabSelection = (tab) => {
    setActiveTab(tab);
    let filteredTasks = [];
    if (tab === "Unassigned") {
      filteredTasks = tasks.filter((task) => !task.vendor_id);
    } else if (tab === "Assigned") {
      filteredTasks = tasks.filter((task) => task.vendor_id && !task.image);
    } else if (tab === "Pending") {
      filteredTasks = tasks.filter(
        (task) => task.image && task.vendor_id && task.status !== "Completed"
      );
    } else if (tab === "Done") {
      filteredTasks = tasks.filter((task) => task.status === "Completed");
    } else if (tab === "Rejected") {
      filteredTasks = [];
    } else {
      filteredTasks = tasks;
    }
    setCurrentTasks(filteredTasks);
  };

  return {
    currentTasks,
    menuVisible,
    selectedTargets,
    showVendorSelection,
    activeTab,
    menuRef,
    showBottomSheet,
    setShowBottomSheet,
    toggleMenu,
    closeMenu,
    selectTargets,
    assignMultipleTasksToVendor,
    approveMultipleTasks,
    handleTabSelection,
  };
}
