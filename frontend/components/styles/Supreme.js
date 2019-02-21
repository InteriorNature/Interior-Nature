import styled from 'styled-components';

const Supreme = styled.h3`
  background: ${props => props.theme.oj};
  color: white;
  display: inline-block;
  padding: 4px 5px;
  border: 2px ${props => props.theme.oj};
  border-radius: 10px;
  margin: 0;
  font-size: 3rem;
`;

export default Supreme;

//transform: skew(-3deg);