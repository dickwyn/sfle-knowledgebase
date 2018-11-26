import React from "react";
import Search from "material-ui-search-bar";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import SectionTitle from "../SectionTitle";

export default function SearchBar() {
  return (
    <div style={{ width: "800px" }}>
      <SectionTitle label="Keyword Search" />
      <MuiThemeProvider>
        <Search
          onChange={() => console.log("onChange")}
          onRequestSearch={() => console.log("onRequestSearch")}
        />
      </MuiThemeProvider>
    </div>
  );
}
