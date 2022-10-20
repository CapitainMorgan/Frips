import { Box, IconButton, MenuItem } from '@material-ui/core'
import React from 'react'
import { Link ,Router, useNavigate} from 'react-router-dom'
import Logo from "../../img/Logo.png"
import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';
export const Footer = () => {
    const history = useNavigate()
    return (
        <Box width={"100%"} minHeight={100} display="flex"  style={{backgroundColor:"#82A0C2"}} >
            <Box margin="auto" display="flex" alignItems="center">
            <Box height={"100%"} width={100} >
                <img src={Logo} style={{width:"100%", height:"100%", objectFit:"cover", border:1,borderRadius:5,stroke:1}} />
            </Box>
            <Box>
                <MenuItem
                onClick={()=>history("/Condition-général-de-vente-et-politique")}
                >
                    CG
                </MenuItem>
            </Box>
            <Box>
                <MenuItem
                onClick={()=>history("/Aide")}
                >
                    Aide
                </MenuItem>
            </Box>
            <Box>
                <MenuItem
                onClick={()=>history("/assisstance")}
                >
                    Assisstance 
                </MenuItem>
            </Box>
            <Box>
                <IconButton><InstagramIcon/> </IconButton>
            </Box>
            <Box>
                <IconButton><FacebookIcon/> </IconButton>
            </Box>
           
            </Box>
            
        </Box>
    )
}

export default Footer
