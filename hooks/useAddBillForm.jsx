import { useState } from "react";
import * as DocumentPicker from "expo-document-picker";
import { useTranslation } from "react-i18next";

export default function useAddBillForm() {
  const [start_date, setStartDate] = useState(new Date());
  const [journeyDate, setJourneyDate] = useState(new Date());
  const [selectedDateType, setSelectedDateType] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [pnrNumbersStart, setPnrNumbersStart] = useState([""]);
  const [pnrNumbersReturn, setPnrNumbersReturn] = useState([""]);
  const [ticket, setTicket] = useState(null);
  const [hotelBill, setHotelBill] = useState(null);
  const [type, setType] = useState(null);
  const [city, setCity] = useState(null);
  const [destinationCity, setDestinationCity] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState("");
  const [totalKm, setTotalKm] = useState("");
  const [kmRate, setKmRate] = useState("");
  const [rent, setRent] = useState("");
  const [vehicleNo, setVehicleNo] = useState("");
  const [department, setDepartment] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [visitApprovedBy, setVisitApprovedBy] = useState("");
  const [objective, setObjective] = useState("");
  const [meetings, setMeetings] = useState("");
  const [outcomes, setOutcomes] = useState("");
  const [designation, setDesignation] = useState("");

  const [transactions, setTransactions] = useState([]);

  const [pnrErrorsStart, setPnrErrorsStart] = useState([]);
  const [pnrErrorsReturn, setPnrErrorsReturn] = useState([]);
  const { t } = useTranslation();

  const onDateChange = (event, selectedDate) => {
    if (event.type === "set" && selectedDate) {
      if (selectedDateType === "start") {
        setStartDate(selectedDate);
      } else if (selectedDateType === "return") {
        setJourneyDate(selectedDate);
      }
    }
    setShowDatePicker(false); // Close the picker after selection
  };

  // PNR Validation Function
  // const validatePnr = (value, type) => {
  //   if (type === "Train") {
  //     if (!/^\d{10}$/.test(value)) {
  //       return t("PNR for Train must be exactly 10 digits");
  //     }
  //   } else if (type === "Flight") {
  //     if (!/^[a-zA-Z0-9]{6,10}$/.test(value)) {
  //       return t(
  //         "PNR for Flight must be between 6 to 10 alphanumeric characters"
  //       );
  //     }
  //   }
  //   return null; // No error for Bus or valid input
  // };
  const validatePnr = (value, type) => {
    if (!type) return null; // Type select nahi hua toh error na do

    if (type === "Train") {
      if (value.length < 10) return null; // Jab tak 10 digit nahi hote, alert na de
      if (!/^\d{10}$/.test(value)) {
        return t("PNR for Train must be exactly 10 digits");
      }
    } else if (type === "Flight") {
      if (value.length < 6) return null; // Jab tak 6 characters nahi hote, alert na de
      if (!/^[a-zA-Z0-9]{6,10}$/.test(value)) {
        return t(
          "PNR for Flight must be between 6 to 10 alphanumeric characters"
        );
      }
    }
    return null; // No error for Bus or valid input
  };

  // PNR Handlers for Start Journey
  // const handlePnrChangeStart = (value, index) => {
  //   const updatedPnrNumbers = [...pnrNumbersStart];
  //   updatedPnrNumbers[index] = value;
  //   setPnrNumbersStart(updatedPnrNumbers);
  // };

  // PNR Handlers for Start Journey
  // const handlePnrChangeStart = (value, index) => {
  //   if (!type) {
  //     alert(t("Please select a mode of transport first"));
  //     return;
  //   }

  //   const updatedPnrNumbers = [...pnrNumbersStart];
  //   updatedPnrNumbers[index] = value;
  //   setPnrNumbersStart(updatedPnrNumbers);
  // };

  const handlePnrChangeStart = (value, index) => {
    if (!type) {
      alert(t("Please select a mode of transport first"));
      return;
    }

    // PNR list update kare bina validation ke
    setPnrNumbersStart((prevPnrNumbers) => {
      const updatedPnrNumbers = [...prevPnrNumbers];
      updatedPnrNumbers[index] = value;
      return updatedPnrNumbers;
    });
  };

  const handlePnrBlur = (value) => {
    const errorMessage = validatePnr(value, type);
    if (errorMessage) {
      alert(errorMessage);
    }
  };

  // PNR Handlers for Return Journey
  const handlePnrChangeReturn = (value, index) => {
    const errorMessage = validatePnr(value, type);
    if (errorMessage) {
      alert(errorMessage);
      return;
    }
    const updatedPnrNumbers = [...pnrNumbersReturn];
    updatedPnrNumbers[index] = value;
    setPnrNumbersReturn(updatedPnrNumbers);
  };

  const addPnrFieldStart = () => {
    setPnrNumbersStart([...pnrNumbersStart, ""]);
  };

  const removePnrFieldStart = (index) => {
    const updatedPnrNumbers = pnrNumbersStart.filter((_, i) => i !== index);
    setPnrNumbersStart(updatedPnrNumbers);
  };

  // PNR Handlers for Return Journey
  // const handlePnrChangeReturn = (value, index) => {
  //   const updatedPnrNumbers = [...pnrNumbersReturn];
  //   updatedPnrNumbers[index] = value;
  //   setPnrNumbersReturn(updatedPnrNumbers);
  // };

  const addPnrFieldReturn = () => {
    setPnrNumbersReturn([...pnrNumbersReturn, ""]);
  };

  const removePnrFieldReturn = (index) => {
    const updatedPnrNumbers = pnrNumbersReturn.filter((_, i) => i !== index);
    setPnrNumbersReturn(updatedPnrNumbers);
  };

  // Ticket Upload Handlers
  const handleUploadTicket = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
        copyToCacheDirectory: true,
      });

      if (result.canceled === false) {
        setTicket(result.assets[0]);
      }
    } catch (error) {
      console.log("Ticket upload error:", error);
    }
  };

  const handleRemoveTicket = () => {
    setTicket(null);
  };

  const handleUploadHotelBill = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
        copyToCacheDirectory: true,
      });

      if (result.canceled === false) {
        setHotelBill(result.assets[0]);
      }
    } catch (error) {
      console.log("Hotel bill upload error:", error);
    }
  };

  const handleRemoveHotelBill = () => {
    setHotelBill(null);
  };

  return {
    start_date,
    journeyDate,
    selectedDateType,
    showDatePicker,
    pnrNumbersStart,
    pnrNumbersReturn,
    ticket,
    hotelBill,
    onDateChange,
    handlePnrChangeStart,
    addPnrFieldStart,
    removePnrFieldStart,
    handlePnrChangeReturn,
    addPnrFieldReturn,
    removePnrFieldReturn,
    handleUploadTicket,
    handleRemoveTicket,
    handleUploadHotelBill,
    handleRemoveHotelBill,
    setSelectedDateType,
    setShowDatePicker,
    type,
    setType,
    city,
    setCity,
    destinationCity,
    setDestinationCity,
    isEditing,
    setIsEditing,
    description,
    setDescription,
    totalKm,
    setTotalKm,
    kmRate,
    setKmRate,
    rent,
    setRent,
    vehicleNo,
    setVehicleNo,
    department,
    setDepartment,
    employeeId,
    setEmployeeId,
    visitApprovedBy,
    setVisitApprovedBy,
    objective,
    setObjective,
    meetings,
    setMeetings,
    outcomes,
    setOutcomes,
    designation,
    setDesignation,
    transactions,
    setTransactions,
    pnrErrorsStart,
    setPnrErrorsStart,
    pnrErrorsReturn,
    setPnrErrorsReturn,
    handlePnrBlur,
  };
}
