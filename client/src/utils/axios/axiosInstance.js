import axios from 'axios';

export default axios.create({
    withCredentials: true, // Send cookies with requests
});