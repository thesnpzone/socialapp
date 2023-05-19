// import { createMuiTheme, TextField, ThemeProvider } from "@material-ui/core";
import React from "react";
import "./Header.css";
import { debounce } from "lodash";
import { createMuiTheme, TextField } from "@mui/material";
import { ThemeProvider } from "@emotion/react";

const Header = ({
  category,
  setCategory,
  setWord,
  word,
  setMeanings,
  LightTheme,
}) => {
  const darkTheme = createMuiTheme({
    palette: {
      primary: {
        main: LightTheme ? "#000" : "#000000",
      },
      type: LightTheme ? "light" : "dark",
    },
  });

  const handleChange = (e) => {
    setCategory(e.target.value);
    setWord("");
    setMeanings([]);
  };

    const handleText = debounce((text) => {
    setWord(text);
  }, 500);

  return (
    <div className="dictheader mb-5">
      <span className="dicttitle">{word ? word : "Word Hunter"}</span>
      <div className="dictinputs">
        <ThemeProvider theme={darkTheme}>
          <TextField
            className="dictsearch"
            id="filled-basic"
            // value={word}
            label="Search a Word"
            onChange={(e) => handleText(e.target.value)}
          />

        </ThemeProvider>
      </div>
    </div>
  );
};

export default Header;
