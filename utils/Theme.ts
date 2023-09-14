// theme.js
import { extendTheme } from "@chakra-ui/react";
import type { StyleFunctionProps } from '@chakra-ui/styled-system';
import { ComponentStyleConfig } from '@chakra-ui/react'

const Theme = extendTheme({
    colors: {
        dw1: "#DD4854",
        dw2: "#E9A367",
        dw3: "#E2E7B9",
        dw4: "#39B1A1",
        dw5: "#EEC6D8",
        dw6: "#3CA1D5",
    },
    gradients: {
        dwGradient1: "linear(to-r, dw1, dw2)",
        dwGradient2: "linear(to-r, dw3, dw4)",
        dwtGradient3: "linear(to-r, dw5, dw6)",
    },
    fonts: {
        body: "Rubik, sans-serif",
        // You can also define other font variants like heading, mono, etc., if needed.
    },
    components: {
        Button: {
            baseStyle: {
                borderRadius: "md",
                fontWeight: "semibold",
                transition: "all 0.2s cubic-bezier(.08,.52,.52,1)",
                p: 4,
                color: "white",
            },
            variants: {
                primary: {
                    bg: "dw2",
                    color: "white",
                    boxShadow: "dark-lg",
                    _hover: { bg: "#e97856", 
                },
                    _active: {
                        bg: "#e97856",
                        transform: "scale(0.98)",
                        borderColor: "#bec3c9",
                    },
                },
                secondary: {
                    bg: "dw3",
                    borderColor: "#aa3c3b",
                    _active: {
                        bg: "#aa3c3b",
                        transform: "scale(0.98)",
                    },
                    _hover: {
                        bg: "#aa3c3b",                         
                    borderColor: "#e97856",
                }
           },
            },
            sizes: {
                xs: {
                    fontSize: "8px",
                    px: "6px",
                    py: "4px",
                    height: "28px",
                },
                sm: {
                    fontSize: "10px",
                    px: "8px",
                    py: "6px",
                    height: "28px",
                },
                md: {
                    fontSize: "12px",
                    px: "10px",
                    py: "8px",

                    height: "36px",
                },
                lg: {
                    fontSize: "14px",
                    px: "12px",
                    py: "10px",
                    height: "42px",
                },
            },
        },
    }
});

export default Theme;
