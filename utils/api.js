import axios from "axios";
import { BASE_URL } from "../redux/constant";

/**
 * Axios instance with default configurations
 */
const api = axios.create({
    baseURL: BASE_URL, // Change to your API
    timeout: 10000, // 10 seconds timeout
    headers: {
        "Content-Type": "application/json",
    },
});

/**
 * Handles API errors and extracts useful information.
 * @param {Object} error - Axios error object
 * @returns {Object} - Formatted error response
 */
export const handleAxiosError = (error) => {
    let message = "Something went wrong!";
    let status = null;
    let data = null;

    if (error.response) {
        // Server responded with an error status code
        status = error.response.status;
        data = error.response.data;

        if (status === 400) {
            message = data?.message || "Bad request. Please check your input.";
        } else if (status === 401) {
            message = "Unauthorized. Please log in again.";
        } else if (status === 403) {
            message = "Forbidden. You don't have permission for this action.";
        } else if (status === 404) {
            message = "Not found. The requested resource doesn't exist.";
        } else if (status === 500) {
            message = "Server error. Please try again later.";
        } else {
            message = data?.message || `Unexpected error (Status: ${status})`;
        }
    } else if (error.request) {
        // No response received from the server
        message = "No response from server. Please check your network.";
    } else {
        // Other unknown errors
        message = error.message;
    }

    console.error(`Axios Error: ${message} (Status: ${status})`);
    return { message, status, data };
};

export default api;
