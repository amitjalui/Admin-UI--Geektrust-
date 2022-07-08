import Main from "./Components/Main";
import { Box } from "@mui/material";
import "./App.css";

export const config = {
  endpoint: "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json",
} 

function App() {
  return (
    <>
      <Box className=" main-Box">
        <Main />
      </Box>
    </>
  );
}

export default App;