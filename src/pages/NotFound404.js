
import NotfoundImage from "../images/404 Error-pana.png";
import {useNavigate } from 'react-router-dom';
import { setTitle } from '../util/title';

export default function NotFound404() {
  setTitle("404 | 找不到頁面")
  const navigate =useNavigate();
  return (
    <>
    <div className="bg-yellow">
      <div className="conatiner Page404 vhContainer " > 
        <img src={NotfoundImage} className="object-fit-cover Page404_img" width="500" height="500" alt="" />
        <buton  type="button"className="NotFound_btn"  
                onClick={()=>navigate(-1)}
                >找不到頁面，回到上一頁吧 !</buton>
      </div>
    </div>

    </>
  )
}
