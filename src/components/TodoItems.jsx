import { useDispatch } from "react-redux";
import { MdDelete, MdEdit } from "react-icons/md";
import {
  deleteTodo,
  showModal,
  updateStatus,
  getTodo,
  setUpdatingTrue,
} from "../slices/todoSlice";
import { toast } from "react-toastify";

const TodoItems = ({ id, title, completed, time }) => {
  const dispatch = useDispatch();

  const handleChecked = () => {
    dispatch(updateStatus({ id }));
    toast.success(
      `${completed ? "Marked as incomplete" : "Marked as completed"}`
    );
  };

  const handleEdit = (id) => {
    dispatch(setUpdatingTrue());
    dispatch(getTodo({ id }));
    dispatch(showModal());
  };

  return (
    <article className="bg-white p-3 rounded-lg flex place-content-between select-none onRenderAnimate">
      <div>
        <p
          className={`text-xl capitalize break-all max-[374px]:text-base ${
            completed ? "line-through font-thin" : "font-extrabold"
          }`}
        >
          {title}
        </p>
        <p className="text-gray-500 max-[374px]:text-xs">{time}</p>
        <div className="flex place-items-center gap-2 max-[374px]:gap-1">
          <label className="max-[374px]:text-sm" htmlFor={id}>Completed</label>
          <input
            checked={completed}
            onChange={() => handleChecked()}
            className="w-[18px] h-[18px] max-[374px]:w-[12px]"
            type="checkbox"
            name="completed"
            id={id}
          />
        </div>
      </div>
      <div className="flex gap-2">
        <MdDelete
          onClick={() => {
            dispatch(deleteTodo({ id }));
            toast.success("Todo deleted");
          }}
          className="w-9 h-9 p-1 bg-gray-300 text-red-400 cursor-pointer rounded-lg transition-all duration-300 hover:text-red-500 max-[374px]:w-7 max-[374px]:h-7 max-[374px]:p-[2px]"
        />
        <MdEdit
          onClick={() => handleEdit(id)}
          className="w-9 h-9 p-1 bg-gray-300 text-blue-400 cursor-pointer rounded-lg transition-all duration-300 hover:text-blue-500 max-[374px]:w-7 max-[374px]:h-7 max-[374px]:p-[2px]"
        />
      </div>
    </article>
  );
};

export default TodoItems;
