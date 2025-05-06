// // import All react Native
// import { useState } from "react";
// import {
//   View,
//   ScrollView,
//   TouchableOpacity,
//   TextInput,
//   Text,
// } from "react-native";
// import DateTimePicker from "@react-native-community/datetimepicker";
// import { useTranslation } from "react-i18next";
// import Icon from "react-native-vector-icons/Ionicons";

// // import Components
// import ContainerComponent from "../components/ContainerComponent";
// import MyHeader from "../components/header/MyHeader";
// import MyTextInput from "../components/input/MyTextInput";
// import MyPickerInput from "../components/input/MyPickerInput";

// import { useSelector, useDispatch } from "react-redux";
// import { addBill } from "../redux/actions/projectAction";

// // import Styles
// import { spacing, styles, typography, LIGHT } from "../styles";
// import { H2, H6, P, Span } from "../components/text";
// import Button from "../components/buttons/Button";
// import useAddBillForm from "../hooks/useAddBillForm";

// const AddBillForm = ({ navigation }) => {
//   const dispatch = useDispatch();
//   const { t } = useTranslation();
//   // Use all function in hooks useAddBillForm
//   const {
//     // start_date,
//     // journeyDate,
//     // selectedDateType,
//     // showDatePicker,
//     // pnrNumbersStart,
//     // pnrNumbersReturn,
//     // ticket,
//     // hotelBill,
//     // onDateChange,
//     // handlePnrChangeStart,
//     // addPnrFieldStart,
//     // removePnrFieldStart,
//     // handlePnrChangeReturn,
//     // addPnrFieldReturn,
//     // removePnrFieldReturn,
//     // handleUploadTicket,
//     // handleRemoveTicket,
//     // handleUploadHotelBill,
//     // handleRemoveHotelBill,
//     // setSelectedDateType,
//     // setShowDatePicker,
//     // type,
//     // setType,
//     // city,
//     // setCity,
//     // destinationCity,
//     // setDestinationCity,
//     // isEditing,
//     // setIsEditing,
//     // description,
//     // setDescription,
//     // totalKm,
//     // setTotalKm,
//     // kmRate,
//     // setKmRate,
//     // rent,
//     // setRent,
//     // vehicleNo,
//     // setVehicleNo,
//     // department,
//     // setDepartment,
//     // employeeId,
//     // setEmployeeId,
//     // visitApprovedBy,
//     // setVisitApprovedBy,
//     // objective,
//     // setObjective,
//     // meetings,
//     // setMeetings,
//     // outcomes,
//     // setOutcomes,
//     // designation,
//     // setDesignation,
//     // transactions,
//     // setTransactions,
//     // errors,
//     // setErrors,

//     pickup_date,
//     end_journey,
//     selectedDateType,
//     showDatePicker,
//     start_journey_pnr,
//     end_journey_pnr,
//     startTicket,
//     endTicket,
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
//     category,
//     setCategory,
//     from_city,
//     setFromCity,
//     to_city,
//     setToCity,
//     isEditing,
//     setIsEditing,
//     description_category,
//     setDescriptionCategory,
//     total_km,
//     setTotalKm,
//     rate_per_km,
//     setRatePerKm,
//     Rent,
//     setRent,
//     vehicle_no,
//     setVehicleNo,
//     department,
//     setDepartment,
//     user_id,
//     setUserId,
//     visit_approve,
//     setVisitApprove,
//     objective_tour,
//     setObjectiveTour,
//     meeting_visit,
//     setMeetingVisit,
//     outcome_achieve,
//     setOutcomeAchieve,
//     designation,
//     setDesignation,
//     transactions,
//     setTransactions,
//     errors,
//     setErrors,
//     type,
//     setType,
//   } = useAddBillForm();
//   const { firstName, lastName } = useSelector((state) => state.staff);

//   const addTransactionField = () => {
//     setTransactions([
//       ...transactions,
//       { amount: "", category: "", description: "", date: new Date() },
//     ]);
//   };

//   const handleTransactionChange = (value, index, field) => {
//     // Convert value to number
//     const amount = Number(value);

//     // Update state regardless of the amount
//     setTransactions((prevTransactions) => {
//       const updatedTransactions = [...prevTransactions];
//       updatedTransactions[index] = {
//         ...updatedTransactions[index],
//         [field]: value,
//       };
//       return updatedTransactions;
//     });
//   };

//   const removeTransactionField = (index) => {
//     const updatedTransactions = transactions.filter((_, i) => i !== index);
//     setTransactions(updatedTransactions);
//   };

//   const handleCalculateBill = async () => {
//     // Check if any Train PNR is less than 10 digits
//     const hasInvalidTrainPnr =
//       type === "Train" && pnrNumbersStart.some((pnr) => pnr.length !== 10);
//     if (hasInvalidTrainPnr) {
//       alert("Train PNR must be exactly 10 digits.");
//       return;
//     }

//     // Check if any Flight PNR is invalid (alphanumeric, 6-10 chars)
//     const hasInvalidFlightPnr =
//       type === "Flight" &&
//       pnrNumbersStart.some((pnr) => !/^[A-Za-z0-9]{6,10}$/.test(pnr));
//     if (hasInvalidFlightPnr) {
//       alert("Flight PNR must be exactly 6-10 alphanumeric characters.");
//       return;
//     }

