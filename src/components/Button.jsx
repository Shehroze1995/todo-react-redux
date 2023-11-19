import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../slices/todoSlice";

const Button = ({ text, variant = `primary`, ...rest }) => {
  return (
    <button
      className={`py-2 px-5 text-xl rounded-lg font-extrabold outline-none transition-all duration-300  max-[374px]:text-base max-[374px]:px-3 ${
        variant == "primary"
          ? "bg-blue-500 text-white hover:bg-blue-600"
          : "bg-gray-300 text-gray-700 hover:bg-gray-400"
      }`}
      {...rest}
    >
      {text}
    </button>
  );
};

export const SelectBtn = () => {
  const dispatch = useDispatch();
  const { filterBy } = useSelector((store) => store.todo);

  const handleSelection = (e) => {
    dispatch(setFilter(e.target.value));
  };

  return (
    <select
      value={filterBy}
      onChange={(e) => handleSelection(e)}
      className="bg-gray-300 outline-none rounded-lg p-2 max-[374px]:p-1"
    >
      <option value="all">All</option>
      <option value="incomplete">Incomplete</option>
      <option value="complete">Completed</option>
    </select>
  );
};

export default Button;
