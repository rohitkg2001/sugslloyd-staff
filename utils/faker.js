import { Alert } from "react-native";

export const fakeDelete = ({
  title,
  message,
  negativeTextClick = null,
  positiveText,
  positiveTextClick = null,
}) => {
  Alert.alert(title, message, [
    { text: "Cancel", style: "cancel", onPress: negativeTextClick },
    { text: positiveText, onPress: positiveTextClick },
  ]);
};

export const ProjectcardsForDashboard = [
  {
    id: 1,
    title: "Task 1",
    description: "This is task 1",
    count: 1,
    status: "Total Projects ",
    page: "totalProjectsScreen",
    backgroundColor: "#A0D3E8",
  },
];

export const projects = [
  {
    id: 1,
    projectName: "Project 01B",
    workOrderNumber: "12345",
    rate: "100",
    date: "26-Nov-2024",
    sites: [1, 2],
    vendor: [1],
    tasks: [1, 2],
  },
];

export const totalsitesData = [
  {
    id: 1,
    siteName: "P S SHIKSHA NAGAR BANMANKHI",
    state: "Bihar",
    dist: "Purnia",
    location: "BANMANKHI",
    projectSerialCode: "12",
    ProjectCapacity: "30",
    cANumber: "CA123456",
    ContactNo: "9199502622",
    iCVendorName: "Pankaj Singh",
    sanctionLoad: "5 kW",
    meterNumber: "123456789",
    loadEnhancementStatus: "Approved",
    siteSurveyStatus: "Done",
    netMetereSrNo: "NM-987654",
    solarMeterSrNO: "SM-543210",
    materialInspectionDate: "2024-11-20",
    sppInstallationDate: "2024-11-25",
    cOMISSIONINGDATE: "2024-11-30",
    remarks: "All systems operational and inspected.",
  },
  {
    id: 2,
    siteName: "Gyan Kendra High School",
    state: "Uttar Pradesh",
    dist: "Varanasi",
    location: "Lanka",
    geo: {
      lat: 25.2902024,
      lng: 82.9832034
    },
    projectSerialCode: "45",
    ProjectCapacity: "50",
    cANumber: "CA789101",
    ContactNo: "9123456789",
    iCVendorName: "Rajesh Kumar",
    sanctionLoad: "10 kW",
    meterNumber: "AB123456789",
    loadEnhancementStatus: "Pending Approval",
    siteSurveyStatus: "Pending",
    netMetereSrNo: "NM20241127001",
    solarMeterSrNO: "SM20241127002",
    materialInspectionDate: "2024-11-25",
    sppInstallationDate: "2024-12-05",
    cOMISSIONINGDATE: "2024-12-10",
    remarks: "Site survey and installation scheduled as per plan.",
  },
];

export const siteCardsForDashboard = [
  {
    id: 1,
    name: "total_sites",
    count: totalsitesData.length,
    page: "totalSitesScreen",
    data: totalsitesData,
    backgroundColor: "#f9caa7",
    status: 1,
  },
  {
    id: 2,
    name: "completed_sites",
    count: totalsitesData.length,
    page: "totalSitesScreen",
    data: totalsitesData,
    backgroundColor: "#ffeead",
  },
  {
    id: 3,
    name: "in_progress_sites",
    count: totalsitesData.length,
    page: "totalSitesScreen",
    data: totalsitesData,
    backgroundColor: "#bdeaee",
  },
  {
    id: 4,
    name: "pending_sites",
    count: totalsitesData.length,
    page: "totalSitesScreen",
    data: totalsitesData,
    backgroundColor: "#ffbbee",
  },
];

export const vendorCardForDashboard = [
  {
    id: "1",
    title: "total_vendors",
    count: 1,
    page: "totalVendorsScreen",
    data: vendors,
    backgroundColor: "#FFB7B2",
  },
  {
    id: "2",
    title: "active_vendors",
    count: 1,
    page: "totalVendorsScreen",
    data: vendors,
    backgroundColor: "#B6F4D3",
  },
  {
    id: "3",
    title: "inactive_vendors",
    count: 0,
    page: "totalVendorsScreen",
    data: vendors,
    backgroundColor: "#C4C3D0",
  },
];

export const vendors = [
  {
    id: 1,
    firstName: "Rakesh",
    last_name: "Sharma",
    name: "Rakesh Sharma",
    contact_person: "Amit Kumar",
    contact_number: "9876543210",
    aadhar_number: "1234-5678-9101",
    account_name: "Rakesh Sharma",
    account_number: "123456789012",
    ifsc: "SBIN0001234",
    bank_name: "State Bank of India",
    gst_number: "07ABCDE1234F1Z5",
    pan_number: "ABCDE1234F",
    user_type: "vendor",
    is_admin: 0,
    role_id: 1,
    email: "rakesh.sharma@gmail.com",
    password: "12345678",
    status: "Active",
    disable_login: 0,
    address: "123 gali, Jhajjar, Haryana",
    last_online: "2024-10-03 05:41:49",
    created_date: "2024-11-22",
  },
];

