import { Button, ButtonProps, Icon } from "@chakra-ui/react";
import { ChevronDownIcon } from "lucide-react";
import { forwardRef } from "react";

type Props = ButtonProps & {
  icon?: React.ReactNode;
  isOpen: boolean;
};

export const DropdownTrigger = forwardRef<HTMLButtonElement, Props>(
  ({ icon, children, isOpen, ...props }, ref) => {
    return (
      <Button
        justifyContent={"flex-start"}
        borderRadius={"2px"}
        height={"auto"}
        p="12px 32px 12px 12px"
        borderColor={"gray.200"}
        position={"relative"}
        _expanded={{
          borderColor: "blue.500",
        }}
        fontWeight={400}
        fontSize={{
          base: "1rem",
          lg: "0.875rem",
          md: "0.875rem",
        }}
        _hover={{
          borderColor: "blue.500",
          bg: "white",
        }}
        variant={"plain"}
        ref={ref}
        {...props}
      >
        {icon && (
          <Icon w={"14px"} h={"14px"} color="navy.500">
            {icon}
          </Icon>
        )}

        {children}

        <Icon
          position={"absolute"}
          right={"12px"}
          transition="transform 100ms ease-in-out"
          transform={isOpen ? "rotate(-180deg)" : "rotate(0deg)"}
        >
          <ChevronDownIcon />
        </Icon>
      </Button>
    );
  }
);

DropdownTrigger.displayName = "DropdownTrigger";
