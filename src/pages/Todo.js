import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { ApiGetToDoList, ApiPosttToDoList, ApiDeleteToDoList, ApipatchToDoList, ApiLogOut } from '../util/api';
import { setTitle } from '../util/title'
import { useAuth, useUserInfo } from "../util/context";
import { useForm } from 'react-hook-form';
import  logo from '../images/logo.png';
import  todolist_sm from '../images/todolist_sm.png';
export default function Todo() {

    const [toDoList, updateList] = useState([]); // 原始資料
    const [filtedList, updatefiltedList] = useState([]); // 過濾過後的資料，預設為全部 ( 顯示在畫面上)
    const [finishTodo, filtedFinishList] = useState([]);
    const [unFinishTodo, filtedUnFinishList] = useState([]);
    const { token, updateToken } = useAuth();
    const { userInfo, updateUserInfo } = useUserInfo();
    const navigate = useNavigate()

    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: "onChange"
    })
    async function fetchData() {
        // 這邊 .catch 是處理 token 過期的情況
        const response = await ApiGetToDoList({ token })
        const { todos } = response
        updateList(todos)
        updatefiltedList(todos)
        setTitle(`${userInfo.nickname}的Todo 列表`)

        //已完成項目
        const finish = todos.filter((item) => {
            return item.completed_at;

        })
        filtedFinishList(finish)
        //未完成項目
        const unFinish = todos.filter((item) => {
            return !item.completed_at;

        })
        filtedUnFinishList(unFinish);

    }

    useEffect(() => {
        fetchData();
    }, [])



    const [status, updateStatus] = useState(0);
    const statusPattern = [{ code: 0, name: '全部' }, { code: 1, name: '待完成' }, { code: 2, name: '已完成' }];

    const filtToDoList = (code) => {
        updateStatus(code)
    }
    const addTodo = async (text) => {
        await ApiPosttToDoList({ token, formData: text });
        await fetchData()
    }

    const patchTodo = async (item) => {
        await ApipatchToDoList({ token, formData: item });
        await fetchData()
    }

    const deleteTodo = async (id, swalTriggerTimes) => {
        await ApiDeleteToDoList({ token, id, swalTriggerTimes });
        await fetchData()
    }
    const deleteFinishTodos = () => {
        let times = 1
        finishTodo.forEach(({ id }) => {
            deleteTodo(id, times);
            times -= 1;
        });
    }

    const logout = async () => {
        await ApiLogOut({ token });
        updateToken(null) //  清空  app.js  AuthContext.Provider 提供的 token 值
        updateUserInfo(null)
        localStorage.clear()
        navigate('/', { replace: true })
    }

    //  監聽 status 、 toDoList  的狀態是否有變動
    useEffect(() => {
        // 當 toDoList 代辦事項清空 ，陣列為空時，將 status 預設的值調整為 0 
        if (toDoList.length === 0) {
            updateStatus(0)
        }

        //  Tab 分類
        const filtedListTab = toDoList.filter((item) => {

            if (status === 0) {
                return item
            } else if (status === 1) {
                return !item.completed_at
            }
            else if (status === 2) {

                return item.completed_at;
            }
        })
        updatefiltedList(filtedListTab)


    }, [status, toDoList])

    return (
        <>


            <div id="todoListPage" className="bg-half">
                <nav>
                    <h1><Link to="/"></Link></h1>
                    <ul>
                        <li className="todo_sm"><a href="javascript:void(0)"><span> {userInfo.nickname} 的代辦</span></a></li>
                        <li><a href="javascript:void(0)" onClick={logout}>登出</a></li>
                    </ul>
                </nav>


                <div className="conatiner todoListPage vhContainer">
                    <div className="todoList_Content">
                        <div className="inputBox">
                            <form className='w-100' onSubmit={handleSubmit(addTodo)}>
                                <input type="text" placeholder="請輸入待辦事項"
                                    {...register("content", { required: { value: true, message: "代辦事項欄位為必填" } })} />
                                <button type="submit">
                                    <i className="fa fa-plus"></i>
                                </button>
                            </form>
                        </div>
                        <p>{errors.content?.message}</p>
                        {toDoList.length > 0 ? <div className="todoList_list">
                            <ul className="todoList_tab">
                                {statusPattern.map(({ code, name }, key) => <li key={key}><a href="javascript:void(0)" className={status === code ? "active" : ''} onClick={() => filtToDoList(code)} > {name}</a></li>)

                                }
                              
                            </ul>
                            <div className="todoList_items">
                                <ul className="todoList_item">
                                    {filtedList.map((item, key) => {
                                        return (

                                            <li key={key}>
                                                <label htmlFor={item.id} className="todoList_label">
                                                    <input className="todoList_input" id={item.id} type="checkbox" value="true" checked={item.completed_at ? "checked" : ""}
                                                        onChange={(e) => {
                                                            patchTodo(item)
                                                        }} />
                                                    <span> {item.content}</span>

                                                </label>
                                                <a href="javascript:void(0)" onClick={() => deleteTodo(item.id)}>
                                                    <i className="fa fa-times"></i>
                                                </a>
                                            </li>
                                        )
                                    })}

                                </ul>
                                <div className="todoList_statistics">
                                    <p> {unFinishTodo.length} 個待完成項目</p>
                                    <button type="button" onClick={deleteFinishTodos} disabled={!finishTodo.length ? true : ''}>清除已完成項目</button>
                                </div>
                            </div>
                        </div> : <div className="todoEmpty"><p>目前尚無待辦事項</p><img src={todolist_sm} /></div>}

                    </div>
                </div>
            </div>
        </>
    )
}