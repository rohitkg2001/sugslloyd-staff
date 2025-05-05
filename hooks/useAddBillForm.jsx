// import { useState } from "react";
// import * as DocumentPicker from "expo-document-picker";
// import { useTranslation } from "react-i18next";

// export default function useAddBillForm() {
//   const [start_date, setStartDate] = useState(new Date());
//   const [journeyDate, setJourneyDate] = useState(new Date());
//   const [selectedDateType, setSelectedDateType] = useState(null);
//   const [showDatePicker, setShowDatePicker] = useState(false);
//   const [pnrNumbersStart, setPnrNumbersStart] = useState([""]);
//   const [pnrNumbersReturn, setPnrNumbersReturn] = useState([""]);
//   const [ticket, setTicket] = useState(null);
//   const [hotelBill, setHotelBill] = useState(null);
//   const [type, setType] = useState(null);
//   const [city, setCity] = useState(null);
//   const [destinationCity, setDestinationCity] = useState(null);
//   const [isEditing, setIsEditing] = useState(false);
//   const [description, setDescription] = useState("");
//   const [totalKm, setTotalKm] = useState("");
//   const [kmRate, setKmRate] = useState("");
//   const [rent, setRent] = useState("");
//   const [vehicleNo, setVehicleNo] = useState("");
//   const [department, setDepartment] = useState("");
//   const [employeeId, setEmployeeId] = useState("");
//   const [visitApprovedBy, setVisitApprovedBy] = useState("");
//   const [objective, setObjective] = useState("");
//   const [meetings, setMeetings] = useState("");
//   const [outcomes, setOutcomes] = useState("");
//   const [designation, setDesignation] = useState("");
//   const [errors, setErrors] = useState({ start: [], return: [] });

//   const [transactions, setTransactions] = useState([]);
//   const { t } = useTranslation();

//   const onDateChange = (event, selectedDate) => {
//     if (event.type === "set" && selectedDate) {
//       if (selectedDateType === "start") {
//         setStartDate(selectedDate);
//       } else if (selectedDateType === "return") {
//         setJourneyDate(selectedDate);
//       }
//     }
//     setShowDatePicker(false); // Close the picker after selection
//   };

//   const validatePnr = (value, index, journeyType) => {
//     let errorMessage = "";
//     if (type === "Train" && !/^\d{10}$/.test(value)) {
//       errorMessage = "PNR must be exactly 10 digits.";
//     } else if (type === "Flight" && !/^[A-Za-z0-9]{6}$/.test(value)) {
//       errorMessage = "PNR must be exactly 6-10 characters (alphanumeric).";
//     }

//     setErrors((prevErrors) => {
//       const updatedErrors = { ...prevErrors };
//       updatedErrors[journeyType][index] = errorMessage;
//       return { ...updatedErrors };
//     });
//   };

//   const handlePnrChangeStart = (value, index) => {
//     const updatedPnrNumbers = [...pnrNumbersStart];
//     updatedPnrNumbers[index] = value;
//     setPnrNumbersStart(updatedPnrNumbers);
//     validatePnr(value, index, "start");
//   };

//   const handlePnrChangeReturn = (value, index) => {
//     const updatedPnrNumbers = [...pnrNumbersReturn];
//     updatedPnrNumbers[index] = value;
//     setPnrNumbersReturn(updatedPnrNumbers);
//     validatePnr(value, index, "return");
//   };

//   const addPnrFieldStart = () => {
//     setPnrNumbersStart([...pnrNumbersStart, ""]);
//     setErrors((prev) => ({ ...prev, start: [...prev.start, ""] }));
//   };

//   const addPnrFieldReturn = () => {
//     setPnrNumbersReturn([...pnrNumbersReturn, ""]);
//     setErrors((prev) => ({ ...prev, return: [...prev.return, ""] }));
//   };

//   const removePnrFieldStart = (index) => {
//     const updatedPnrNumbers = pnrNumbersStart.filter((_, i) => i !== index);
//     setPnrNumbersStart(updatedPnrNumbers);
//     setErrors((prev) => ({
//       ...prev,
//       start: prev.start.filter((_, i) => i !== index),
//     }));
//   };

//   const removePnrFieldReturn = (index) => {
//     const updatedPnrNumbers = pnrNumbersReturn.filter((_, i) => i !== index);
//     setPnrNumbersReturn(updatedPnrNumbers);
//     setErrors((prev) => ({
//       ...prev,
//       return: prev.return.filter((_, i) => i !== index),
//     }));
//   };