//     const totalAmount = transactions.reduce(
//       (sum, transaction) => sum + parseFloat(transaction.amount || 0),
//       0
//     );

//     const categories = transactions
//       .map((transaction) => transaction.category)
//       .join(", ");
//     const descriptions = transactions
//       .map((transaction) => transaction.description)
//       .join("; ");

//     // Construct only the data needed for submission
//     const billPayload = {
//       pickup_date,
//       end_journey,
//       selectedDateType,
//       start_journey_pnr,
//       end_journey_pnr,
//       startTicket,
//       endTicket,
//       pnrNumbersStart,
//       pnrNumbersReturn,
//       ticket,
//       hotelBill,
//       from_city,
//       to_city,
//       type,
//       transactions,
//       totalAmount,
//       categories,
//       descriptions,
//       total_km,
//       rate_per_km,
//       Rent,
//       vehicle_no,
//       department,
//       user_id,
//       visit_approve,
//       objective_tour,
//       meeting_visit,
//       outcome_achieve,
//       designation,
//       description_category,
//     };

//     const result = await dispatch(addBill(billPayload));
//     if (result === true) {
//       console.log("Bill submitted successfully.");
//       navigation.navigate("travelDetailScreen", { formData: billPayload });
//     } else {
//       alert("Failed to submit the bill. Please try again.");
//     }
//   };

//   return (
//     <ContainerComponent>
//       <MyHeader title={t("Add Bill")} hasIcon={true} isBack={true} />
//       <ScrollView>
//         <View>
//           <MyTextInput
//             title={t("Name")}
//             value={`${firstName || ""} ${lastName || ""}`}
//             placeholder="Enter your first name"
//           />

//           <View
//             style={{ flexDirection: "row", justifyContent: "space-between" }}
//           >
//             <View style={{ width: "48%" }}>
//               <Text style={{ marginBottom: 5, fontWeight: "bold" }}>
//                 Department Name
//               </Text>
//               <TextInput
//                 placeholder="Department Name"
//                 value={department}
//                 onChangeText={(text) => setDepartment(text)}
//                 style={[
//                   spacing.br1,
//                   {
//                     backgroundColor: "#F0FAF0",
//                     borderWidth: 1,
//                     borderColor: "#ccc",
//                   },
//                 ]}
//               />
//             </View>

//             <View style={{ width: "45%", right: 12 }}>
//               <Text style={{ marginBottom: 5, fontWeight: "bold" }}>
//                 Employee ID
//               </Text>
//               <TextInput
//                 placeholder="Employee ID"
//                 value={user_id}
//                 onChangeText={(text) => setUserId(text)}
//                 style={[
//                   spacing.br1,
//                   {
//                     backgroundColor: "#F0FAF0",
//                     borderWidth: 1,
//                     borderColor: "#ccc",
//                   },
//                 ]}
//               />
//             </View>
//           </View>

//           <MyTextInput
//             title="Visit Approved By"
//             value={visit_approve}
//             onChangeText={(text) => setVisitApprove(text)}
//             placeholder="Enter approver's name"
//           />

//           <MyTextInput
//             title="Objective of the Tour"
//             value={objective_tour}
//             onChangeText={(text) => setObjectiveTour(text)}
//             placeholder="Enter objective of the tour"
//           />

//           <MyTextInput
//             title="Key Meetings/Visits"
//             value={meeting_visit}
//             onChangeText={(text) => setMeetingVisit(text)}
//             placeholder="Enter key meetings or visits"
//           />

//           <MyTextInput
//             title="Key Outcomes and Achievements"
//             value={outcome_achieve}
//             // onChange={setOutcomes}
//             onChangeText={(text) => setOutcomeAchieve(text)}
//             placeholder="Enter key outcomes and achievements"
//           />
//           <MyTextInput
//             title="Designation"
//             value={designation}
//             onChangeText={(text) => setDesignation(text)}
//             placeholder="Designation"
//           />

//           <View style={{ flexDirection: "row", padding: 10 }}>
//             {/* Start Journey Date */}
//             <TouchableOpacity
//               onPress={() => {
//                 setSelectedDateType("start");
//                 setShowDatePicker(true);
//               }}
//               style={{
//                 flex: 1,
//                 marginRight: 5,
//                 backgroundColor: "#F0FAF0",
//                 borderRadius: 8,
//                 padding: 10,
//                 flexDirection: "row",
//                 alignItems: "center",
//                 justifyContent: "space-between",
//                 borderWidth: 1,
//                 borderColor: "#ccc",
//               }}
//             >
//               <View>
//                 <Text style={{ fontSize: 12, marginBottom: 5 }}>
//                   Start Journey Date
//                 </Text>
//                 <Text style={{ fontSize: 16 }}>
//                   {pickup_date.toLocaleDateString()}
//                 </Text>
//               </View>
//               <Icon name="calendar-outline" size={20} color="#666" />
//             </TouchableOpacity>

