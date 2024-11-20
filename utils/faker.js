import {
  DANGER_COLOR,
  INFO_COLOR,
  SUCCESS_COLOR,
  WARNING_COLOR,
} from "../styles/constant";

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
    id: 3,
    title: "Task 3",
    description: "This is task 3",
    count: 46,
    status: "Total Sites",
    page: "totalSitesScreen",
    backgroundColor: "#f9caa7",
  },
  {
    id: 4,
    title: "Task 4",
    description: "This is task 4",
    count: 17,
    status: "Completed Sites",
    page: "completedSitesScreen",
    backgroundColor: "#ffeead",
  },
  {
    id: 5,
    title: "Task 5",
    description: "This is task 5",
    count: 22,
    status: "Sites in Progress",
    page: "progressSitesScreen",
    backgroundColor: "#bdeaee",
  },
  {
    id: 6,
    title: "Task 6",
    description: "This is task 5",
    count: 7,
    status: "Pending Sites",
    page: "pendingSitesScreen",
    backgroundColor: "#ffbbee",
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
    siteName: "Site Delta", // Added siteName
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
    siteName: "Site Alpha", // Added siteName
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
    siteName: "Site Beta", // Added siteName
    vendorName: "Ayush Ranjan",
  },
  {
    id: 4,
    projectName: "Project 04D",
    duration: "7 days",
    status: "completed",
    siteName: "Site Gamma", // Added siteName
    vendorName: "Md Munna",
  },
  {
    id: 5,
    projectName: "Project 05E",
    duration: "4 days",
    status: "ongoing",
    siteName: "Site Delta", // Added siteName
    vendorName: "Suresh Tripathy",
  },
  {
    id: 6,
    projectName: "Project 06F",
    duration: "6 days",
    status: "ongoing",
    siteName: "Site Omega", // Added siteName
  },
  {
    id: 7,
    projectName: "Project 07G",
    duration: "1 day",
    status: "completed",
    siteName: "Site Alpha", // Added siteName
  },
  {
    id: 8,
    projectName: "Project 08H",
    duration: "8 days",
    status: "ongoing",
    siteName: "Site Beta", // Added siteName
  },
  {
    id: 9,
    projectName: "Project 09I",
    duration: "10 days",
    status: "completed",
    siteName: "Site Gamma", // Added siteName
  },
  {
    id: 10,
    projectName: "Project 10J",
    duration: "3 days",
    status: "ongoing",
    siteName: "Site Omega", // Added siteName
  },
];


export const projecttask = [
  {
    id: 1,
    projectName: "Project 01A",
    siteName: " SBI Bank , Rampur School , Lakhisarai",
  },
  {
    id: 2,
    projectName: "Project 02B",
    siteName: "Block Office, Shershah Road ,Madhepura",
  },
  {
    id: 3,
    projectName: "Project 03C",
    siteName: "Purnea Mahila College , Sipahi Tola , Purnea",
  },
];
export const tasksData = [
  {
    id: "1",
    taskName: "Solar Panel Installlation at railway station.",
    installation: "Install the panel on top of the platform of 5kw of power.",
  },
];

