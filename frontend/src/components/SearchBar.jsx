import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectSearch,
  selectShowSearch,
  setSearch,
  setShowSearch,
} from "../store/slices/uiSlice";
import search_icon from "../assets/search_icon.png";
import { useLocation } from "react-router-dom";

const SearchBar = () => {
  const dispatch = useDispatch();
  const search = useSelector(selectSearch);
  const showSearch = useSelector(selectShowSearch);
  const [visible, setVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setVisible(location.pathname.includes("collection"));
  }, [location]);

  return showSearch && visible ? (
    <div className="border-t border-b bg-gray-50 text-center">
      <div className="inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2">
        <input
          value={search}
          onChange={(e) => dispatch(setSearch(e.target.value))}
          className="flex-1 outline-none bg-inherit text-sm"
          type="text"
          placeholder="Search"
        />
        <img className="w-4" src={search_icon.png} alt="" />
      </div>
      <img
        onClick={() => dispatch(setShowSearch(false))}
        className="inline w-3 cursor-pointer"
        src={assets.cross_icon}
        alt=""
      />
    </div>
  ) : null;
};

export default SearchBar;