//   // PNR Handlers for Start Journey
//   // const handlePnrChangeStart = (value, index) => {
//   //   const updatedPnrNumbers = [...pnrNumbersStart];
//   //   updatedPnrNumbers[index] = value;
//   //   setPnrNumbersStart(updatedPnrNumbers);
//   // };

//   // const addPnrFieldStart = () => {
//   //   setPnrNumbersStart([...pnrNumbersStart, ""]);
//   // };

//   // const removePnrFieldStart = (index) => {
//   //   const updatedPnrNumbers = pnrNumbersStart.filter((_, i) => i !== index);
//   //   setPnrNumbersStart(updatedPnrNumbers);
//   // };

//   // // PNR Handlers for Return Journey
//   // const handlePnrChangeReturn = (value, index) => {
//   //   const updatedPnrNumbers = [...pnrNumbersReturn];
//   //   updatedPnrNumbers[index] = value;
//   //   setPnrNumbersReturn(updatedPnrNumbers);
//   // };

//   // const addPnrFieldReturn = () => {
//   //   setPnrNumbersReturn([...pnrNumbersReturn, ""]);
//   // };

//   // const removePnrFieldReturn = (index) => {
//   //   const updatedPnrNumbers = pnrNumbersReturn.filter((_, i) => i !== index);
//   //   setPnrNumbersReturn(updatedPnrNumbers);
//   // };

//   // Ticket Upload Handlers
//   const handleUploadTicket = async () => {
//     try {
//       const result = await DocumentPicker.getDocumentAsync({
//         type: "application/pdf",
//         copyToCacheDirectory: true,
//       });

//       if (result.canceled === false) {
//         setTicket(result.assets[0]);
//       }
//     } catch (error) {
//      // console.log("Ticket upload error:", error);
//     }
//   };

//   const handleRemoveTicket = () => {
//     setTicket(null);
//   };

//   const handleUploadHotelBill = async () => {
//     try {
//       const result = await DocumentPicker.getDocumentAsync({
//         type: "application/pdf",
//         copyToCacheDirectory: true,
//       });

//       if (result.canceled === false) {
//         setHotelBill(result.assets[0]);
//       }
//     } catch (error) {
//       //console.log("Hotel bill upload error:", error);
//     }
//   };

//   const handleRemoveHotelBill = () => {
//     setHotelBill(null);
//   };

//   return {
//     start_date,
//     journeyDate,
//     selectedDateType,
//     showDatePicker,
//     pnrNumbersStart,
//     pnrNumbersReturn,
//     ticket,
//     hotelBill,
//     onDateChange,
//     handlePnrChangeStart,
//     addPnrFieldStart,
//     removePnrFieldStart,
//     handlePnrChangeReturn,
//     addPnrFieldReturn,
//     removePnrFieldReturn,
//     handleUploadTicket,
//     handleRemoveTicket,
//     handleUploadHotelBill,
//     handleRemoveHotelBill,
//     setSelectedDateType,
//     setShowDatePicker,
//     type,
//     setType,
//     city,
//     setCity,
//     destinationCity,
//     setDestinationCity,
//     isEditing,
//     setIsEditing,
//     description,
//     setDescription,
//     totalKm,
//     setTotalKm,
//     kmRate,
//     setKmRate,
//     rent,
//     setRent,
//     vehicleNo,
//     setVehicleNo,
//     department,
//     setDepartment,
//     employeeId,
//     setEmployeeId,
//     visitApprovedBy,
//     setVisitApprovedBy,
//     objective,
//     setObjective,
//     meetings,
//     setMeetings,
//     outcomes,
//     setOutcomes,
//     designation,
//     setDesignation,
//     transactions,
//     setTransactions,
//     errors,
//     setErrors,
//   };
// }

import { useState } from "react";
import * as DocumentPicker from "expo-document-picker";
import { useTranslation } from "react-i18next";