export const inventoryData = [
  {
    id: "1",
    name: "Solar LED Street Light",
    description: "Eco-friendly solar-powered street light with motion sensor.",
    quantity: 1,
    url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfaVettxgHxUSbCpPamGNdUB8g_9t_qYFhgQ&s",
  },
  {
    id: "2",
    name: "Smart Street Light System",
    description: "Automated street light system with IoT connectivity.",
    quantity: 2,
    url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_L6YoAFI4q74AoE5ijHorzYQF4ZgI7rvwhg&s",
  },
  {
    id: "3",
    name: "LED Floodlight for Streets",
    description: "High brightness LED floodlight for outdoor use.",
    quantity: 3,
    url: "https://m.media-amazon.com/images/I/81hIbQn03RL._AC_UF1000,1000_QL80_.jpg",
  },
  {
    id: "4",
    name: "Solar Street Light with Camera",
    description: "Integrated street light with a security camera.",
    quantity: 1,
    url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfaVettxgHxUSbCpPamGNdUB8g_9t_qYFhgQ&s",
  },
  {
    id: "5",
    name: "Street Light Pole",
    description: "Durable street light pole for various applications.",
    quantity: 5,
    url: "https://th.bing.com/th?id=OPAC.9GyQh8O0Qccugw474C474&w=592&h=550&o=5&dpr=1.1&pid=21.1",
  },
  {
    id: "6",
    name: "Motion Sensor Street Light",
    description:
      "Street light with a built-in motion sensor for energy savings.",
    quantity: 2,
    url: "  https://th.bing.com/th?id=OPAC.CS1gpu%2fn0Pggmw474C474&w=592&h=550&o=5&dpr=1.1&pid=21.1 ",
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
  { label: "Inventory Management", icon: "cart-outline", page: "inventoryScreen" },
  { label: "Site Management", icon: "map-outline", page: "totalSitesScreen" },
  { label: "Vendor Management", icon: "people-outline", page: "totalVendorsScreen" },
  { label: "Project Management", icon: "reader-outline", page: "totalProjectsScreen" },
  { label: "Task Management", page: "", icon: "grid-outline", page: "taskListScreen" },
  { label: "Reports", page: "", icon: "pie-chart-outline", },
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
  { id: "1", staffId: 1, documentName: "Offer Letter", documentImage: "https://static.dexform.com/media/docs/6915/sample-job-offer-letter_1.png" },
  { id: "2", staffId: 1, documentName: "Appointment Letter", documentImage: "https://static.dexform.com/media/docs/6915/sample-job-offer-letter_1.png" },
  { id: "3", staffId: 1, documentName: "Bond Agreement", documentImage: "https://static.dexform.com/media/docs/6915/sample-job-offer-letter_1.png" },
  { id: "4", staffId: 1, documentName: "Appraisal Letter", documentImage: "https://static.dexform.com/media/docs/6915/sample-job-offer-letter_1.png" },
  // { id: "5", staffId: 1, documentName: "Salary Slip", documentImage: "https://static.dexform.com/media/docs/6915/sample-job-offer-letter_1.png" },
];

export const profileImages = [
  "https://randomuser.me/api/portraits/men/1.jpg",
  "https://randomuser.me/api/portraits/women/1.jpg",
];

export const miniCards = [
  { id: 1, icon: "time-outline", text: "Est: 20h" },
  { id: 2, icon: "calendar-outline", text: "Due: 25 Apr" },
  { id: 3, icon: "checkmark-circle-outline", text: "Tasks: 1/3" },
];

export const taskCards = [
  { id: 1, text: "Design Concept", progress: 0.7, bgColor: "#54B4D3" },
  { id: 2, text: "Development Phase", progress: 0.4, bgColor: "#2b87b0" },
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

export const taskslist = [
  {
    id: 1,
    title: "Design in Solidworks",
    status: "done",
    deadline: "2024-10-13",
    start: "2024-10-08",
    project: "Robotic Cell",
    assignedTo: "Rakesh Sharma",
  },
  {
    id: 2,
    title: "Purchase Parts",
    status: "critical",
    deadline: "2024-08-28",
    start: "2024-08-28",
    project: "Coffee Vending Machine",
    assignedTo: "Rakesh Sharma",
  },
  {
    id: 3,
    title: "Purchase Parts",
    status: "blocker",
    deadline: "2024-08-28",
    start: "2024-08-28",
    project: "Automatic Soap Dispenser Machine Jig",
    assignedTo: "Rakesh Sharma",
  },
];

export const totalsitesData = [
  {
    id: "1",
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
    id: "2",
    siteName: "P S MIRCHAIBARI UTTAR",
    dist: "Purnia",
    location: "BANMANKHI",
  },
  {
    id: "3",
    siteName: "P S MIRCHAIBARI UTTAR",
    dist: "Purnia",
    location: "BANMANKHI",
  },
  {
    id: "4",
    siteName: "P S MIRCHAIBARI UTTAR",
    dist: "Purnia",
    location: "BANMANKHI",
  },
  {
    id: "5",
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
export const inactiveVendorsData = [
  {
    id: 1,
    name: "Ramesh Chaurasiya",
    location: "Saharanpur",
    contactNumber: "+91 234 567 890",
    status: "Inactive",
  },
  {
    id: 2,
    name: "Danish akhtar",
    location: "Muradabad",
    contactNumber: "+91 345 678 901",
    status: "Inactive",
  },
];
export const activeVendorsData = [
  {
    id: 1,
    name: "Ahmad",
    location: "Lucknow",
    contactNumber: "(123) 456-7890",
    status: "active",
  },
  {
    id: 2,
    name: "Vinay Tiwary",
    location: "Patna",
    contactNumber: "(987) 654-3210",
    status: "active",
  },
  {
    id: 3,
    name: "Ravi Singh",
    location: "Varanasi",
    contactNumber: "(312) 555-1234",
    status: "active",
  },
  {
    id: 4,
    name: "Priya Chaturvedi",
    location: "Gaya",
    contactNumber: "(424) 555-5678",
    status: "active",
  },
  {
    id: 5,
    name: "Suresh Kumar",
    location: "Agra",
    contactNumber: "(512) 555-9012",
    status: "active",
  },
  {
    id: 6,
    name: "Neha Devi",
    location: "Patna",
    contactNumber: "(206) 555-3456",
    status: "active",
  },
  {
    id: 7,
    name: "Vikram Yadav",
    location: "Kanpur",
    contactNumber: "(305) 555-7890",
    status: "active",
  },
];

export const blocklistedVendorsData = [
  {
    id: 1,
    name: "Amit Kumar",
    location: "Muzaffarpur",
    contactNumber: "(305) 555-1234",
    status: "blocklisted",
  },
  {
    id: 2,
    name: "Rajeev Singh",
    location: "Aligarh",
    contactNumber: "(323) 555-6789",
    status: "blocklisted",
  },
  {
    id: 3,
    name: "Pooja Sharma",
    location: "Jhansi",
    contactNumber: "(212) 555-9876",
    status: "blocklisted",
  },
  {
    id: 4,
    name: "Rakesh Yadav",
    location: "Bhagalpur",
    contactNumber: "(312) 555-2468",
    status: "blocklisted",
  },
  {
    id: 5,
    name: "Kiran Patel",
    location: "Bareilly",
    contactNumber: "(713) 555-1357",
    status: "blocklisted",
  },
  {
    id: 6,
    name: "Manoj Jha",
    location: "Darbhanga",
    contactNumber: "(206) 555-8642",
    status: "blocklisted",
  },
  {
    id: 7,
    name: "Neelam Rani",
    location: "Sultanpur",
    contactNumber: "(415) 555-4200",
    status: "blocklisted",
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

export const PRIVACY_POLICY = "lorem ipsum sit dolor amet"