import React from 'react';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Box from '@mui/material/Box';
import { height } from '@mui/system';

// Correctly receiving props as a destructured object
const JobDescriptionInput = ({ jobDescription, setJobDescription }) => {
  const handleDescriptionChange = (event) => {
    setJobDescription(event.target.value);
  };

  return (
    <Box sx={{width: '100%',margin:"auto"}}>
      <TextareaAutosize
        minRows={10}
        style={{
          width: '100%', // Use 100% width to ensure it is responsive
          padding: '12px',
          fontSize: '16px',
          borderRadius: '10px',
          boxShadow: '0px 3px 6px #00000029',
          border: '1px solid #0000FF', // Corrected to a valid color code
          backgroundColor: 'white',
          // maxHeight: "300px",
          // overflow: 'scroll',
          // overflow: 'scroll',
          // resize: 'none', // Disable resizing
        }}
        placeholder="Paste the job description here..."
        value={jobDescription} // Use the jobDescription prop for the value
        onChange={handleDescriptionChange} // Update state on change
        className='w-full mt-5 p-5 rounded-lg border-2 border-blue-500 bg-white'
      />
    </Box>
  );
}

export default JobDescriptionInput;
