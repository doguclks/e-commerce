import { Button, Container } from "@mui/material";
import requests from "../../api/request";


export default function ErrorPage() {
    return (
        <Container>
           <Button sx={{mr: 2}} variant="contained" color="error" onClick={() => requests.Errors.get400Error().catch(error => console.log(error))}>400 Error</Button>

           <Button sx={{mr: 2}} variant="contained" color="error" onClick={() => requests.Errors.get401Error().catch(error => console.log(error))}>401 Error</Button>

           <Button sx={{mr: 2}} variant="contained" color="error" onClick={() => requests.Errors.get404Error().catch(error => console.log(error))}>404 Error</Button>

           <Button sx={{mr: 2}} variant="contained" color="error" onClick={() => requests.Errors.get500Error().catch(error => console.log(error))}>500 Error</Button>
           <Button sx={{mr: 2}} variant="contained" color="error" onClick={() => requests.Errors.getValidationError().catch(error => console.log(error))}>Validation Error</Button>
        </Container>
    )
}