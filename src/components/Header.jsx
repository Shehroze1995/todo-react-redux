import { useDispatch } from "react-redux";
import Button, { SelectBtn } from "./Button";
import { showModal } from "../slices/todoSlice";

const Header = () => {
  const dispatch = useDispatch();
  return (
    <section className="flex place-content-between w-11/12 max-w-xl m-auto">
      <Button onClick={() => dispatch(showModal())} text={`Add Task`} />
      <SelectBtn />
    </section>
  );
};

export default Header;
