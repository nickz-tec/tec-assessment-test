"use client";

import { Box, BoxProps } from "@chakra-ui/react";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  maxHeight: BoxProps["maxHeight"];
};

export function ScrollContainer({ children, maxHeight }: Props) {
  return (
    <Box
      position="relative"
      _before={{
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: "50px",
        background: "linear-gradient(to bottom, white, transparent)",
        pointerEvents: "none",
        zIndex: 1,
      }}
      _after={{
        content: '""',
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: "50px",
        background: "linear-gradient(to top, white, transparent)",
        pointerEvents: "none",
        zIndex: 1,
      }}
    >
      <Box maxHeight={maxHeight} overflowY="auto">
        {children}
      </Box>
    </Box>
  );
}
