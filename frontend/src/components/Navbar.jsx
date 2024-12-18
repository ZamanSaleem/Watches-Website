// import { useDispatch, useSelector } from "react-redux";
// import { Link, NavLink, useNavigate } from "react-router-dom";
// import { AiOutlineUser } from "react-icons/ai"; 
// import { selectCartCount } from "../store/slices/cartSlice";
// import { logout, selectToken } from "../store/slices/authSlice";
// import { selectSearch, setSearch } from "../store/slices/uiSlice";
// import { clearCart } from "../store/slices/cartSlice";
// import logo from "./../assets/logo.png";
// import { MdOutlineShoppingBag } from "react-icons/md";
// import search_icon from "../assets/search_icon.png";

// const Navbar = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const cartCount = useSelector(selectCartCount);
//   const token = useSelector(selectToken);
//   const search = useSelector(selectSearch);

//   const handleLogout = () => {
//     dispatch(logout());
//     dispatch(clearCart());
//     navigate("/login");
//   };

//   return (
//     <div className="bg-gray-200 px-7 flex items-center justify-between  font-medium">
//       <Link to="/" className="w-full max-w-20 flex-shrink-0">
//         <img src={logo} alt="Logo" />
//       </Link>

//       <ul className="flex gap-5 text-sm text-gray-700 ml-40">
//         <NavLink to="/" className="flex flex-col items-center gap-1">
//           <p>HOME</p>
//           <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
//         </NavLink>
//         <NavLink to="/collection" className="flex flex-col items-center gap-1">
//           <p>COLLECTION</p>
//           <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
//         </NavLink>
//         <NavLink to="/about" className="flex flex-col items-center gap-1">
//           <p>ABOUT</p>
//           <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
//         </NavLink>
//       </ul>

//       <div className="flex items-center ml-auto gap-6">
//         <div className="flex mr-48 items-center border rounded-md px-2 py-1">
//           <input
//             value={search}
//             onChange={(e) => dispatch(setSearch(e.target.value))}
//             className="outline-none text-sm bg-inherit w-48"
//             type="text"
//             placeholder="Search"
//           />
//           <img className="w-4 cursor-pointer" src={search_icon} alt="" />

//           <Link to="/cart" className="relative ml-2">
//             <MdOutlineShoppingBag size={27} className="text-gray-700" />
//             {cartCount > 0 && (
//               <p className="absolute right-[-5px] top-[-5px] w-4 h-4 text-center leading-4 bg-black text-white rounded-full text-[8px]">
//                 {cartCount}
//               </p>
//             )}
//           </Link>
//         </div>

//         <div className="group relative">
//           <AiOutlineUser
//             size={25}
//             onClick={() => (token ? null : navigate("/login"))}
//             className="cursor-pointer text-gray-700"
//           />
//           {token && (
//             <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
//               <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
//                 <p
//                   onClick={() => navigate("/orders")}
//                   className="cursor-pointer hover:text-black"
//                 >
//                   Orders
//                 </p>
//                 <p
//                   onClick={handleLogout}
//                   className="cursor-pointer hover:text-black"
//                 >
//                   Logout
//                 </p>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Navbar;



import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AiOutlineUser } from "react-icons/ai"; 
import { selectCartCount } from "../store/slices/cartSlice";
import { logout, selectToken } from "../store/slices/authSlice";
import { clearCart } from "../store/slices/cartSlice";
import logo from "./../assets/logo.png";
import { MdOutlineShoppingBag } from "react-icons/md";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartCount = useSelector(selectCartCount);
  const token = useSelector(selectToken);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearCart());
    navigate("/login");
  };

  return (
    <div className="bg-gray-200 px-7 flex items-center justify-between font-medium">
      <Link to="/" className="w-full max-w-20 flex-shrink-0">
        <img src={logo} alt="Logo" />
      </Link>

      <ul className="flex gap-5 text-sm text-gray-700 ml-40">
        <NavLink to="/" className="flex flex-col items-center gap-1">
          <p>HOME</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/collection" className="flex flex-col items-center gap-1">
          <p>COLLECTION</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/about" className="flex flex-col items-center gap-1">
          <p>ABOUT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
      </ul>

      <div className="flex items-center ml-auto gap-6">
        <Link to="/cart" className="relative">
          <MdOutlineShoppingBag size={27} className="text-gray-700" />
          {cartCount > 0 && (
            <p className="absolute right-[-5px] top-[-5px] w-4 h-4 text-center leading-4 bg-black text-white rounded-full text-[8px]">
              {cartCount}
            </p>
          )}
        </Link>

        <div className="group relative">
          <AiOutlineUser
            size={25}
            onClick={() => (token ? null : navigate("/login"))}
            className="cursor-pointer text-gray-700"
          />
          {token && (
            <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
              <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
                <p
                  onClick={() => navigate("/orders")}
                  className="cursor-pointer hover:text-black"
                >
                  Orders
                </p>
                <p
                  onClick={handleLogout}
                  className="cursor-pointer hover:text-black"
                >
                  Logout
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
