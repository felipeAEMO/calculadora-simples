// components/Calculator/Calculator.test.js
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Calculator from './Calculator';

describe('Calculator', () => {
  it('renders correctly', () => {
    const { getByText } = render(<Calculator />);
    expect(getByText('0')).toBeInTheDocument();
  });

  it('adds numbers correctly', () => {
    const { getByText } = render(<Calculator />);
    fireEvent.click(getByText('2'));
    fireEvent.click(getByText('+'));
    fireEvent.click(getByText('3'));
    fireEvent.click(getByText('='));
    expect(getByText('5')).toBeInTheDocument();
  });

  it('subtracts numbers correctly', () => {
    const { getByText } = render(<Calculator />);
    fireEvent.click(getByText('7'));
    fireEvent.click(getByText('-'));
    fireEvent.click(getByText('4'));
    fireEvent.click(getByText('='));
    expect(getByText('3')).toBeInTheDocument();
  });

  it('multiplies numbers correctly', () => {
    const { getByText } = render(<Calculator />);
    fireEvent.click(getByText('3'));
    fireEvent.click(getByText('×'));
    fireEvent.click(getByText('4'));
    fireEvent.click(getByText('='));
    expect(getByText('12')).toBeInTheDocument();
  });

  it('divides numbers correctly', () => {
    const { getByText } = render(<Calculator />);
    fireEvent.click(getByText('8'));
    fireEvent.click(getByText('÷'));
    fireEvent.click(getByText('2'));
    fireEvent.click(getByText('='));
    expect(getByText('4')).toBeInTheDocument();
  });

  it('clears the display', () => {
    const { getByText } = render(<Calculator />);
    fireEvent.click(getByText('5'));
    fireEvent.click(getByText('C'));
    expect(getByText('0')).toBeInTheDocument();
  });

  it('handles decimal input', () => {
    const { getByText } = render(<Calculator />);
    fireEvent.click(getByText('5'));
    fireEvent.click(getByText('.'));
    fireEvent.click(getByText('2'));
    expect(getByText('5.2')).toBeInTheDocument();
  });

  it('handles percentage', () => {
    const { getByText } = render(<Calculator />);
    fireEvent.click(getByText('5'));
    fireEvent.click(getByText('0'));
    fireEvent.click(getByText('%'));
    expect(getByText('0.5')).toBeInTheDocument();
  });

  it('handles sign change', () => {
    const { getByText } = render(<Calculator />);
    fireEvent.click(getByText('5'));
    fireEvent.click(getByText('+/-'));
    expect(getByText('-5')).toBeInTheDocument();
  });
});