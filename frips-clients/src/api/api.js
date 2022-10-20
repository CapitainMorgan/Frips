import axios from "axios";

/* headers: {
    Authorization: "Client-ID nl-wl_vcNXHaqMTJVLzw_iehEHgS9STryXVWe6ipgI8"
}*/

export default axios.create({
    baseURL: 'http://localhost:8000/api',
})