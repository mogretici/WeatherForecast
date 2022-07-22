import React from "react";
import { Button, Divider, Icon } from "semantic-ui-react";

// import {useTheme} from './context/ThemeContext'
// import { Image } from 'semantic-ui-react'

function Header() {
  // const {theme, setTheme}= useTheme();
  // const lightIcon = "https://openweathermap-app-contextapi-reactjs.netlify.app/static/media/01d.54288da67b71b4b19483d373d683257f.svg"
  // const darkIcon = "https://openweathermap-app-contextapi-reactjs.netlify.app/static/media/01n.9ed9031b8fd64da63790aab749eedfa9.svg"

  // const changeTheme = () => {
  //   if (theme === "light") {
  //     setTheme("dark");
  //   } else {
  //     setTheme("light");
  //   }
  // }

  return (
    <div>
      <div align="right">
        <Button
          icon
          onClick={() =>
            window.open(
              "https://github.com/mogretici/weather",
              "_blank",
              "noopener noreferrer"
            )
          }
        >
          <Icon name="github" />
          Github Repository
        </Button>
      </div>
      <Divider />
      <div>
        <h1 align="center" style={{ color: "white", fontSize: 35 }}>
          WEATHER FORECAST
        </h1>
      </div>

      {/* {theme==="dark"?<Image src={lightIcon} size="tiny" onClick={changeTheme} align='right' />:<Image src={darkIcon} size="tiny" onClick={changeTheme} align='right' />} */}
    </div>
  );
}

export default Header;
