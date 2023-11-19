import { useSelector } from "react-redux";
import TodoItems from "./TodoItems";
import { useEffect, useState } from "react";

const TodoContainer = () => {
  const { todoList, filterBy } = useSelector((store) => store.todo);
  const [filteredList, setFilteredList] = useState(todoList);

  useEffect(() => {
    setFilteredList(
      todoList.filter((todo) => {
        if (filterBy == "all") {
          return true;
        }
        if (filterBy == "incomplete") {
          return !todo.completed;
        }
        if (filterBy == "complete") {
          return todo.completed;
        }
      })
    );
  }, [filterBy, todoList]);

  const emptyList = (
    <p className="bg-gray-300 rounded-lg w-max m-auto py-1 px-4 text-xl onRenderAnimate max-[374px]:text-base">
      Todos Empty
    </p>
  );

  return (
    <div className=" w-11/12 max-w-xl m-auto my-6 bg-gray-200 p-4 rounded-lg grid gap-4 max-[374px]:p-3">
      {filteredList.length > 0
        ? filteredList.map((todo) => <TodoItems key={todo.id} {...todo} />)
        : emptyList}
    </div>
  );
};

export default TodoContainer;