//             {/* Return Journey Date */}
//             <TouchableOpacity
//               onPress={() => {
//                 setSelectedDateType("return");
//                 setShowDatePicker(true);
//               }}
//               style={{
//                 flex: 1,
//                 marginLeft: 5,
//                 backgroundColor: "#F0FAF0",
//                 borderRadius: 8,
//                 padding: 10,
//                 flexDirection: "row",
//                 alignItems: "center",
//                 justifyContent: "space-between",
//                 borderWidth: 1,
//                 borderColor: "#ccc",
//               }}
//             >
//               <View>
//                 <P
//                   style={[typography.font12, typography.fontLato, spacing.mb1]}
//                 >
//                   {t("Return Journey Date")}
//                 </P>
//                 <Text style={{ fontSize: 16 }}>
//                   {end_journey.toLocaleDateString()}
//                 </Text>
//               </View>
//               <Icon name="calendar-outline" size={20} color="#666" />
//             </TouchableOpacity>
//           </View>

//           {/* Show Date Picker only when triggered */}
//           {showDatePicker && (
//             <DateTimePicker
//               value={selectedDateType === "start" ? pickup_date : end_journey}
//               mode="date"
//               display="default"
//               onChange={(event, selectedDate) => {
//                 onDateChange(event, selectedDate);
//               }}
//             />
//           )}
//         </View>

// <MyPickerInput
//   title={t("Mode Of Transport")}
//   value={type}
//   onChange={setType}
//   options={[
//     { label: t("Bus"), value: "Bus" },
//     { label: t("Train"), value: "Train" },
//     { label: t("Flight"), value: "Flight" },
//   ]}
// />

//         {/* PNR and Ticket Upload Group */}
//         <View
//           style={[
//             spacing.bw1,
//             spacing.p1,
//             spacing.br2,
//             {
//               borderStyle: "dotted",
//               marginTop: 10,
//             },
//           ]}
//         >
//           <H6 style={[typography.font14, typography.fontLato, spacing.p2]}>
//             {t("Journey Ticket")}
//           </H6>

//           {/* {pnrNumbersStart.map((pnr, index) => (
//             <View key={index}>
//               <MyTextInput
//                 title={`PNR Number ${index + 1}`}
//                 value={pnr}
//                 onChangeText={(value) => handlePnrChangeStart(value, index)}
//                 placeholder="Upload Ticket & Enter PNR"
//               />
//               {errors.start[index] ? (
//                 <Text style={{ color: "red" }}>{errors.start[index]}</Text>
//               ) : null}
//               {pnrNumbersStart.length > 1 && (
//                 <TouchableOpacity onPress={() => removePnrFieldStart(index)}>
//                   <Text style={{ color: "red" }}>Remove</Text>
//                 </TouchableOpacity>
//               )}
//             </View>
//           ))} */}

//           <TouchableOpacity onPress={addPnrFieldStart}>
//             <Span style={[styles.rightLink, typography.fontLato]}>
//               {t("Add More PNR")}
//             </Span>
//           </TouchableOpacity>

//           {/* Ticket Upload Section */}
//           <TouchableOpacity
//             onPress={handleUploadTicket}
//             style={{ marginTop: spacing.mh2, alignItems: "center" }}
//           >
//             <H6
//               style={[
//                 typography.fontLato,
//                 spacing.p1,
//                 spacing.bw1,
//                 spacing.br1,
//                 spacing.mb2,
//                 typography.font16,
//                 {
//                   textAlign: "center",
//                   borderColor: "green",
//                   borderStyle: "dotted",
//                   backgroundColor: "#e8f5e9",
//                 },
//               ]}
//             >
//               {t("Upload Ticket")}
//             </H6>
//           </TouchableOpacity>

//           {/* {ticket && (
//             <View style={{ marginTop: 10, alignItems: "center" }}>
//               <H6 style={{ color: "green", fontSize: 14 }}>
//                 {t("Uploaded File")}: {ticket.name}
//               </H6>
//               <TouchableOpacity onPress={handleRemoveTicket}>
//                 <Span
//                   style={[
//                     styles.rightLink,
//                     typography.fontLato,
//                     spacing.bw1,
//                     {
//                       color: "red",
//                       borderColor: "green",
//                       borderStyle: "dotted",
//                     },
//                   ]}
//                 >
//                   {t("Remove")}
//                 </Span>
//               </TouchableOpacity>
//             </View>
//           )} */}
//         </View>
// <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
//   <View style={{ flex: 1, marginRight: 5 }}>
//     <MyPickerInput
//       title={t("From")}
//       value={from_city}
//       onChange={setFromCity}
//       options={[
//         { label: t("Patna"), value: "Patna" },
//         { label: t("Delhi"), value: "Delhi" },
//         { label: t("Mumbai"), value: "Mumbai" },
//         { label: t("Kolkata"), value: "Kolkata" },
//         { label: t("Chennai"), value: "Chennai" },
//         { label: t("Bangalore"), value: "Bangalore" },
//         { label: t("Hyderabad"), value: "Hyderabad" },
//         { label: t("Ahmedabad"), value: "Ahmedabad" },
//         { label: t("Pune"), value: "Pune" },
//       ]}
//     />
//   </View>

