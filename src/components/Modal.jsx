import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IoClose } from "react-icons/io5";
import Button from "./Button";
import {
  addTodo,
  closeModal,
  setUpdatingFalse,
  setUpdatingTrue,
  updateTitle,
} from "../slices/todoSlice";
import { toast } from "react-toastify";

const Modal = () => {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("incomplete");

  const dispatch = useDispatch();

  const { isModalOpen, isUpdating, selectedTodo } = useSelector(
    (store) => store.todo
  );

  useEffect(() => {
    setTitle(selectedTodo.title || "");
    setStatus(
      !selectedTodo.completed ? "incomplete" : "complete" || "incomplete"
    );
  }, [isModalOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isUpdating) {
      dispatch(addTodo({ title, status }));
      toast.success("Todo added");
    } else {
      dispatch(updateTitle({ title, id: selectedTodo.id, status }));
      toast.success("Todo updated");
    }
    setTitle("");
    setStatus("incomplete");
    dispatch(closeModal());
    dispatch(setUpdatingFalse());
  };

  const addTitle = (e) => setTitle(e.target.value);

  const addStatus = (e) => setStatus(e.target.value);

  return (
    <div
      className={`fixed top-0 left-0 h-full w-full bg-[#0000005d] flex place-items-center place-content-center transition-all duration-300 ${
        isModalOpen ? "opacity-100" : "opacity-0 invisible"
      }`}
    >
      <form
        onSubmit={(e) => handleSubmit(e)}
        className={`bg-white p-4 rounded-lg grid gap-4 w-11/12 max-w-lg relative transition-all duration-300 ${
          isModalOpen ? "scale-100 opacity-100" : "scale-90 opacity-0"
        }`}
      >
        <h2 className="text-3xl font-extrabold text-gray-500 max-[374px]:text-xl">
          {isUpdating ? "UPDATE" : "ADD"} TODO
        </h2>
        <div>
          <label
            className="text-xl font-extrabold text-gray-700 max-[374px]:text-base"
            htmlFor="title"
          >
            Title
          </label>
          <input
            value={title || ""}
            onChange={(e) => addTitle(e)}
            className="border border-gray-400 w-full py-1 px-3 outline-none rounded-lg text-xl max-[374px]:text-base"
            type="text"
            required
            id="title"
          />
        </div>
        <div>
          <label
            className="text-xl font-extrabold text-gray-700 max-[374px]:text-base"
            htmlFor="status"
          >
            Status
          </label>
          <select
            value={status || "incomplete"}
            onChange={(e) => addStatus(e)}
            className="border border-gray-400 w-full py-2 px-3 outline-none rounded-lg text-xl max-[374px]:text-base"
            name="status"
            id="status"
          >
            <option value="incomplete">Incomplete</option>
            <option value="complete">Complete</option>
          </select>
        </div>
        <div className="my-2">
          <Button
            type="submit"
            text={`${isUpdating ? "UPDATE" : "ADD"} Task`}
          />
        </div>
        <IoClose
          onClick={() => {
            dispatch(closeModal());
            dispatch(setUpdatingFalse());
            setTitle("");
            setStatus("incomplete");
          }}
          className={`absolute -top-11 bg-red-500 text-white right-0 w-9 h-9 cursor-pointer rounded-lg transition-all duration-1000 hover:bg-white hover:text-black max-[374px]:w-7 max-[374px]:h-7 max-[374px]:-top-8 ${
            isModalOpen
              ? "translate-y-0 opacity-100"
              : "translate-y-11 opacity-0"
          }`}
        />
      </form>
    </div>
  );
};

export default Modal;
