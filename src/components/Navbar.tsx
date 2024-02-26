"use client";

import useAuthenticatedUser from "@/hooks/useAuthenticatedUser";
import * as UsersApi from "@/network/api/user";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { useRouter } from "next/navigation";
import * as React from "react";
import Image from "next/image";

//const pages = [''];
const settings = ["Perfil", "Minha conta", "Dashboard"];

export default function Navbar() {
  const { user, mutateUser } = useAuthenticatedUser();
  const router = useRouter();

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = async () => {
    await UsersApi.logout();
    mutateUser(null);
    handleCloseUserMenu();
    router.push("/");
  };

  const theme = useTheme();

  return (
    <AppBar position="fixed">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link href="/home">
            <Image
              src="/images/medline_transparente_branco.png"
              alt="MedLine"
              width={170}
              height={50}
            />
          </Link>

          {user && user.userType === UsersApi.UserType.recepcionista && (
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                <Link href={"/home/clinic"}>
                  <MenuItem>
                    <Typography textAlign="center">Clínica</Typography>
                  </MenuItem>
                </Link>
              </Menu>
            </Box>
          )}
          <Link href="/home"></Link>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Link href={"/home/clinic"}>
              {user && user?.userType === UsersApi.UserType.recepcionista && (
                <Button sx={{ my: 2, color: "white", display: "block" }}>
                  Clínica
                </Button>
              )}
            </Link>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Abrir menu">
              <IconButton
                style={{ display: "flex", gap: 8 }}
                onClick={handleOpenUserMenu}
                sx={{ p: 0 }}
              >
                <Typography color="white" fontFamily="Inter">
                  Olá, {user?.name}
                </Typography>

                {user && user.userType === UsersApi.UserType.doctor && (
                  <Avatar
                    sx={{ height: theme.spacing(6), width: theme.spacing(6) }}
                    src="https://t3.ftcdn.net/jpg/06/08/67/00/240_F_608670019_70V6uzPwlY5AhdhsmQnldUvqLOZdfXqt.jpg"
                  />
                )}

                {user && user.userType === UsersApi.UserType.recepcionista && (
                  <Avatar
                    sx={{ height: theme.spacing(6), width: theme.spacing(6) }}
                    src="https://t3.ftcdn.net/jpg/06/72/40/74/240_F_672407491_F0Qe9pjXEISgqztkCqiBkIsDusZGAJwd.jpg"
                  />
                )}

                {user && user.userType === UsersApi.UserType.patient && (
                  <Avatar
                    sx={{ height: theme.spacing(6), width: theme.spacing(6) }}
                    src="https://t3.ftcdn.net/jpg/06/92/34/64/240_F_692346400_UzYGmrJm6qhyPPXyZeUGuyEhkwr1iSFN.jpg"
                  />
                )}
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
              <MenuItem onClick={handleLogout}>
                <Typography textAlign="center">Logout</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
