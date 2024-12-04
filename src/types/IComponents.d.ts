declare namespace COMPONENTS {
    export interface DropdownProps extends React.HTMLAttributes<HTMLElement> {
        [key: string]: any;
        disabled?: boolean;
        isOpen?: boolean;
        setIsOpen?: (isOpen: boolean) => void;
    }

    export interface IOTPInputProps {
        length: number;
        [key: string]: any;
    }
}