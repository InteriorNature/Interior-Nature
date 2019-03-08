import styled from 'styled-components';

const Title = styled.h3`
  margin: 0 1rem;
  text-align: center;
  margin-top: -1rem;
  text-shadow: 2px 2px 0 rgba(0, 0, 0, 0.1);
  a {
    background: ${props => props.theme.ojlight};
    border: 1px ${props => props.theme.ojlight};
    border-radius: 20px;
    display: inline;
    line-height: 1.3;
    font-size: 2.5rem;
    @media (max-width: 768px) { 
       font-size: 2.2rem;
    }
    @media (max-width: 412px) { 
       font-size: 2rem;
    }
    text-align: center;
    color: white;
    padding: 0 1rem;
  }
`;

export default Title;
//transform: skew(-5deg) rotate(-1deg);