import "./sass/app.scss";
import Main from "./components/Main";
import Footer from "./components/Footer";
import Header from "./components/Header";

function App() {
  return (
    <div className="app">
      <Header />
      <Main />
      <Footer />
    </div>
  );
}

export default App;
