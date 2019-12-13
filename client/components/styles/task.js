import styled from '@emotion/styled';

export const TaskViewStyle = styled.div`
  h2 {
    text-align: center;
    letter-spacing: -1;
    font-size: 2.5rem;
  }

  .progress {
    margin: 4rem 0;
    .units {
      display: flex;
      justify-content: space-between;
      p {
        margin: 0;
      }
    }

    .status {
      display: flex;
      justify-content: center;
    }

    .bar {
      width: 100%;
      height: 2rem;
      margin-top: 0.5rem;
      border: 1px solid ${props => props.theme.colors.primary};
    }

    .filled-bar {
      height: 2rem;
      background: ${props => props.theme.colors.primary};
    }
  }
`;

export const AddForm = styled.form`
  width: 100%;
  max-width: 900px;
  height: 4rem;
  margin: 0 auto;
  margin-top: 2rem;
  padding: 0 1rem;
  padding-bottom: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  bottom: 0;

  input[type='range'] {
    -webkit-appearance: none;
    width: 75%;
    height: 1rem;
    border-radius: 5px;
    background: #d3d3d3;
    outline: none;
    -webkit-transition: 0.2s;
    transition: opacity 0.2s;

    ::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 1.5rem;
      height: 1.5rem;
      border-radius: 50%;
      background: ${props => props.theme.colors.primary};
      cursor: pointer;
    }

    ::-moz-range-thumb {
      width: 1.5rem;
      height: 1.5rem;
      border-radius: 50%;
      background: ${props => props.theme.colors.primary};
      cursor: pointer;
    }
  }

  button {
    color: ${props => props.theme.colors.primary};
    font-size: 1.4rem;
    text-transform: uppercase;
    background: none;
    padding: 0.5rem 1rem;
    cursor: pointer;
    outline: none;
    margin-left: auto;
  }
`;

export const CompleteMessage = styled.div`
  p {
    font-size: 2rem;
    text-align: center;
  }
`;
