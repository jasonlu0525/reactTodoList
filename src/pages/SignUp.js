
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
// import { Link, useNavigate, } from 'react-router-dom';
import SideImages from "../components/SideImages";
import { ApiSignUp } from "../util/api"
export default function SignUp() {
  // const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors }, watch } = useForm({
    mode: "onChange"
  })

  const signUp = async data => {
    console.log(data);
    delete data.checkpassword;
    await ApiSignUp({data});
  }

  return (
    <>

      <div id="signUpPage" className="bg-yellow">
        <div className="conatiner signUpPage vhContainer">
          <SideImages />
          <div>
            <form className="formControls" action="index.html" onSubmit={handleSubmit(signUp)}>
              <h2 className="formControls_txt">註冊帳號</h2>
              <label className="formControls_label" htmlFor="email">Email</label>
              <input className="formControls_input" type="text" id="email" name="email" placeholder="請輸入 email"   {...register("email", {
                required: { value: true, message: "必填欄位" }, pattern: {
                  value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                  message: "不符合 Email 規則"
                }
              })} />
              <span>{errors.email?.message} </span>
              <label className="formControls_label" htmlFor="name">您的暱稱</label>
              <input className="formControls_input" type="text" name="name" id="name" placeholder="請輸入您的暱稱"
                {...register("nickname", { required: { value: true, message: "必填欄位" } })} />
              <span>{errors.nickname?.message} </span>

              <label className="formControls_label" htmlFor="pwd">密碼</label>
              <input className="formControls_input" type="password" name="pwd" id="pwd" placeholder="請輸入密碼"
                {...register("password", { required: { value: true, message: "必填欄位" } ,minLength: { value: 6, message: "密碼至少為 6 碼" } })} />
             
              <span>{errors.password?.message} </span>
              <label className="formControls_label" htmlFor="checkpassword">再次輸入密碼</label>
              <input className="formControls_input" type="password" name="checkpassword" id="checkpassword" placeholder="請再次輸入密碼"
                {...register("checkpassword", {
                  required: { value: true, message: "必填欄位" }, validate: (value) => {
                    if (watch('password') !== value) {
                      return "兩次密碼輸入不同";
                    }
                  }
                })}
              />
              <span>{errors.checkpassword?.message} </span>
              <input className="formControls_btnSubmit" type="submit" value="註冊帳號" />
              <Link className="formControls_btnLink" to="/">登入</Link>
              {/* validate: (value) => {
                    if (watch('password') !== value) {
                      return "兩次密碼輸入不同";
                    } */}
            </form>
          </div>
        </div>

      </div>
    </>
  );
}