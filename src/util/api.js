
import axios from 'axios';
import Swal from 'sweetalert2';

const ApiLogin = async ({ formData }) => {
    try {
        const res = await axios.post("https://todoo.5xcamp.us/users/sign_in", {
            user: formData
        })
        Swal.fire({
            icon: "success",
            title: res.data.message,
            showConfirmButton: false,
            timer: 1000
        });
        return res;
    } catch (error) {
        Swal.fire({
            icon: "error",
            title: error.response.data.message,
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
        Swal.fire({
            icon: "success",
            title: res.data.message,
            showConfirmButton: false,
            timer: 1000
        });
        return res.data;
    } catch (error) {
        Swal.fire({
            icon: "error",
            title: error.response.data.message,
            text: error.response.data.error,
            showConfirmButton: false,
            timer: 1000
        });
        return Promise.reject(error);
    }
}
const ApiLogOut = async ({ token }) => {
    try {
        const res = await axios.delete("https://todoo.5xcamp.us/users/sign_out", {
            headers: {
                Authorization: token
            },
        })
        Swal.fire({
            icon: "success",
            title: res.data.message,
            showConfirmButton: false,
            timer: 1000
        });
        return res;
    } catch (error) {
        Swal.fire({
            icon: "error",
            title: error.response.data.message,
            showConfirmButton: false,
            timer: 1000
        });
        return Promise.reject(error);
    }
}

const ApiGetToDoList = async ({ token }) => {
    try {
        const res = await axios.get("https://todoo.5xcamp.us/todos", {
            headers: {
                Authorization: token
            }
        })
        return res.data;
    } catch (error) {
        console.dir(error.response.data.message);
        Swal.fire({
            icon: "error",
            title:'發生錯誤，請重新登入',
            // title: error.response.data.message,
            showConfirmButton: false,
            timer: 1000
        }) 
        window.location.hash="#/"
        return Promise.reject(error);
    }
}

const ApiPosttToDoList = async ({ token, formData }) => {
    try {
        const res = await axios.post("https://todoo.5xcamp.us/todos", {
            "todo": formData

        }, {
            headers: {
                Authorization: token
            },
        })

        Swal.fire({
            icon: "success",
            title: `代辦事項新增成功 `,
            text: `新增了 ${res.data.content}`,
            showConfirmButton: false,
            timer: 1000
        });
        return res.data;
    } catch (error) {
        Swal.fire({
            icon: "error",
            title: error.response.data.message,
            showConfirmButton: false,
            timer: 1000
        })
        return Promise.reject(error);
    }
}

const ApiDeleteToDoList = async ({ token, id , swalTriggerTimes = 1 }) => {
    try {
        const res = await axios.delete(`https://todoo.5xcamp.us/todos/${id}`, {
            headers: {
                Authorization: token
            },
        })
        for( let times = 0; times < swalTriggerTimes ; times++){
       Swal.fire({
                icon: "success",
                title: `代辦事項刪除成功 `,
                showConfirmButton: false,
                timer: 1000
            });
        }
        return res.data;
    } catch (error) {
        Swal.fire({
            icon: "error",
            title: error.response.data.message,
            showConfirmButton: false,
            timer: 1000
        })
        return Promise.reject(error);
    }
}

const ApipatchToDoList = async ({ token, formData }) => {
    try {
        const res = await axios.patch(`https://todoo.5xcamp.us/todos/${formData.id}/toggle`, {
            todo: formData
        }, {
            headers: {
                Authorization: token
            },
        })

        const { completed_at } = res.data
        Swal.fire({
            icon: completed_at ? "success" : "info",
            title: completed_at ? `已完成代辦事項` : '未完成代辦事項',
            text: completed_at ? `於 ${new Date(completed_at).toLocaleString()} 完成` : '',
            showConfirmButton: false,
            timer: 1000
        });
        return res.data;
    } catch (error) {
        Swal.fire({
            icon: "error",
            title: error.response.data.message,
            showConfirmButton: false,
            timer: 1000
        })
        return Promise.reject(error);
    }
}

export { ApiLogin, ApiLogOut, ApiSignUp, ApiGetToDoList, ApiPosttToDoList, ApiDeleteToDoList, ApipatchToDoList } 