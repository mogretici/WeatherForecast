import "./App.css";
import Header from "./components/Header";
import { Card } from "semantic-ui-react";
import Weather from "./components/Weather";
import { ThemeProvider } from "./components/context/ThemeContext";



function App() {

  return (
    <ThemeProvider >
    <Card fluid raised style={{backgroundColor:"#4c5da3"}} className={`card`}>
      <Header />
      <Weather />
    </Card>
    </ThemeProvider>
  );
}

export default App;
