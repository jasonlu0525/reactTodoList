
import { useForm } from 'react-hook-form';
import { Link, useNavigate, } from 'react-router-dom';
import SideImages from "../components/SideImages";
import LoadingOverlay from 'react-loading-overlay';

import { ApiLogin } from "../util/api"
import { useState } from 'react';
import { setTitle } from '../util/title';

export default function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm({
        // mode: "onChange"
    })
    setTitle("登入帳號")
    const navigate = useNavigate()
    const [isActive, changeActice] = useState(false);
    const login = async (data) => {
        console.log(data);
        changeActice(true)
        await ApiLogin({ data })
        changeActice(false)
        navigate("/todo")
    }

    return (
        <>
            {/* <LoadingOverlay active={isActive} /> */}
            <div id="loginPage" className="bg-yellow">
                <div className="conatiner loginPage vhContainer ">
                    <SideImages />
                    <div>
                        <form className="formControls" onSubmit={handleSubmit(login)}>
                            <h2 className="formControls_txt">最實用的線上代辦事項服務</h2>
                            <label className="formControls_label" htmlFor="email">Email</label>
                            <input className="formControls_input" type="text" id="email" name="email" placeholder="請輸入 email"
                                {...register("email", {
                                    required: { value: true, message: "必填欄位" }, pattern: {
                                        value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                                        message: "不符合 Email 規則"
                                    }
                                })} />
                            <span>{errors.email?.message} </span>
                            <label className="formControls_label" htmlFor="pwd">密碼</label>
                            <input className="formControls_input" type="password" name="pwd" id="pwd" placeholder="請輸入密碼"
                                {...register("password", { required: { value: true, message: "必填欄位" }, minLength: { value: 6, message: "密碼至少為 6 碼" } })} />
                            <span> {errors.password?.message}</span>
                            <input className="formControls_btnSubmit" type="submit" value="登入" />
                            <Link className="formControls_btnLink" to="signup">註冊帳號</Link>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}