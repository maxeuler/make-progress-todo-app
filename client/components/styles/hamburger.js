import styled from '@emotion/styled';

const Hamburger = styled.div`
  .hamburg {
    display: block;
    background: none;
    width: 50px;
    height: 50px;
    position: relative;
    margin: 0;
    padding: 0;
    margin-left: auto;
    border-radius: 4px;
    cursor: pointer;
    outline: none;
  }
  -webkit-tap-highlight-color: transparent;

  #hamburg {
    display: none;
  }

  .line {
    position: absolute;
    left: 10px;
    height: 4px;
    width: 50px;
    background: ${props => props.theme.colors.primary};
    border-radius: 2px;
    display: block;
    transition: 0.5s;
    transform-origin: center;
    padding: 0;
  }

  .line:nth-of-type(1) {
    top: 12px;
  }
  .line:nth-of-type(2) {
    top: 24px;
  }
  .line:nth-of-type(3) {
    top: 36px;
  }

  #hamburg:checked + .hamburg .line:nth-of-type(1) {
    transform: translateY(12px) rotate(-45deg);
  }

  #hamburg:checked + .hamburg .line:nth-of-type(2) {
    opacity: 0;
  }

  #hamburg:checked + .hamburg .line:nth-of-type(3) {
    transform: translateY(-12px) rotate(45deg);
  }

  @media (min-width: 901px) {
    display: none;
    background: #697a8a;
  }
`;

export default Hamburger;
