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

export const tasks = [
  {
    id: 1,
    title: "Task 1",
    description: "This is task 1",
    count: 28,
    status: "Total Projects ",
    page: "totalProjectsScreen",
    backgroundColor: "#A0D3E8",
  },
  {
    id: 2,
    title: "Task 2",
    description: "This is task 2",
    count: 31,
    status: "Total Earning",
    page: "totalEarningScreen",
    backgroundColor: "#C8E6C9",
  },

  {
    id: 7,
    title: "Task 6",
    description: "This is task 5",
    count: 67,
    status: "Total Vendors",
    page: "totalVendorsScreen",
    backgroundColor: "#FFB7B2",
  },
  {
    id: 8,
    title: "Task 6",
    description: "This is task 5",
    count: 53,
    status: "Active Vendors",
    page: "activeVendorsScreen",
    backgroundColor: "#B6F4D3",
  },
  {
    id: 9,
    title: "Task 6",
    description: "This is task 5",
    count: 10,
    status: "Inactive Vendors",
    page: "inactiveVendorsScreen",
    backgroundColor: "#C4C3D0",
  },
  {
    id: 10,
    title: "Task 6",
    description: "This is task 5",
    count: 4,
    status: "Blocklisted Vendor",
    page: "blockListedVendorsScreen",
    backgroundColor: "#F5F5DC",
  },
];

export const project = [
  {
    id: 1,
    projectName: "Project 01B",
    duration: "6 days",
    status: "completed",
    projectSerial: "76",
    siteName: "Site Delta",
    sanctionLoad: "200KW",
    projectCapacity: "400KW",
    caNumber: "CA44556",
    surveyStatus: "In Progress",
    contactNo: "2233445566",
    solarMeterSerial: "SM004D",
    vendorName: "Raju Das",
  },
  {
    id: 2,
    projectName: "Project 02B",
    duration: "5 days",
    status: "completed",
    projectSerial: "",
    siteName: "Site Alpha",
    sanctionLoad: "",
    projectCapacity: "",
    caNumber: "",
    surveyStatus: "",
    contactNo: "",
    solarMeterSerial: "",
    vendorName: "Md. Sohail Ansari",
  },
  {
    id: 3,
    projectName: "Project 03C",
    duration: "3 days",
    status: "ongoing",
    siteName: "Site Beta",
    vendorName: "Ayush Ranjan",
  },
  {
    id: 4,
    projectName: "Project 04D",
    duration: "7 days",
    status: "completed",
    siteName: "Site Gamma",
    vendorName: "Md Munna",
  },
  {
    id: 5,
    projectName: "Project 05E",
    duration: "4 days",
    status: "ongoing",
    siteName: "Site Delta",
    vendorName: "Suresh Tripathy",
  },
  {
    id: 6,
    projectName: "Project 06F",
    duration: "6 days",
    status: "ongoing",
    siteName: "Site Omega",
  },
  {
    id: 7,
    projectName: "Project 07G",
    duration: "1 day",
    status: "completed",
    siteName: "Site Alpha",
  },
  {
    id: 8,
    projectName: "Project 08H",
    duration: "8 days",
    status: "ongoing",
    siteName: "Site Beta",
  },
  {
    id: 9,
    projectName: "Project 09I",
    duration: "10 days",
    status: "completed",
    siteName: "Site Gamma",
  },
  {
    id: 10,
    projectName: "Project 10J",
    duration: "3 days",
    status: "ongoing",
    siteName: "Site Omega",
  },
];

export const inventoryData = [
  {
    id: 1,
    projectId: 1,
    siteId: 1,
    product_name: "Solar LED Street Light",
    description: "Eco-friendly solar-powered street light with motion sensor.",
    unit: "pcs",
    initial_quantity: "1000",
    qty_stock: "1000",
    material_dispatch_date: "20 Nov 2024",
    delivery_date: "20 Nov 2024",
    allocation_officer: "Bittu Gupta",
    url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfaVettxgHxUSbCpPamGNdUB8g_9t_qYFhgQ&s",
  },
  {
    id: 2,
    projectId: 1,
    siteId: 1,
    product_name: "Smart Street Light System",
    description: "Automated street light system with IoT connectivity.",
    unit: "pcs",
    initial_quantity: "1000",
    qty_stock: "200",
    material_dispatch_date: "20 Nov 2024",
    delivery_date: "24 Nov 2024",
    allocation_officer: "Bittu Mishra",
    url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_L6YoAFI4q74AoE5ijHorzYQF4ZgI7rvwhg&s",
  },
];

export const earnings = [
  {
    id: 1,
    projectName: "Solar Lighting Installation for Homes",
    totalEarnings: 12034,
    completionDate: "2023-10-10",
  },
  {
    id: 2,
    projectName: "Community Solar Street Lights Project",
    totalEarnings: 8500.0,
    completionDate: "2023-09-15",
  },
  {
    id: 3,
    projectName: "Solar Panel Setup for Schools",
    totalEarnings: 4730.75,
    completionDate: "2023-08-20",
  },
  {
    id: 4,
    projectName: "Solar Energy Solutions for Farms",
    totalEarnings: 20500.0,
    completionDate: "2023-07-30",
  },
  {
    id: 5,
    projectName: "Solar Roof Panels for Businesses",
    totalEarnings: 13500.25,
    completionDate: "2023-06-12",
  },
  {
    id: 6,
    projectName: "Solar Roof Panels for Businesses",
    totalEarnings: 13500.25,
    completionDate: "2023-06-12",
  },
  {
    id: 7,
    projectName: "Solar Roof Panels for Businesses",
    totalEarnings: 13500.25,
    completionDate: "2023-06-12",
  },
  {
    id: 8,
    projectName: "Solar Roof Panels for Businesses",
    totalEarnings: 13500.25,
    completionDate: "2023-06-12",
  },
  {
    id: 9,
    projectName: "Solar Roof Panels for Businesses",
    totalEarnings: 13500.25,
    completionDate: "2023-06-12",
  },
  {
    id: 10,
    projectName: "Solar Roof Panels for Businesses",
    totalEarnings: 13500.25,
    completionDate: "2023-06-12",
  },
];

