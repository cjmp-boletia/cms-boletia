import styled from '@emotion/styled';

export const Image = styled.img`
    width: ${props => props.width ? props.width : '100px'};
    height: ${props => props.height ? props.height : '40px'};
    border-radius: ${props => props.borderRadius ? props.borderRadius : '0px'};
    margin-top: ${props => props.top ? props.top : '0px'};
`;