//   <View style={{ flex: 1, marginLeft: 5 }}>
//     <MyPickerInput
//       title={t("To")}
//       value={to_city}
//       onChange={setToCity}
//       options={[
//         { label: t("Patna"), value: "Patna" },
//         { label: t("Delhi"), value: "Delhi" },
//         { label: t("Mumbai"), value: "Mumbai" },
//         { label: t("Kolkata"), value: "Kolkata" },
//         { label: t("Chennai"), value: "Chennai" },
//         { label: t("Bangalore"), value: "Bangalore" },
//         { label: t("Hyderabad"), value: "Hyderabad" },
//         { label: t("Ahmedabad"), value: "Ahmedabad" },
//         { label: t("Pune"), value: "Pune" },
//       ]}
//     />
//   </View>
// </View>
//         {/* {pnrNumbersReturn.map((pnr, index) => (
//           <View key={index} style={{ marginBottom: 10 }}>
//             <MyTextInput
//               title={`PNR Number (Return) ${index + 1}`}
//               value={pnr}
//               onChangeText={(value) => handlePnrChangeReturn(value, index)}
//               placeholder="Enter PNR Number"
//             />
//             {errors.return[index] ? (
//               <Text style={{ color: "red" }}>{errors.return[index]}</Text>
//             ) : null}
//             {pnrNumbersReturn.length > 1 && (
//               <TouchableOpacity onPress={() => removePnrFieldReturn(index)}>
//                 <Text style={{ color: "red" }}>Remove</Text>
//               </TouchableOpacity>
//             )}
//           </View>
//         ))} */}
//         <TouchableOpacity onPress={addPnrFieldReturn}>
//           <Span style={[styles.rightLink, typography.fontLato]}>
//             {t("Add More PNR (Return)")}
//           </Span>
//         </TouchableOpacity>
//         <TouchableOpacity
//           onPress={addTransactionField}
//           style={{
//             alignSelf: "flex-end",
//           }}
//         >
//           <H6
//             style={[
//               styles.rightLink,
//               typography.font18,
//               typography.fontLato,
//               spacing.p1,
//             ]}
//           >
//             {t("Add Miscellaneous Bills")}
//           </H6>
//         </TouchableOpacity>
//         {transactions.map((transaction, index) => (
//           <View
//             key={index}
//             style={[
//               spacing.p2,
//               spacing.mb2,
//               {
//                 backgroundColor: LIGHT,
//                 elevation: 1,
//               },
//             ]}
//           >
//             <View style={[styles.row, spacing.p1]}>
//               {/* Total Km Input */}
//               <View
//                 style={[
//                   spacing.br2,
//                   spacing.p2,
//                   {
//                     flex: 1,
//                     backgroundColor: "#F0FAF0",
//                     borderWidth: 1,
//                     borderColor: "#ccc",
//                     position: "relative",
//                   },
//                 ]}
//               >
//                 <P style={[typography.font12]}>Total Km</P>
//                 <TextInput
//                   placeholder="Enter total km"
//                   keyboardType="numeric"
//                   value={total_km}
//                   onChangeText={(text) => setTotalKm(text)}
//                   maxLength={6}
//                   style={[typography.font14]}
//                 />
//                 {/* Character Counter */}
//                 <P
//                   style={[
//                     typography.font12,
//                     {
//                       position: "absolute",
//                       top: 75,
//                       right: 10,
//                     },
//                   ]}
//                 >
//                   {total_km.length}/5
//                 </P>
//               </View>

//               {/* Km Rate Input */}
//               <View
//                 style={[
//                   spacing.br2,
//                   spacing.p2,
//                   spacing.ml1,
//                   {
//                     flex: 1,
//                     backgroundColor: "#F0FAF0",
//                     borderWidth: 1,
//                     borderColor: "#ccc",
//                     position: "relative",
//                   },
//                 ]}
//               >
//                 <P style={[typography.font12]}>Km Rate</P>
//                 <TextInput
//                   placeholder="Enter rate per km"
//                   keyboardType="numeric"
//                   value={rate_per_km}
//                   onChangeText={(text) => setRatePerKm(text)}
//                   maxLength={6}
//                   style={[typography.font14]}
//                 />
//                 {/* Character Counter */}
//                 <Text
//                   style={{
//                     fontSize: 12,
//                     color: "#888",
//                     position: "absolute",
//                     // bottom: 5,
//                     top: 75,
//                     right: 10,
//                   }}
//                 >
//                   {rate_per_km.length}/6
//                 </Text>
//               </View>
//             </View>

//             <View style={[styles.row, spacing.p1, spacing.mt3]}>
//               {/* Rent */}
//               <View
//                 style={[
//                   spacing.br2,
//                   spacing.p2,
//                   {
//                     flex: 1,
//                     backgroundColor: "#F0FAF0",
//                     borderWidth: 1,
//                     borderColor: "#ccc",
//                   },
//                 ]}
//               >
//                 <P style={[typography.font12]}>Rent</P>
//                 <TextInput
//                   placeholder="Bus rent"
//                   value={Rent}
//                   onChangeText={(text) => setRent(text)}
//                   style={[typography.font14]}
//                 />
//               </View>

