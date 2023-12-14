import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppWrapper } from "./Pages/AppWrapper/AppWrapper";
import { DetailedWeather } from "./Pages/DetailedWeather/DetailedWeather";
import "./App.css";
import { Provider } from "react-redux";
import { store } from "./redux/strore/store";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppWrapper />} />
          <Route path="/details" element={<DetailedWeather />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