export default function useAddBillForm() {
  const [pickup_date, setPickupDate] = useState(new Date());
  const [end_journey, setEndJourney] = useState(new Date());
  const [selectedDateType, setSelectedDateType] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [start_journey_pnr, setStartJourneyPnr] = useState([""]);
  const [end_journey_pnr, setEndJourneyPnr] = useState([""]);
  const [startTicket, setStartTicket] = useState(null);
  const [endTicket, setEndTicket] = useState(null);
  const [category, setCategory] = useState(null);
  const [from_city, setFromCity] = useState(null);
  const [to_city, setToCity] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [description_category, setDescriptionCategory] = useState("");
  const [total_km, setTotalKm] = useState("");
  const [rate_per_km, setRatePerKm] = useState("");
  const [Rent, setRent] = useState("");
  const [vehicle_no, setVehicleNo] = useState("");
  const [department, setDepartment] = useState("");
  const [user_id, setUserId] = useState("");
  const [visit_approve, setVisitApprove] = useState("");
  const [objective_tour, setObjectiveTour] = useState("");
  const [meeting_visit, setMeetingVisit] = useState("");
  const [outcome_achieve, setOutcomeAchieve] = useState("");
  const [designation, setDesignation] = useState("");
  const [errors, setErrors] = useState({ start: [], return: [] });

  const [type, setType] = useState(null);

  const [transactions, setTransactions] = useState([]);
  const { t } = useTranslation();

  const onDateChange = (event, selectedDate) => {
    if (event.type === "set" && selectedDate) {
      if (selectedDateType === "start") {
        setPickupDate(selectedDate);
      } else if (selectedDateType === "return") {
        setEndJourney(selectedDate);
      }
    }
    setShowDatePicker(false);
  };

  const validatePnr = (value, index, journeyType) => {
    let errorMessage = "";
    if (category === "Train" && !/^\d{10}$/.test(value)) {
      errorMessage = "PNR must be exactly 10 digits.";
    } else if (category === "Flight" && !/^[A-Za-z0-9]{6,10}$/.test(value)) {
      errorMessage = "PNR must be exactly 6-10 characters (alphanumeric).";
    }

    setErrors((prevErrors) => {
      const updatedErrors = { ...prevErrors };
      updatedErrors[journeyType][index] = errorMessage;
      return { ...updatedErrors };
    });
  };

  const handlePnrChangeStart = (value, index) => {
    const updated = [...start_journey_pnr];
    updated[index] = value;
    setStartJourneyPnr(updated);
    validatePnr(value, index, "start");
  };

  const handlePnrChangeReturn = (value, index) => {
    const updated = [...end_journey_pnr];
    updated[index] = value;
    setEndJourneyPnr(updated);
    validatePnr(value, index, "return");
  };

  const addPnrFieldStart = () => {
    setStartJourneyPnr([...start_journey_pnr, ""]);
    setErrors((prev) => ({ ...prev, start: [...prev.start, ""] }));
  };

  const addPnrFieldReturn = () => {
    setEndJourneyPnr([...end_journey_pnr, ""]);
    setErrors((prev) => ({ ...prev, return: [...prev.return, ""] }));
  };

  const removePnrFieldStart = (index) => {
    const updated = start_journey_pnr.filter((_, i) => i !== index);
    setStartJourneyPnr(updated);
    setErrors((prev) => ({
      ...prev,
      start: prev.start.filter((_, i) => i !== index),
    }));
  };

  const removePnrFieldReturn = (index) => {
    const updated = end_journey_pnr.filter((_, i) => i !== index);
    setEndJourneyPnr(updated);
    setErrors((prev) => ({
      ...prev,
      return: prev.return.filter((_, i) => i !== index),
    }));
  };

  const handleUploadTicket = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
        copyToCacheDirectory: true,
      });

      if (result.canceled === false) {
        setStartTicket(result.assets[0]);
      }
    } catch (error) {
      // Handle error
    }
  };

  const handleRemoveTicket = () => {
    setStartTicket(null);
  };

  const handleUploadHotelBill = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
        copyToCacheDirectory: true,
      });

      if (result.canceled === false) {
        setEndTicket(result.assets[0]);
      }
    } catch (error) {
      // Handle error
    }
  };

  const handleRemoveHotelBill = () => {
    setEndTicket(null);
  };

  return {
    pickup_date,
    end_journey,
    selectedDateType,
    showDatePicker,
    start_journey_pnr,
    end_journey_pnr,
    startTicket,
    endTicket,
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
    category,
    setCategory,
    from_city,
    setFromCity,
    to_city,
    setToCity,
    isEditing,
    setIsEditing,
    description_category,
    setDescriptionCategory,
    total_km,
    setTotalKm,
    rate_per_km,
    setRatePerKm,
    Rent,
    setRent,
    vehicle_no,
    setVehicleNo,
    department,
    setDepartment,
    user_id,
    setUserId,
    visit_approve,
    setVisitApprove,
    objective_tour,
    setObjectiveTour,
    meeting_visit,
    setMeetingVisit,
    outcome_achieve,
    setOutcomeAchieve,
    designation,
    setDesignation,
    transactions,
    setTransactions,
    errors,
    setErrors,
    type,
    setType,
  };
}