//               {/* Vehicle No */}
//               <View
//                 style={[
//                   spacing.br2,
//                   spacing.p2,
//                   spacing.ml1,
//                   {
//                     flex: 1,
//                     backgroundColor: "#F0FAF0",
//                     borderWidth: 1,
//                     borderColor: "#ccc",
//                   },
//                 ]}
//               >
//                 <P style={[typography.font12]}>Vehicle No</P>
//                 <TextInput
//                   placeholder="Vehicle No"
//                   keyboardType="numeric"
//                   value={vehicle_no}
//                   onChangeText={(text) => setVehicleNo(text)}
//                   style={[typography.font14]}
//                 />
//               </View>
//             </View>

//             <View style={{ position: "relative" }}>
//               <MyTextInput
//                 title={t("How Much")}
//                 value={transaction.amount}
//                 onChangeText={(value) =>
//                   handleTransactionChange(value, index, "amount")
//                 }
//                 placeholder={t(" ₹ Enter Amount")}
//                 keyboardType="numeric"
//                 style={{
//                   borderWidth: 1,
//                   borderColor:
//                     transaction.amount && parseInt(transaction.amount) >= 5000
//                       ? "red"
//                       : "gray",
//                   borderRadius: 5,
//                   paddingHorizontal: 10,
//                   paddingRight: 30,
//                 }}
//               />

//               {transaction.amount && parseInt(transaction.amount) >= 5000 && (
//                 <Text
//                   style={{
//                     position: "absolute",
//                     right: 10,
//                     top: "50%",
//                     transform: [{ translateY: -10 }],
//                     color: "red",
//                     fontSize: 18,
//                   }}
//                 >
//                   ❗
//                 </Text>
//               )}

//               {transaction.amount && parseInt(transaction.amount) >= 5000 && (
//                 <Text style={{ color: "red", marginTop: 5, fontSize: 14 }}>
//                   Amount cannot be ₹5000 or more!
//                 </Text>
//               )}
//             </View>

//             <View style={[spacing.mb2]}>
//               {/* Category & Description Row */}
//               <View style={{ flexDirection: "row", alignItems: "center" }}>
//                 <View style={{ flex: 0.6, marginRight: 4 }}>
//                   <MyPickerInput
//                     title={t("Category")}
//                     value={transaction.category}
//                     onChange={(value) =>
//                       handleTransactionChange(value, index, "category")
//                     }
//                     options={[
//                       { label: t("Food"), value: "Food" },
//                       { label: t("Transport"), value: "Transport" },
//                     ]}
//                   />
//                 </View>

//                 {/* Description Button */}
//                 <View style={{ flex: 0.4, marginLeft: 4 }}>
//                   <TouchableOpacity
//                     onPress={() => setIsEditing(true)}
//                     style={[
//                       spacing.pv3,
//                       spacing.ph3,
//                       spacing.br1,
//                       {
//                         flexDirection: "row",
//                         alignItems: "center",
//                         borderWidth: 1,
//                         borderColor: "#ccc",
//                         backgroundColor: LIGHT,
//                         top: 10,
//                       },
//                     ]}
//                   >
//                     <Icon name="chatbox-ellipses" size={24} color="#76885B" />
//                     <P style={[spacing.ml2, {}]}>{t("Description")}</P>
//                   </TouchableOpacity>
//                 </View>
//               </View>

//               {isEditing && (
//                 <View style={[spacing.mt3, { position: "relative" }]}>
//                   <MyTextInput
//                     title={t("Description")}
//                     value={description_category}
//                     onChangeText={(value) => {
//                       if (value.length <= 500) {
//                         setDescriptionCategory(value);
//                         handleTransactionChange(value, index, "description");
//                       }
//                     }}
//                     placeholder={t("Enter Description")}
//                     multiline={true}
//                     style={[
//                       {
//                         minHeight: 80,
//                         borderColor: "#ccc",
//                         textAlignVertical: "top",
//                       },
//                     ]}
//                     onBlur={() => setIsEditing(false)}
//                     autoFocus={true}
//                   />

//                   <P
//                     style={[
//                       typography.font10,
//                       typography.fontLato,
//                       {
//                         position: "absolute",
//                         bottom: -38,
//                         right: 5,
//                       },
//                     ]}
//                   >
//                     {description.length}/500
//                   </P>
//                 </View>
//               )}
//             </View>

//             {/* Pickup Date */}
//             <View style={[spacing.mt5]}>
//               <TouchableOpacity onPress={() => setShowDatePicker(true)}>
//                 <MyTextInput
//                   title={t("Pickup Date")}
//                   value={transaction.date.toLocaleDateString()}
//                   placeholder={t("Select Pickup Date")}
//                   editable={false}
//                 />
//               </TouchableOpacity>
//             </View>

