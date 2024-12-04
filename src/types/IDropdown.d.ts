declare namespace Dropdown {
    export interface DropdownProps extends React.HTMLAttributes<HTMLElement> {
        [key: string]: any;
        disabled?: boolean;
        isOpen?: boolean;
        setIsOpen?: (isOpen: boolean) => void;
    }
}