export const menuItems = [
  {
    label: "inventory_title",
    icon: "cart-outline",
    page: "inventoryScreen",
  },
  { label: "Site Management", icon: "map-outline", page: "totalSitesScreen" },
  {
    label: "Vendor Management",
    icon: "people-outline",
    page: "totalVendorsScreen",
  },
  {
    label: "Project Management",
    icon: "reader-outline",
    page: "totalProjectsScreen",
  },
  {
    label: "Task Management",
    page: "",
    icon: "grid-outline",
    page: "taskScreen",
  },
  { label: "Reports", page: "", icon: "pie-chart-outline" },
  { label: "Settings", page: "", icon: "cog-outline", page: "InternalSetting" },
];

export const internal = [
  {
    label: "Notification",
    page: "notificationScreen",
    icon: "notifications-outline",
  },
  { label: "Privacy", page: "privacyPolicy", icon: "shield-checkmark-outline" },
  { label: "Data Usage", page: "", icon: "folder-outline" },
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
  first_name: "Rakesh",
  last_name: "Sharma",
  user_type: "staff",
  is_admin: 0,
  role_id: 0,
  email: "rakesh.sharma@gmail.com",
  password: "12345678",
  image: "https://randomuser.me/api/portraits/men/1.jpg",
  status: "active",
  job_title: "Technical Assistant",
  salary: "20000",
  salary_term: "Monthly",
  Date_of_hire: "2024-08-27",
  disable_login: 0,
  note: [],
  address: "123 gali, jhajjar, Haryana",
  alternative_address: "",
  contactNo: "9909230912",
  alternative_phone: "",
  dob: "",
  gender: "male",
  sticky_note: [],
  skype: "",
  language: "",
  last_online: "2024-10-03 05:41:49",
  file: "file-pdf",
  size: "",
  uploaded_by: "rakesh sharma",
  created_date: "",
};

export const totalsitesData = [
  {
    id: 1,
    siteName: "P S SHIKSHA NAGAR BANMANKHI",
    State: "",
    City: "",
    dist: "Purnia",
    location: "BANMANKHI",
    ProjectSerialCode: "12",
    ProjectCapacity: "30",
    CANumber: "",
    ContactNo: "9199502622",
    ICVendorName: "",
  },
  {
    id: 2,
    siteName: "P S MIRCHAIBARI UTTAR",
    dist: "Purnia",
    location: "BANMANKHI",
  },
  {
    id: 3,
    siteName: "P S MIRCHAIBARI UTTAR",
    dist: "Purnia",
    location: "BANMANKHI",
  },
  {
    id: 4,
    siteName: "P S MIRCHAIBARI UTTAR",
    dist: "Purnia",
    location: "BANMANKHI",
  },
  {
    id: 5,
    siteName: "P S MIRCHAIBARI UTTAR",
    dist: "Purnia",
    location: "BANMANKHI",
  },
];

export const totalVendorsData = [
  {
    id: "1",
    name: "Raju Das",
    location: "Patna",
    contactNumber: "123-456-7890",
    gstNumber: "",
    contactPerson: "",
    mailId: "",
  },
  {
    id: "2",
    name: "Md. Sohail Ansari",
    location: "Saharanpur",
    contactNumber: "987-654-3210",
  },
  {
    id: "3",
    name: "Ayush Ranjan",
    location: "Kanpur",
    contactNumber: "456-789-1230",
  },
  {
    id: "4",
    name: "Md Munna",
    location: "Purniea",
    contactNumber: "321-654-9870",
  },
  {
    id: "5",
    name: "Suresh Tripathy",
    location: "Betiah",
    contactNumber: "789-123-4560",
  },
];

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

export const siteCardsForDashboard = [
  {
    id: 1,
    title: "Total Sites",
    name: "total_sites",
    count: 46,
    page: "totalSitesScreen",
    data: totalsitesData,
    backgroundColor: "#f9caa7",
  },
  {
    id: 2,
    title: "Completed Sites",
    count: 17,
    page: "totalSitesScreen",
    data: totalsitesData,
    backgroundColor: "#ffeead",
  },
  {
    id: 3,
    title: "Sites in Progress",
    count: 22,
    page: "totalSitesScreen",
    data: totalsitesData,
    backgroundColor: "#bdeaee",
  },
  {
    id: 4,
    title: "Pending Sites",
    count: 7,
    page: "totalSitesScreen",
    data: totalsitesData,
    backgroundColor: "#ffbbee",
  },
];

export const vendorCardForDashboard = [
  {
    id: "1",
    title: "Total Vendors",
    count: 67,
    page: "totalVendorsScreen",
    data: totalVendorsData,
    backgroundColor: "#FFB7B2",
  },
  {
    id: "2",
    title: "Active Vendors",
    count: 53,
    page: "totalVendorsScreen",
    data: totalVendorsData,
    backgroundColor: "#B6F4D3",
  },
  {
    id: "3",
    title: "Inactive Vendors",
    count: 10,
    page: "totalVendorsScreen",
    data: totalVendorsData,
    backgroundColor: "#C4C3D0",
  },
  {
    id: "4",
    title: "Blocklisted Vendors",
    count: 44,
    page: "totalVendorsScreen",
    data: totalVendorsData,
    backgroundColor: "#F5F5DC",
  },
];

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
