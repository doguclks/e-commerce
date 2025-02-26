import { Button, Container, Divider, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

export default function NotFound ()
{
    return (
        <Container>
            <Typography variant="h5" gutterBottom>Not Found</Typography>
            <Divider />
            <Button sx = {{mt: 3}}component={NavLink} to="/catalog" variant="contained" color="primary">Continue Shopping</Button>
        </Container>
    )
} 