//             {/* Remove & Add More Buttons */}
//             <View
//               style={{
//                 flexDirection: "row",
//                 justifyContent: "space-between",
//                 marginTop: 10,
//               }}
//             >
//               <TouchableOpacity onPress={() => removeTransactionField(index)}>
//                 <P style={{ color: "red", fontWeight: "bold" }}>
//                   {t("Remove")}
//                 </P>
//               </TouchableOpacity>
//               <TouchableOpacity onPress={addTransactionField}>
//                 <P style={{ color: "#76885B", fontWeight: "bold" }}>
//                   {t("Add More Miscellaneous Bills")}
//                 </P>
//               </TouchableOpacity>
//             </View>
//           </View>
//         ))}
//         {/* Date Picker */}
//         {showDatePicker && (
//           <DateTimePicker
//             value={new Date()}
//             mode="date"
//             display="default"
//             onChange={onDateChange}
//           />
//         )}
//         <View
//           style={[
//             spacing.bw1,
//             spacing.br2,
//             spacing.p2,
//             spacing.mt1,
//             {
//               borderColor: "#ccc",
//             },
//           ]}
//         >
//           {/* Hotel Bill Upload Section */}
//           <View
//             style={[
//               spacing.p3,
//               spacing.bw1,
//               spacing.br2,
//               {
//                 marginTop: spacing.mh2,
//                 alignItems: "center",
//                 borderStyle: "dotted",
//                 backgroundColor: "#e8f5e9",
//               },
//             ]}
//           >
//             <TouchableOpacity onPress={handleUploadHotelBill}>
//               <H6
//                 style={[
//                   typography.textBold,
//                   {
//                     textAlign: "center",
//                   },
//                 ]}
//               >
//                 {t("Upload Hotel Bill")}
//               </H6>
//             </TouchableOpacity>

//             {/* {hotelBill && (
//               <View
//                 style={[
//                   spacing.mt2,
//                   spacing.p1,
//                   spacing.br1,
//                   {
//                     alignItems: "center",
//                     backgroundColor: "#f1f8e9",
//                     borderWidth: 0.2,
//                   },
//                 ]}
//               >
//                 <H6 style={[typography.font14, typography.fontLato]}>
//                   {t("Uploaded File")}: {hotelBill.name}
//                 </H6>
//                 <TouchableOpacity onPress={handleRemoveHotelBill}>
//                   <Span
//                     style={[
//                       styles.rightLink,
//                       typography.fontLato,
//                       {
//                         color: "red",
//                         marginTop: 6,
//                         textDecorationLine: "underline",
//                       },
//                     ]}
//                   >
//                     {t("Remove")}
//                   </Span>
//                 </TouchableOpacity>
//               </View>
//             )} */}
//           </View>
//         </View>
// <Button
//   style={[
//     styles.btn,
//     styles.bgPrimary,
//     { justifyContent: "center", top: 4 },
//   ]}
//   onPress={handleCalculateBill}
// >
//   <H2 style={[styles.btnText, styles.textLarge, typography.textLight]}>
//     {"Calculate Bill"}
//   </H2>
// </Button>
//       </ScrollView>

//       {showDatePicker && (
//         <DateTimePicker
//           value={selectedDateType === "start" ? start_date : journeyDate}
//           mode="date"
//           display="default"
//           onChange={onDateChange}
//         />
//       )}
//     </ContainerComponent>
//   );
// };

// export default AddBillForm;

