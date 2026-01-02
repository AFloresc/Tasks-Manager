import { createTheme } from "@mui/material/styles";

export const getTheme = (mode) =>
    createTheme({
        palette: {
        mode,
        ...(mode === "light"
            ? {
                background: {
                default: "#fafafa",
                paper: "#fff"
                }
            }
            : {
                background: {
                default: "#121212",
                paper: "#1e1e1e"
                }
            })
        },
        shape: {
        borderRadius: 8
        }
    });