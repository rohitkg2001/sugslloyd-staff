import { useState } from "react";
import * as DocumentPicker from "expo-document-picker";
import { useTranslation } from "react-i18next";

export default function useAddBillForm() {
  // const [start_date, setStartDate] = useState(new Date());
  // const [journeyDate, setJourneyDate] = useState(new Date());
  // const [selectedDateType, setSelectedDateType] = useState("start");
  // const [showDatePicker, setShowDatePicker] = useState(false);
  const [start_date, setStartDate] = useState(new Date());
  const [journeyDate, setJourneyDate] = useState(new Date());
  const [selectedDateType, setSelectedDateType] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [pnrNumbersStart, setPnrNumbersStart] = useState([""]);
  const [pnrNumbersReturn, setPnrNumbersReturn] = useState([""]);
  const [ticket, setTicket] = useState(null);
  const [hotelBill, setHotelBill] = useState(null);
  const { t } = useTranslation();

  // const onDateChange = (event, selectedDate) => {
  //   const currentDate =
  //     selectedDate || (selectedDateType === "start" ? start_date : journeyDate);
  //   setShowDatePicker(false);

  //   if (selectedDateType === "start") {
  //     setStartDate(currentDate);
  //   } else {
  //     setJourneyDate(currentDate);
  //   }
  // };

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

  // PNR Handlers for Start Journey
  const handlePnrChangeStart = (value, index) => {
    const updatedPnrNumbers = [...pnrNumbersStart];
    updatedPnrNumbers[index] = value;
    setPnrNumbersStart(updatedPnrNumbers);
  };

  const addPnrFieldStart = () => {
    setPnrNumbersStart([...pnrNumbersStart, ""]);
  };

  const removePnrFieldStart = (index) => {
    const updatedPnrNumbers = pnrNumbersStart.filter((_, i) => i !== index);
    setPnrNumbersStart(updatedPnrNumbers);
  };

  // PNR Handlers for Return Journey
  const handlePnrChangeReturn = (value, index) => {
    const updatedPnrNumbers = [...pnrNumbersReturn];
    updatedPnrNumbers[index] = value;
    setPnrNumbersReturn(updatedPnrNumbers);
  };

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
  };
}