import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Alert,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { useDispatch } from "react-redux";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import ContainerComponent from "../components/ContainerComponent";
import MyHeader from "../components/header/MyHeader";
import { addBill } from "../redux/actions/projectAction";
import MyTextInput from "../components/input/MyTextInput";
import MyPickerInput from "../components/input/MyPickerInput";
import Icon from "react-native-vector-icons/FontAwesome";
import Button from "../components/buttons/Button";
import { styles, typography } from "../styles";
import { H2 } from "../components/text";
const AddBillForm = ({ navigation }) => {
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    user_id: "",
    visit_approve: "",
    objective_tour: "",
    meeting_visit: "",
    outcome_achieve: "",
    start_journey: "",
    end_journey: "",
    transport: "Train",
    start_journey_pnr: "",
    end_journey_pnr: "",
    from_city: "",
    to_city: "",
    total_km: "",
    rate_per_km: "",
    Rent: "",
    vehicle_no: "",
    category: "Train",
    description_category: "",
    pickup_date: "",
  });

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const [datePicker, setDatePicker] = useState({
    show: false,
    mode: "date",
    field: "",
  });

  // const handleChange = (field, value) => {
  //   setForm({ ...form, [field]: value });
  // };

  const showDatePicker = (field) => {
    setDatePicker({ show: true, mode: "date", field });
  };

  const onDateChange = (event, selectedDate) => {
    setDatePicker({ ...datePicker, show: false });

    if (selectedDate) {
      const formatted = selectedDate.toISOString().split("T")[0]; // YYYY-MM-DD
      handleChange(datePicker.field, formatted);
    }
  };

  // Helper to validate YYYY-MM-DD
  const isValidDate = (dateString) => {
    return /^\d{4}-\d{2}-\d{2}$/.test(dateString);
  };

  const handleSubmit = async () => {
    const requiredDates = ["start_journey", "end_journey", "pickup_date"];
    for (let key of requiredDates) {
      if (!isValidDate(form[key])) {
        Alert.alert(
          "Invalid Date",
          `${key.replace("_", " ")} must be in YYYY-MM-DD format.`
        );
        return;
      }
    }

    if (isNaN(Number(form.Rent))) {
      Alert.alert("Invalid Rent", "Rent must be a number.");
      return;
    }

    const payload = {
      ...form,
      user_id: Number(form.user_id),
      total_km: Number(form.total_km),
      rate_per_km: Number(form.rate_per_km),
      Rent: Number(form.Rent),
      start_journey_pnr: [form.start_journey_pnr],
      end_journey_pnr: [form.end_journey_pnr],
    };

    try {
      const result = await dispatch(addBill(payload));
      if (result === true) {
        console.log("Submitted bill data:", payload);
        navigation.navigate("travelManagement", { formData: payload });
      } else {
        Alert.alert("Error", "Failed to submit the bill. Please try again.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      Alert.alert("Error", "Unexpected error occurred.");
    }
  };

  return (
    <ContainerComponent>
      <MyHeader title={"Add Bill"} hasIcon={true} isBack={true} />
      <ScrollView>
        <View>
          <MyTextInput
            title="User Id"
            value={form.user_id}
            onChangeText={(text) => handleChange("user_id", text)}
            placeholder="User ID"
          />
        </View>

        <MyTextInput
          title="Visit Approved"
          value={form.visit_approve}
          onChangeText={(text) => handleChange("visit_approve", text)}
          placeholder="Visit Approved (Yes/No)"
        />

        <MyTextInput
          title="Objective of Tour"
          value={form.objective_tour}
          onChangeText={(text) => handleChange("objective_tour", text)}
          placeholder="Objective of Tour"
        />

        <MyTextInput
          title="Meeting/Visit Location"
          value={form.meeting_visit}
          onChangeText={(text) => handleChange("meeting_visit", text)}
          placeholder="Meeting/Visit Location"
        />

        <MyTextInput
          title="Outcome Achieved"
          value={form.outcome_achieve}
          onChangeText={(text) => handleChange("outcome_achieve", text)}
          placeholder="Outcome Achieved"
        />

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 10,
          }}
        >
          {/* 📅 Pickup Date */}
          {/* <View style={{ flex: 1, marginLeft: 5 }}>
            <Text>Pickup Date</Text>
            <Pressable
              onPress={() => showDatePicker("pickup_date")}
              style={{
                borderWidth: 1,
                borderColor: "#ccc",
                padding: 8,
                borderRadius: 5,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                backgroundColor: "#F0FAF0",
              }}
            >
              <Text>{form.pickup_date || "Select Pickup Date"}</Text>
              <Icon name="calendar" size={18} color="#555" />
            </Pressable>
          </View> */}
          {/* 📅 Start Journey Date */}
          <View style={{ marginBottom: 10 }}>
            <Text>Start Journey Date</Text>
            <Pressable
              onPress={() => showDatePicker("start_journey")}
              style={{
                borderWidth: 1,
                borderColor: "#ccc",
                padding: 8,
                borderRadius: 5,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text>{form.start_journey || "Start Journey Date"}</Text>
              <Icon name="calendar" size={18} color="#555" />
            </Pressable>
          </View>

          {/* 📅 End Journey Date */}
          <View style={{ flex: 1, marginRight: 5 }}>
            <Text>End Journey Date</Text>
            <Pressable
              onPress={() => showDatePicker("end_journey")}
              style={{
                borderWidth: 1,
                borderColor: "#ccc",
                padding: 8,
                borderRadius: 5,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                backgroundColor: "#F0FAF0",
              }}
            >
              <Text>{form.end_journey || "End Journey Date"}</Text>
              <Icon name="calendar" size={18} color="#555" />
            </Pressable>
          </View>
        </View>

        {datePicker.show && (
          <DateTimePicker
            value={new Date()}
            mode="date"
            display="default"
            onChange={onDateChange}
          />
        )}

        <View style={{ marginBottom: 10 }}>
          <Text>Start Journey PNR</Text>
          <TextInput
            value={form.start_journey_pnr}
            onChangeText={(text) => handleChange("start_journey_pnr", text)}
            placeholder="Start Journey PNR"
            style={{
              borderWidth: 1,
              borderColor: "#ccc",
              padding: 8,
              borderRadius: 5,
            }}
          />
        </View>

        <View style={{ marginBottom: 10 }}>
          <Text>End Journey PNR</Text>
          <TextInput
            value={form.end_journey_pnr}
            onChangeText={(text) => handleChange("end_journey_pnr", text)}
            placeholder="End Journey PNR"
            style={{
              borderWidth: 1,
              borderColor: "#ccc",
              padding: 8,
              borderRadius: 5,
            }}
          />
        </View>

        {/* <MyTextInput
          title="From City"
          value={form.from_city}
          onChangeText={(text) => handleChange("from_city", text)}
          placeholder="From City"
        />

        <MyTextInput
          title="To city"
          value={form.to_city}
          onChangeText={(text) => handleChange("to_city", text)}
          placeholder="To City"
        /> */}

        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={{ flex: 1, marginRight: 5 }}>
            <MyPickerInput
              title={"From"}
              value={form.from_city}
              // onChange={setFromCity}
              onChange={(text) => handleChange("from_city", text)}
              options={[
                { label: "Patna", value: "Patna" },
                { label: "Delhi", value: "Delhi" },
                { label: "Mumbai", value: "Mumbai" },
                { label: "Kolkata", value: "Kolkata" },
                { label: "Chennai", value: "Chennai" },
                { label: "Bangalore", value: "Bangalore" },
                { label: "Hyderabad", value: "Hyderabad" },
                { label: "Ahmedabad", value: "Ahmedabad" },
                { label: "Pune", value: "Pune" },
              ]}
            />
          </View>

          <View style={{ flex: 1, marginLeft: 5 }}>
            <MyPickerInput
              title={"To"}
              // value={to_city}
              // onChange={setToCity}
              value={form.to_city}
              onChange={(text) => handleChange("to_city", text)}
              options={[
                { label: "Patna", value: "Patna" },
                { label: "Delhi", value: "Delhi" },
                { label: "Mumbai", value: "Mumbai" },
                { label: "Kolkata", value: "Kolkata" },
                { label: "Chennai", value: "Chennai" },
                { label: "Bangalore", value: "Bangalore" },
                { label: "Hyderabad", value: "Hyderabad" },
                { label: "Ahmedabad", value: "Ahmedabad" },
                { label: "Pune", value: "Pune" },
              ]}
            />
          </View>
        </View>

        <View style={{ marginBottom: 10 }}>
          <Text>Total KM</Text>
          <TextInput
            value={form.total_km}
            onChangeText={(text) => handleChange("total_km", text)}
            placeholder="Total KM"
            keyboardType="numeric"
            maxLength={6}
            style={{
              borderWidth: 1,
              borderColor: "#ccc",
              padding: 8,
              borderRadius: 5,
            }}
          />
        </View>

        <View style={{ marginBottom: 10 }}>
          <Text>Rate per KM</Text>
          <TextInput
            value={form.rate_per_km}
            onChangeText={(text) => handleChange("rate_per_km", text)}
            placeholder="Rate per KM"
            keyboardType="numeric"
            maxLength={6}
            style={{
              borderWidth: 1,
              borderColor: "#ccc",
              padding: 8,
              borderRadius: 5,
            }}
          />
        </View>

        <View style={{ marginBottom: 10 }}>
          <Text>Rent</Text>
          <TextInput
            value={form.Rent}
            onChangeText={(text) => handleChange("Rent", text)}
            placeholder="Rent"
            keyboardType="numeric"
            style={{
              borderWidth: 1,
              borderColor: "#ccc",
              padding: 8,
              borderRadius: 5,
            }}
          />
        </View>

        <View style={{ marginBottom: 10 }}>
          <Text>Vehicle No</Text>
          <TextInput
            value={form.vehicle_no}
            onChangeText={(text) => handleChange("vehicle_no", text)}
            placeholder="Vehicle No"
            style={{
              borderWidth: 1,
              borderColor: "#ccc",
              padding: 8,
              borderRadius: 5,
            }}
          />
        </View>

        <View style={{ marginBottom: 10 }}>
          <Text>Category Description</Text>
          <TextInput
            value={form.description_category}
            onChangeText={(text) => handleChange("description_category", text)}
            placeholder="Category Description"
            style={{
              borderWidth: 1,
              borderColor: "#ccc",
              padding: 8,
              borderRadius: 5,
            }}
          />
        </View>

        <View style={{ marginBottom: 10 }}>
          <Text>Pickup Date (YYYY-MM-DD)</Text>
          <TextInput
            placeholder="YYYY-MM-DD"
            value={form.pickup_date}
            onChangeText={(text) => handleChange("pickup_date", text)}
            style={{
              borderWidth: 1,
              borderColor: "#ccc",
              padding: 8,
              borderRadius: 5,
            }}
          />
        </View>

        {/* Dropdown for Transport */}
        {/* <View style={{ marginBottom: 15 }}>
          <Text>Transport</Text>
          <MyPickerInput
            selectedValue={form.transport}
            onValueChange={(val) => handleChange("transport", val)}
          >
            <Picker.Item label="Train" value="Train" />
            <Picker.Item label="Flight" value="Flight" />
            <Picker.Item label="Bus" value="Bus" />
            <Picker.Item label="Car" value="Car" />
          </MyPickerInput>
        </View> */}

        <MyPickerInput
          title={"Mode Of Transport"}
          value={form.transport}
          onChange={(val) => handleChange("transport", val)}
          options={[
            { label: "Bus", value: "Bus" },
            { label: "Train", value: "Train" },
            { label: "Flight", value: "Flight" },
          ]}
        />

        {/* Submit Button */}
        {/* <TouchableOpacity
          onPress={handleSubmit}
          style={{
            backgroundColor: "#007bff",
            padding: 12,
            borderRadius: 5,
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#fff", fontSize: 16 }}>Submit Bill</Text>
        </TouchableOpacity> */}
        <Button
          style={[
            styles.btn,
            styles.bgPrimary,
            { justifyContent: "center", top: 4 },
          ]}
          onPress={handleSubmit}
        >
          <H2 style={[styles.btnText, styles.textLarge, typography.textLight]}>
            {"Calculate Bill"}
          </H2>
        </Button>
      </ScrollView>
    </ContainerComponent>
  );
};

export default AddBillForm;
