import styled from "styled-components";

type NotiCountProps = {
    number?: number
    children?: React.ReactNode;
}

type NotiCountContainerProps = {
    backgroundColor?: string
    color?: string
    fontSize?: string
    borderRadius?: string
    padding?: string
    margin?: string
    top?: string
    left?: string
    width?: string
    height?: string
}

export const NotiCountContainer = styled.span<NotiCountContainerProps>`
    background-color: ${props => props.backgroundColor || '#ed2a26'};
    color: ${props => props.color || 'white'};
    font-size: ${props => props.fontSize || '12px'};
    border-radius: ${props => props.borderRadius || '50%'};
    padding: ${props => props.padding || '0px 6px'};
    margin: ${props => props.margin || '0px'};
    width: ${props => props.width || '18px'};
    font-weight: 700;
    height: ${props => props.height || '18px'};
    position: absolute;
    top: ${props => props.top || '1px'};
    left: ${props => props.left || '18px'};
`;

const NotiCount = (props: NotiCountProps) => {
    return (
        <NotiCountContainer>
            {props.number}
        </NotiCountContainer>
    );
}

export default NotiCount;