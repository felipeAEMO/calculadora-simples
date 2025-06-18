// components/Calculator/styles.js
import styled from 'styled-components';

export const CalculatorContainer = styled.div`
  width: 320px;
  margin: 0 auto;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`;

export const Display = styled.div`
  background: #1c1c1c;
  color: white;
  padding: 20px;
  text-align: right;
`;

export const DisplayHistory = styled.div`
  font-size: 1rem;
  color: #a5a5a5;
  min-height: 20px;
`;

export const DisplayCurrent = styled.div`
  font-size: 2.5rem;
  margin-top: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const ButtonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 1px;
  background: #999;
`;

const BaseButton = styled.button`
  border: none;
  padding: 20px;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.2s;
  outline: none;

  &:active {
    transform: scale(0.98);
    opacity: 0.9;
  }
`;

export const Button = styled(BaseButton)`
  background: #e0e0e0;

  &:hover {
    background: #d4d4d4;
  }
`;

export const OperatorButton = styled(BaseButton)`
  background: #f5923e;
  color: white;

  &:hover {
    background: #e0812d;
  }
`;

export const ClearButton = styled(BaseButton)`
  background: #c5c5c5;

  &:hover {
    background: #b5b5b5;
  }
`;

export const EqualsButton = styled(BaseButton)`
  background: #f5923e;
  color: white;

  &:hover {
    background: #e0812d;
  }
`;