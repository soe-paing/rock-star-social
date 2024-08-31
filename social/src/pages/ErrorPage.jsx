import { Box } from "@mui/material"
import { Link } from "react-router-dom"

export default function ErrorPage() {
    return <>
        <Box sx={{ 
            display: "flex",
            height: 400,
            justifyContent: "center",
            alignItems: "center",
        }}>
            Something Went Wrong    
            <Link to="/">Go Home</Link>
        </Box>
    </>
}