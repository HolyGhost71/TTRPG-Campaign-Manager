import axios from "axios";

export default axios.create({
    baseURL: import.meta.env.production.VITE_API_URL,
});