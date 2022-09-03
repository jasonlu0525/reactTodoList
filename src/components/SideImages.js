 import  todolist_lg from '../images/todolist_lg.png';
 import  logo from '../images/logo.png';


export default function Images() {
    return (
        <>
            <div className="side">
                <img className="logoImg" src={logo} alt="" />
                <img className="d-m-n" src={todolist_lg} alt="workImg" />
            </div>
        </>
    )
}