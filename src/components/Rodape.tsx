import React from "react";
import  Typography from "@mui/material/Typography";

const Rodape: React.FC = () => {
    const anoAtual = new Date().getFullYear();

    return(
        <footer style={{marginTop: "2rem", textAlign: "center"}}>
            <Typography variant="body2" color="textSecondary">
                @ {anoAtual} Todos os direitos reservados
            </Typography>
            <Typography variant="body2" color="textSecondary">
                MedLine
            </Typography>
        </footer>
    )
}
export default Rodape