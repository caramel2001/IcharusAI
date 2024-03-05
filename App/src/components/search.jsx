import React from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";

function SearchBar() {
  const [searchTerm, setSearchTerm] = React.useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    // You can also trigger a search or debounce this call
  };

  return (
    <TextField
      fullWidth
      value={searchTerm}
      onChange={handleSearchChange}
      placeholder="Search job titles, companies, or keywords..."
      variant="outlined"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
        style: {
          borderRadius: 10,
          boxShadow: "0px 3px 6px #00000029",
          backgroundColor: "white",
        },
      }}
      sx={{
        // width: "80%", // Set the width to 80%
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            borderColor: "transparent", // Hide border
          },
          "&:hover fieldset": {
            borderColor: "transparent", // Hide border on hover
          },
          "&.Mui-focused fieldset": {
            borderColor: "transparent", // Hide border when focused
          },
        },
      }}
    />
  );
}

export default SearchBar;
