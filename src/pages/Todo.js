import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import { ApiGetToDoList } from '../util/api';
import { setTitle } from '../util/title'

export default function Todo() {
    setTitle("Todo 列表")
    const [toDoList, updateList] = useState([]); // 原始資料
    const [filtedList,updatefiltedList] = useState([]); // 過濾過後的資料，預設為全部 ( 顯示在畫面上)
    

    useEffect(() => {
        async function fetchData() {
            // You can await here
            const response = await ApiGetToDoList({ token: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIzNTYiLCJzY3AiOiJ1c2VyIiwiYXVkIjpudWxsLCJpYXQiOjE2NjIwMjYzMzUsImV4cCI6MTY2MzMyMjMzNSwianRpIjoiOTAxMWRlZWQtNjRlMC00MThkLThkYjgtMWM4NTY0NTI5ZGRhIn0.N1_qVmYdv68kciaOAMnUkZT5RMcw-P_O7dBn9AQc69E' })
            // ...
            const { todos } = response
            updateList(todos)
            updatefiltedList(todos)
        }
        fetchData();
        console.log(1)
    }, [])



    const [status, updateStatus] = useState(0);
    const statusPattern = [{ code: 0, name: '全部' }, { code: 1, name: '待完成' }, { code: 2, name: '已完成' }];

    const filtToDoList =  (code) => {
         updateStatus(code)
    }
    // const


    //  監聽 status 的狀態是否有變動
    useEffect(() => {
        console.log(status)
        const filtedList = toDoList.filter((item) => {

            if (status === 0) {
                return item
            } else if (status === 1) {
                return !item.completed_at
            }
            else if (status === 2) {
                return item.completed_at
            }
        })
        console.log('filtedList', filtedList);
        updatefiltedList(filtedList)
    }, [])

    return (
        <>
            <div id="todoListPage" className="bg-half">
                <nav>
                    <h1><a href="#">ONLINE TODO LIST</a></h1>
                    <ul>
                        <li className="todo_sm"><a href="#"><span>王小明的代辦</span></a></li>
                        <li><a href="#loginPage">登出</a></li>
                    </ul>
                </nav>
                <div className="conatiner todoListPage vhContainer">
                    <div className="todoList_Content">
                        <div className="inputBox">
                            <input type="text" placeholder="請輸入待辦事項" />
                            <a href="#">
                                <i className="fa fa-plus"></i>
                            </a>
                        </div>
                        <div className="todoList_list">
                            <ul className="todoList_tab">
                                {statusPattern.map(({ code, name }, key) => <li key={key}><a href="javascrupt:void(0)" className={status === code ? "active" : ''} onClick={() => filtToDoList(code)} > {name}</a></li>)

                                }
                                {/* <li><a href="#" className="active"></a></li>
                                <li><a href="#"></a></li>
                                <li><a href="#"></a></li> */}
                            </ul>
                            <div className="todoList_items">
                                <ul className="todoList_item">
                                    {filtedList.map((item, key) => {
                                        return (

                                            <li key={key}>
                                                <label className="todoList_label">
                                                    <input className="todoList_input" type="checkbox" value="true" />
                                                    <span> {item.content}</span>
                                                </label>
                                                <a href="#">
                                                    <i className="fa fa-times"></i>
                                                </a>
                                            </li>
                                        )
                                    })}

                                </ul>
                                <div className="todoList_statistics">
                                    <p> 5 個已完成項目</p>
                                    <a href="#">清除已完成項目</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}