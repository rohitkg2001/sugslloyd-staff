import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Alert,
  TouchableOpacity,
  Pressable,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { useDispatch } from "react-redux";
import DateTimePicker from "@react-native-community/datetimepicker";
import ContainerComponent from "../components/ContainerComponent";
import MyHeader from "../components/header/MyHeader";
import MyTextInput from "../components/input/MyTextInput";
import MyPickerInput from "../components/input/MyPickerInput";
import Icon from "react-native-vector-icons/FontAwesome";
import Button from "../components/buttons/Button";
import { styles, typography, spacing } from "../styles";
import { H2, Span, H6 } from "../components/text";
import { addBill } from "../redux/actions/projectAction";
const AddBillForm = ({ navigation }) => {
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    user_id: "",
    visit_approve: "",
    objective_tour: "",
    meeting_visit: "",
    outcome_achieve: "",
    start_journey: "",
    start_journey_time: "",
    end_journey: "",
    end_journey_time: "",
    transport: "Train",
    start_journey_pnr: "",
    end_journey_pnr: "",
    from_city: "",
    to_city: "",
    total_km: "",
    rate_per_km: "",
    Rent: "",
    vehicle_no: "",
    category: "Training",
    description_category: "",
    otherexpense: {
      meal: 0,
      parking: 0,
    },
    travelfare: [],
    dailyfare: [],
  });

  const [ticket, setTicket] = useState(null);
  const [hotelBill, setHotelBill] = useState(null);
  const [errors, setErrors] = useState({ start: [""], end: [""] });
  const [start_journey_pnr, setStartJourneyPnr] = useState("");
  const [end_journey_pnr, setEndJourneyPnr] = useState("");

  const [datePicker, setDatePicker] = useState({
    show: false,
    mode: "date",
    field: "",
    index: null,
  });
  const [formFields, setFormFields] = useState([
    {
      from: "",
      to: "",
      departure_date: "",
      departure_time: "",
      arrival_date: "",
      arrival_time: "",
      modeoftravel: "",
      add_total_km: "",
      add_rate_per_km: "",
      add_rent: "",
      add_vehicle_no: "",
      amount: "",
    },
  ]);

  const [dailyFareFields, setDailyFareFields] = useState([
    {
      place: "",
      HotelBillNo: "",
      date_of_stay: "",
      amount: "",
    },
  ]);

  const addTransactionField = () => {
    setFormFields([
      ...formFields,
      {
        from: "",
        to: "",
        departure_date: "",
        departure_time: "",
        arrival_date: "",
        arrival_time: "",
        modeoftravel: "",
        add_total_km: "",
        add_rate_per_km: "",
        add_rent: "",
        add_vehicle_no: "",
        amount: "",
      },
    ]);
  };

  const removeTransactionField = (index) => {
    const newFields = [...formFields];
    newFields.splice(index, 1);
    setFormFields(newFields);
  };

  const handleChange = (field, value, index = null) => {
    if (index !== null) {
      // Handles dynamic transport entry updates
      const updatedFields = [...formFields];
      updatedFields[index][field] = value;
      setFormFields(updatedFields);
    } else {
      //  Handles main form updates
      setForm({ ...form, [field]: value });
    }
  };

  const showDatePicker = (field, index = null) => {
    // Include index to determine if it's a transport field
    setDatePicker({ show: true, mode: "date", field, index });
  };

  const onDateChange = (event, selectedDate) => {
    setDatePicker({ ...datePicker, show: false });

    if (selectedDate) {
      const formatted = selectedDate.toISOString().split("T")[0]; //  Format to YYYY-MM-DD

      // Use index to decide whether to update form or formFields
      if (datePicker.index !== null) {
        handleChange(datePicker.field, formatted, datePicker.index);
      } else {
        handleChange(datePicker.field, formatted);
      }
    }
  };

  const isValidDate = (dateString) => {
    return /^\d{4}-\d{2}-\d{2}$/.test(dateString);
  };

  const handlePnrChangeStart = (value) => {
    setStartJourneyPnr(value); // Directly set the string value
    const updatedErrors = { ...errors };
    updatedErrors.start = value.trim() === "" ? "PNR is required" : "";
    setErrors(updatedErrors);
  };
  const addPnrFieldStart = () => {
    setStartJourneyPnr([...start_journey_pnr, ""]);
    setErrors((prev) => ({
      ...prev,
      start: [...prev.start, ""],
    }));
  };

  const removePnrFieldStart = (index) => {
    const updated = [...start_journey_pnr];
    updated.splice(index, 1);
    setStartJourneyPnr(updated);

    const updatedErrors = { ...errors };
    updatedErrors.start.splice(index, 1);
    setErrors(updatedErrors);
  };

  const handlePnrChangeEnd = (value) => {
    setEndJourneyPnr(value); // Directly set the string value
    const updatedErrors = { ...errors };
    updatedErrors.end = value.trim() === "" ? "PNR is required" : "";
    setErrors(updatedErrors);
  };
  const addPnrFieldEnd = () => {
    setEndJourneyPnr([...end_journey_pnr, ""]);
    setErrors((prev) => ({
      ...prev,
      end: [...prev.end, ""],
    }));
  };

  const removePnrFieldEnd = (index) => {
    const updated = [...end_journey_pnr];
    updated.splice(index, 1);
    setEndJourneyPnr(updated);

    const updatedErrors = { ...errors };
    updatedErrors.end.splice(index, 1);
    setErrors(updatedErrors);
  };

  const handleUploadTicket = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
      });

      if (result.type === "success") {
        setTicket({ name: result.name, uri: result.uri });
      }
    } catch (err) {
      console.log("Error picking document:", err);
    }
  };

  const handleRemoveTicket = () => {
    setTicket(null);
  };
  // hotel bill
  const handleUploadHotelBill = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
      });

      if (result.type === "success") {
        setHotelBill({ name: result.name, uri: result.uri });
      }
    } catch (err) {
      console.log("Document pick error:", err);
    }
  };

  const handleRemoveHotelBill = () => {
    setHotelBill(null);
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        user_id: Number(form.user_id) || 0,
        visit_approve: form.visit_approve || "",
        objective_tour: form.objective_tour || "",
        meeting_visit: form.meeting_visit || "",
        outcome_achieve: form.outcome_achieve || "",
        start_journey: form.start_journey || "",
        start_journey_time: form.start_journey_time || "",
        end_journey: form.end_journey || "",
        end_journey_time: form.end_journey_time || "",
        transport: form.transport || "",
        start_journey_pnr: start_journey_pnr,
        end_journey_pnr: end_journey_pnr,
        from_city: form.from_city || "",
        to_city: form.to_city || "",
        total_km: Number(form.total_km) || 0,
        rate_per_km: Number(form.rate_per_km) || 0,
        Rent: Number(form.Rent) || 0,
        vehicle_no: form.vehicle_no || "",
        category: form.category || "",
        description_category: form.description_category || "",
        otherexpense: {
          meal: Number(form.otherexpense?.meal) || 0,
          parking: Number(form.otherexpense?.parking) || 0,
        },
        travelfare: formFields.map((item) => ({
          from: item?.from || "",
          to: item?.to || "",
          departure_date: item?.departure_date || "",
          departure_time: item?.departure_time || "",
          arrival_date: item?.arrival_date || "",
          arrival_time: item?.arrival_time || "",
          modeoftravel: item?.modeoftravel || "",
          add_total_km: Number(item?.add_total_km) || 0,
          add_rate_per_km: Number(item?.add_rate_per_km) || 0,
          add_rent: Number(item?.add_rent) || 0,
          add_vehicle_no: item?.add_vehicle_no || "",
          amount: Number(item?.amount) || 0,
        })),
        dailyfare: dailyFareFields.map((item) => ({
          place: item?.place || "",
          HotelBillNo: item?.HotelBillNo || "",
          date_of_stay: item?.date_of_stay || "",
          amount: Number(item?.amount) || 0,
        })),
      };

      console.log("Payload to submit:", payload);

      const success = await dispatch(addBill(payload));
      if (success) {
        Alert.alert("Success", "Bill submitted successfully!");
      } else {
        Alert.alert("Error", "Failed to submit the bill. Please try again.");
      }
    } catch (error) {
      console.error("Submit Error:", error);
      Alert.alert("Error", "An unexpected error occurred.");
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
          {/* Start Journey Date */}
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
                backgroundColor: "#F0FAF0",
              }}
            >
              <Text>{form.start_journey || "Start Journey Date"}</Text>
              <Icon name="calendar" size={18} color="#555" />
            </Pressable>
          </View>

          {/*  End Journey Date */}
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

        <View
          style={[
            spacing.bw1,
            spacing.p1,
            spacing.br2,
            { borderStyle: "dotted", marginTop: 10 },
          ]}
        >
          <H6 style={[typography.font14, typography.fontLato, spacing.p2]}>
            Journey Ticket
          </H6>

          {/* Start Journey PNR Fields */}
          {/* {start_journey_pnr.map((pnr, index) => (
            <View key={index}>
              <MyTextInput
                title={`Start Journey PNR ${index + 1}`}
                value={start_journey_pnr}
                //  onChangeText={(value) => handlePnrChangeStart(value, index)}
                onChangeText={setStartJourneyPnr}
                placeholder="Start Journey Enter PNR"
              />
              {errors.start[index] ? (
                <Text style={{ color: "red" }}>{errors.start[index]}</Text>
              ) : null}
              {start_journey_pnr.length > 1 && (
                <TouchableOpacity onPress={() => removePnrFieldStart(index)}>
                  <Text style={{ color: "red" }}>Remove</Text>
                </TouchableOpacity>
              )}
            </View>
          ))} */}
          {/* Updated the PNR inputs to use single strings */}
          <MyTextInput
            title="Start Journey PNR"
            value={start_journey_pnr} // Bind directly to the string value
            onChangeText={handlePnrChangeStart} // Use the updated handler
            placeholder="Start Journey Enter PNR"
          />

          <TouchableOpacity onPress={addPnrFieldStart}>
            <Span style={[styles.rightLink, typography.fontLato]}>
              Add More PNR
            </Span>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleUploadTicket}
            style={{ marginTop: spacing.mh2, alignItems: "center" }}
          >
            <H6
              style={[
                typography.fontLato,
                spacing.p1,
                spacing.bw1,
                spacing.br1,
                spacing.mb2,
                typography.font16,
                {
                  textAlign: "center",
                  borderColor: "green",
                  borderStyle: "dotted",
                  backgroundColor: "#e8f5e9",
                },
              ]}
            >
              Upload Ticket
            </H6>
          </TouchableOpacity>

          {ticket && (
            <View style={{ marginTop: 10, alignItems: "center" }}>
              <H6 style={{ color: "green", fontSize: 14 }}>
                Uploaded File: {ticket.name}
              </H6>
              <TouchableOpacity onPress={handleRemoveTicket}>
                <Span
                  style={{
                    color: "red",
                    borderColor: "green",
                    borderStyle: "dotted",
                  }}
                >
                  Remove
                </Span>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* End Journey Section */}
        <View
          style={[
            spacing.bw1,
            spacing.p1,
            spacing.br2,
            { borderStyle: "dotted", marginTop: 10 },
          ]}
        >
          <H6 style={[typography.font14, typography.fontLato, spacing.p2]}>
            Journey Return Ticket
          </H6>

          {/* {end_journey_pnr.map((pnr, index) => (
            <View key={index}>
              <MyTextInput
                title={`Return PNR Number ${index + 1}`}
                // value={pnr}
                // onChangeText={(value) => handlePnrChangeEnd(value, index)}
                value={end_journey_pnr}
                onChangeText={setEndJourneyPnr}
                placeholder="Upload Return Ticket & Enter PNR"
              />
              {errors.end[index] ? (
                <Text style={{ color: "red" }}>{errors.end[index]}</Text>
              ) : null}
              {end_journey_pnr.length > 1 && (
                <TouchableOpacity onPress={() => removePnrFieldEnd(index)}>
                  <Text style={{ color: "red" }}>Remove</Text>
                </TouchableOpacity>
              )}
            </View>
          ))} */}
          <MyTextInput
            title="End Journey PNR"
            value={end_journey_pnr} // Bind directly to the string value
            onChangeText={handlePnrChangeEnd} // Use the updated handler
            placeholder="End Journey Enter PNR"
          />

          <TouchableOpacity onPress={addPnrFieldEnd}>
            <Span style={[styles.rightLink, typography.fontLato]}>
              Add More Return PNR
            </Span>
          </TouchableOpacity>
        </View>

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

        <MyPickerInput
          Value={form.description_category}
          title="Category"
          onChange={(itemValue) =>
            handleChange("description_category", itemValue)
          }
          options={[
            { label: "Transport", value: "Transport" },
            { label: "Fuel", value: "Fuel" },
            { label: "Maintenance", value: "Maintenance" },
            { label: "Miscellaneous", value: "Miscellaneous" },
          ]}
        />
        <View style={{ flexDirection: "row", marginBottom: 10 }}>
          <View style={{ flex: 1, marginRight: 5 }}>
            <Text style={{ marginBottom: 4, fontWeight: "bold" }}>Rent</Text>
            <TextInput
              title="Rent"
              value={form.Rent?.toString()}
              onChangeText={(text) => handleChange("Rent", text)}
              placeholder="Rent"
              keyboardType="numeric"
              style={{
                paddingVertical: 10,
                paddingHorizontal: 10,
                borderWidth: 1,
                borderColor: "#ccc",
                backgroundColor: "#F0FAF0",
                borderRadius: 5,
              }}
            />
          </View>
          <View style={{ flex: 1, marginLeft: 5 }}>
            <Text style={{ marginBottom: 4, fontWeight: "bold" }}>Amount</Text>
            <TextInput
              title="Amount"
              value={form.amount?.toString()}
              onChangeText={(text) => handleChange("amount", text)}
              placeholder="Amount"
              keyboardType="numeric"
              style={{
                paddingVertical: 10,
                paddingHorizontal: 10,
                borderWidth: 1,
                borderColor: "#ccc",
                backgroundColor: "#F0FAF0",
                borderRadius: 5,
              }}
            />
          </View>
        </View>

        <View style={{ flexDirection: "row", top: 4 }}>
          <View style={{ flex: 1, marginRight: 5 }}>
            <Text style={{ marginBottom: 4, fontWeight: "bold" }}>
              Rate per KM
            </Text>
            <TextInput
              title="Rate per KM"
              value={form.rate_per_km?.toString()}
              onChangeText={(text) => handleChange("rate_per_km", text)}
              placeholder="Rate per KM"
              keyboardType="numeric"
              maxLength={6}
              style={{
                paddingVertical: 10,
                paddingHorizontal: 10,
                borderWidth: 1,
                borderColor: "#ccc",
                backgroundColor: "#F0FAF0",
                borderRadius: 5,
              }}
            />
          </View>
          <View style={{ flex: 1, marginLeft: 5 }}>
            <Text style={{ marginBottom: 4, fontWeight: "bold" }}>
              Vehicle No
            </Text>
            <TextInput
              value={form.vehicle_no}
              onChangeText={(text) => handleChange("vehicle_no", text)}
              placeholder="Vehicle No"
              style={{
                paddingVertical: 10,
                paddingHorizontal: 10,
                borderWidth: 1,
                borderColor: "#ccc",
                backgroundColor: "#F0FAF0",
                borderRadius: 5,
              }}
            />
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            marginTop: 10,
          }}
        >
          <TouchableOpacity onPress={addTransactionField}>
            <Text style={{ color: "#76885B", fontWeight: "bold" }}>
              Add More Miscellaneous Bills
            </Text>
          </TouchableOpacity>
        </View>

        {formFields.map((form, index) => (
          <View key={index} style={{ marginBottom: 20 }}>
            <MyTextInput
              title="From"
              value={form.from}
              onChangeText={(text) => handleChange("from", text, index)}
              placeholder="From"
            />

            <MyTextInput
              title="To"
              value={form.to}
              onChangeText={(text) => handleChange("to", text, index)}
              placeholder="To"
            />

            <MyTextInput
              title="Departure Date"
              value={form.departure_date}
              onChangeText={(text) =>
                handleChange("departure_date", text, index)
              }
              placeholder="YYYY-MM-DD"
            />

            <MyTextInput
              title="Departure Time"
              value={form.departure_time}
              onChangeText={(text) =>
                handleChange("departure_time", text, index)
              }
              placeholder="HH:MM:SS"
            />

            <MyTextInput
              title="Arrival Date"
              value={form.arrival_date}
              onChangeText={(text) => handleChange("arrival_date", text, index)}
              placeholder="YYYY-MM-DD"
            />

            <MyTextInput
              title="Arrival Time"
              value={form.arrival_time}
              onChangeText={(text) => handleChange("arrival_time", text, index)}
              placeholder="HH:MM:SS"
            />

            <MyTextInput
              title="Mode of Travel"
              value={form.modeoftravel}
              onChangeText={(text) => handleChange("modeoftravel", text, index)}
              placeholder="e.g., Bus, Train"
            />

            <MyTextInput
              title="Total KM"
              value={form.add_total_km?.toString()}
              onChangeText={(text) => handleChange("add_total_km", text, index)}
              placeholder="Total KM"
              keyboardType="numeric"
              maxLength={6}
            />

            <MyTextInput
              title="Rate per KM"
              value={form.add_rate_per_km?.toString()}
              onChangeText={(text) =>
                handleChange("add_rate_per_km", text, index)
              }
              placeholder="Rate per KM"
              keyboardType="numeric"
              maxLength={6}
            />

            <MyTextInput
              title="Rent"
              value={form.add_rent?.toString()}
              onChangeText={(text) => handleChange("add_rent", text, index)}
              placeholder="Rent"
              keyboardType="numeric"
            />

            <MyTextInput
              title="Vehicle No"
              value={form.add_vehicle_no}
              onChangeText={(text) =>
                handleChange("add_vehicle_no", text, index)
              }
              placeholder="Vehicle No"
            />

            <MyTextInput
              title="Amount"
              value={form.amount?.toString()}
              onChangeText={(text) => handleChange("amount", text, index)}
              placeholder="Amount"
              keyboardType="numeric"
            />

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 10,
              }}
            >
              <TouchableOpacity onPress={() => removeTransactionField(index)}>
                <Text style={{ color: "red", fontWeight: "bold" }}>Remove</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={addTransactionField}>
                <Text style={{ color: "#76885B", fontWeight: "bold" }}>
                  Add More Miscellaneous Bills
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}

        <View
          style={[
            spacing.bw1,
            spacing.br2,
            spacing.p2,
            spacing.mt1,
            {
              borderColor: "#ccc",
            },
          ]}
        >
          <View
            style={[
              spacing.p3,
              spacing.bw1,
              spacing.br2,
              {
                marginTop: spacing.mh2,
                alignItems: "center",
                borderStyle: "dotted",
                backgroundColor: "#e8f5e9",
              },
            ]}
          >
            <TouchableOpacity onPress={handleUploadHotelBill}>
              <H6
                style={[
                  typography.textBold,
                  {
                    textAlign: "center",
                  },
                ]}
              >
                {"Upload Hotel Bill"}
              </H6>
            </TouchableOpacity>

            {hotelBill && (
              <View
                style={[
                  spacing.mt2,
                  spacing.p1,
                  spacing.br1,
                  {
                    alignItems: "center",
                    backgroundColor: "#f1f8e9",
                    borderWidth: 0.2,
                  },
                ]}
              >
                <H6 style={[typography.font14, typography.fontLato]}>
                  {"Uploaded File"}: {hotelBill.name}
                </H6>
                <TouchableOpacity onPress={handleRemoveHotelBill}>
                  <Span
                    style={[
                      styles.rightLink,
                      typography.fontLato,
                      {
                        color: "red",
                        marginTop: 6,
                        textDecorationLine: "underline",
                      },
                    ]}
                  >
                    {"Remove"}
                  </Span>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>

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
