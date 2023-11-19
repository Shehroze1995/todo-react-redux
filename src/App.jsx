import { ToastContainer } from "react-toastify";
import AppTitle from "./components/AppTitle";
import Header from "./components/Header";
import Modal from "./components/Modal";
import TodoContainer from "./components/TodoContainer";
import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  return (
    <main>
      <div className="w-full border-4 border-orange-500"/>
      <AppTitle
        className={`text-6xl text-gray-500 font-extrabold w-max m-auto py-8 max-[374px]:text-3xl`}
        text={`TODO LIST`}
      />
      <Header/>
      <Modal/>
      <TodoContainer/>
      <ToastContainer/>
      <footer className="absolute bottom-0 left-0 w-full bg-gray-900 text-white text-center flex place-items-center place-content-center py-2"><p>Developed by <a className="text-blue-500 font-extrabold" href="https://github.com/Shehroze1995" target="_blank" rel="noreferrer">Shehroze</a></p></footer>
    </main>
  );
};

export default App;
