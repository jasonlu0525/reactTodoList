
import axios from 'axios';

import Swal from 'sweetalert2';
// import ReactLoading from 'react-loading';
// function swal({}) {
//     const 

// }

const ApiLogin = async ({ data }) => {
    try {
        const res = await axios.post("https://todoo.5xcamp.us/users/sign_in", {
            user: data
        })
        console.dir(res)
        // 寫入 token
        Swal.fire({
            icon: "success",
            title: res.data.message,
            // text: 'Something went wrong!',
            showConfirmButton: false,
            timer: 1000
        });
        return res.data;
    } catch (error) {
        console.dir(error)
        Swal.fire({
            icon: "error",
            title: error.response.data.message,
            // text: 'Something went wrong!',
            showConfirmButton: false,
            timer: 1000
        });
        return Promise.reject(error);
    }
}
const ApiSignUp = async ({ data }) => {
    try {
        const res = await axios.post("https://todoo.5xcamp.us/users", {
            user: data
        })
        console.dir(res)
        // 寫入 token
        Swal.fire({
            icon: "success",
            title: res.data.message,
            // text: 'Something went wrong!',
            showConfirmButton: false,
            timer: 1000
        });
        return res.data;
    } catch (error) {
        console.dir(error)
        Swal.fire({
            icon: "error",
            title: error.response.data.message,
            // text: 'Something went wrong!',
            showConfirmButton: false,
            timer: 1000
        });
        return Promise.reject(error);
    }
}

const ApiGetToDoList = async ({ token }) => {
    try {
        const res = await axios.get("https://todoo.5xcamp.us/todos", {
            headers:{
                Authorization : token
            }
        })
        // 寫入 token
        // Swal.fire({
        //     icon: "success",
        //     title: res.data.message,
        //     // text: 'Something went wrong!',
        //     showConfirmButton: false,
        //     timer: 1000
        // });
        return res.data;
    } catch (error) {
        console.dir(error)
        Swal.fire({
            icon: "error",
            title: error.response.data.message,
            // text: 'Something went wrong!',
            showConfirmButton: false,
            timer: 1000
        });
        return Promise.reject(error);
    }
}

export { ApiLogin,ApiSignUp,ApiGetToDoList } 