import { useState, useRef, useEffect } from "react";
import DownArrow from "./DownSvg";

export default function Dropdown(_props) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [selected, setSelected] = useState(_props.selected);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-48" ref={dropdownRef}>
      <button
        className="w-full text-gray-500 font-semibold py-2 px-4 flex justify-start items-center gap-x-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selected} 

       {_props?.isHovered && <DownArrow isOpen={isOpen} />}
      </button>
      {isOpen && (
        <ul className="absolute w-full border rounded-lg shadow-md mt-2 bg-white z-10">
          {_props.options.map((option, index) => (
            <li
              key={index}
              className="px-4 py-2 text-gray-500 font-semibold hover:bg-gray-200 cursor-pointer"
              onClick={() => {
              
                _props.taskFunction(_props?.type, option);

              if(_props.type!=='delete')  
                setSelected(option);

                setIsOpen(false);
              }}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