export const inventoryData = [
  {
    id: 1,
    projectId: 1,
    siteId: 1,
    productName: "Solar LED Street Light",
    description: "Eco-friendly solar-powered street light with motion sensor.",
    unit: "pieces",
    initialQuantity: "1000 units",
    quantityStock: "1000",
    materialDispatchDate: "20 Nov 2024",
    deliveryDate: "20 Nov 2024",
    allocationOfficer: "Bittu Gupta",
    url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfaVettxgHxUSbCpPamGNdUB8g_9t_qYFhgQ&s",
  },
  {
    id: 2,
    projectId: 1,
    siteId: 1,
    productName: "Smart Street Light System",
    description: "Automated street light system with IoT connectivity.",
    unit: "pcs",
    initialQuantity: "1000",
    quantityStock: "200",
    materialDispatchDate: "20 Nov 2024",
    deliveryDate: "24 Nov 2024",
    allocationOfficer: "Bittu Mishra",
    url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_L6YoAFI4q74AoE5ijHorzYQF4ZgI7rvwhg&s",
  },
];

export const menuItems = [
  {
    label: "inventory_title",
    icon: "cart-outline",
    page: "inventoryScreen",
  },
  {
    label: "site_management_title",
    icon: "map-outline",
    page: "totalSitesScreen",
  },
  {
    label: "vendor_management_title",
    icon: "people-outline",
    page: "totalVendorsScreen",
  },
  {
    label: "project_management_title",
    icon: "reader-outline",
    page: "totalProjectsScreen",
  },
  {
    label: "task_management_title",
    icon: "grid-outline",
    page: "taskScreen",
  },
  {
    label: "report_title",
    page: "",
    icon: "pie-chart-outline",
  },
  {
    label: "settings",
    icon: "cog-outline",
    page: "InternalSetting",
  },
];

export const internal = [
  {
    label: "notification_title",
    page: "notificationScreen",
    icon: "notifications-outline",
  },
  { label: "privacy_policy_title", page: "privacyPolicy", icon: "shield-checkmark-outline" },
];

export const notifications = [
  {
    id: "1",
    title: "You updated your profile picture",
    description: "You just updated your profile picture.",
    icon: "account",
    time: "Just Now",
  },
  {
    id: "2",
    title: "Password Changed",
    description: "You’ve completed changing the password.",
    icon: "lock-reset",
    time: "2 oct,22:22 Pm",
  },
  {
    id: "3",
    title: "Subham Applied for Leave",
    description: "Please accept my leave request.",
    icon: "account-circle",
    time: "23 sept",
  },
  {
    id: "4",
    title: "System Update",
    description: "Please update to the newest app for a better experience.",
    icon: "cellphone-information",
    time: "25 sept,21:22 Pm",
  },
];

export const documentData = [
  {
    id: "1",
    staffId: 1,
    documentName: "Offer Letter",
    documentImage:
      "https://static.dexform.com/media/docs/6915/sample-job-offer-letter_1.png",
  },
  {
    id: "2",
    staffId: 1,
    documentName: "Appointment Letter",
    documentImage:
      "https://static.dexform.com/media/docs/6915/sample-job-offer-letter_1.png",
  },
  {
    id: "3",
    staffId: 1,
    documentName: "Bond Agreement",
    documentImage:
      "https://static.dexform.com/media/docs/6915/sample-job-offer-letter_1.png",
  },
  {
    id: "4",
    staffId: 1,
    documentName: "Appraisal Letter",
    documentImage:
      "https://static.dexform.com/media/docs/6915/sample-job-offer-letter_1.png",
  },
];

export const staff = {
  id: 1,
  firstName: "Rakesh",
  last_name: "Sharma",
  user_type: "staff",
  is_admin: 0,
  role_id: 1,
  // 0-admin,1-staff/store incharge, 2-project manager, 3-vendor
  email: "rakesh.sharma@gmail.com",
  password: "12345678",
  image: "https://randomuser.me/api/portraits/men/1.jpg",
  status: "active",
  disable_login: 0,
  address: "123 gali, jhajjar, Haryana",
  contactNo: "9909230912",
  last_online: "2024-10-03 05:41:49",
  created_at: "",
  updated_at: ""
};

export const taskslistdata = [
  {
    id: 1,
    projectName: "Project Alpha",
    taskName: "Design Phase",
    deadline: "2024-11-20",
    status: "In Progress",
    startDate: "2024-10-01",
    endDate: "2024-12-15",
  },
  {
    id: 2,
    projectName: "Project Beta",
    taskName: "Development Phase",
    deadline: "2024-12-01",
    status: "Completed",
    startDate: "2024-09-01",
    endDate: "2024-12-01",
  },
];

export const PRIVACY_POLICY = "lorem ipsum sit dolor amet";

export const PageData = [
  {
    description:
      "Streamline Your Projects with Sugs Lloyd – Efficiency at Its Best!",
  },

  {
    id: 1,
    text: "Manage & Track Projects Anytime, Anywhere!",
  },
  {
    id: 2,
    text: "Stay Updated – Receive Tasks & Progress Instantly!",
  },
  {
    id: 3,
    text: "Share Work Details with Real-Time Location & Visuals!",
  },
  {
    id: 4,
    text: "Keep a Sharp Eye on Your Stock Levels with Ease!",
  },
];
