import React from 'react';
import styled, { css } from 'styled-components';

// Button variants and sizes
export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  as?: any;
  children: React.ReactNode;
  [key: string]: any; // Allow any additional props
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    variant = 'primary', 
    size = 'md', 
    isLoading = false, 
    leftIcon, 
    rightIcon, 
    fullWidth = false,
    disabled,
    as: Component = 'button',
    children, 
    ...props 
  }, ref) => {
    return (
      <StyledButton
        as={Component}
        ref={ref}
        variant={variant}
        size={size}
        disabled={disabled || isLoading}
        fullWidth={fullWidth}
        {...props}
      >
        {isLoading ? (
          <LoadingSpinner size={size} />
        ) : (
          <>
            {leftIcon && <IconWrapper>{leftIcon}</IconWrapper>}
            {children}
            {rightIcon && <IconWrapper>{rightIcon}</IconWrapper>}
          </>
        )}
      </StyledButton>
    );
  }
);

Button.displayName = 'Button';

// Variant styles
const getVariantStyles = (variant: ButtonVariant) => {
  const variants = {
    primary: css`
      background-color: ${({ theme }) => theme.colors.primary[500]};
      color: ${({ theme }) => theme.colors.text.inverse};
      border: 1px solid ${({ theme }) => theme.colors.primary[500]};
      
      &:hover:not(:disabled) {
        background-color: ${({ theme }) => theme.colors.primary[600]};
        border-color: ${({ theme }) => theme.colors.primary[600]};
        transform: translateY(-1px);
        box-shadow: ${({ theme }) => theme.boxShadow.md};
      }
      
      &:active:not(:disabled) {
        background-color: ${({ theme }) => theme.colors.primary[700]};
        transform: translateY(0);
      }
    `,
    
    secondary: css`
      background-color: ${({ theme }) => theme.colors.secondary[100]};
      color: ${({ theme }) => theme.colors.secondary[900]};
      border: 1px solid ${({ theme }) => theme.colors.secondary[200]};
      
      &:hover:not(:disabled) {
        background-color: ${({ theme }) => theme.colors.secondary[200]};
        border-color: ${({ theme }) => theme.colors.secondary[300]};
        transform: translateY(-1px);
        box-shadow: ${({ theme }) => theme.boxShadow.md};
      }
      
      &:active:not(:disabled) {
        background-color: ${({ theme }) => theme.colors.secondary[300]};
        transform: translateY(0);
      }
    `,
    
    outline: css`
      background-color: transparent;
      color: ${({ theme }) => theme.colors.primary[600]};
      border: 1px solid ${({ theme }) => theme.colors.primary[300]};
      
      &:hover:not(:disabled) {
        background-color: ${({ theme }) => theme.colors.primary[50]};
        border-color: ${({ theme }) => theme.colors.primary[400]};
        color: ${({ theme }) => theme.colors.primary[700]};
        transform: translateY(-1px);
        box-shadow: ${({ theme }) => theme.boxShadow.md};
      }
      
      &:active:not(:disabled) {
        background-color: ${({ theme }) => theme.colors.primary[100]};
        transform: translateY(0);
      }
    `,
    
    ghost: css`
      background-color: transparent;
      color: ${({ theme }) => theme.colors.text.secondary};
      border: 1px solid transparent;
      
      &:hover:not(:disabled) {
        background-color: ${({ theme }) => theme.colors.secondary[100]};
        color: ${({ theme }) => theme.colors.text.primary};
        transform: translateY(-1px);
      }
      
      &:active:not(:disabled) {
        background-color: ${({ theme }) => theme.colors.secondary[200]};
        transform: translateY(0);
      }
    `,
    
    danger: css`
      background-color: ${({ theme }) => theme.colors.error[500]};
      color: ${({ theme }) => theme.colors.text.inverse};
      border: 1px solid ${({ theme }) => theme.colors.error[500]};
      
      &:hover:not(:disabled) {
        background-color: ${({ theme }) => theme.colors.error[600]};
        border-color: ${({ theme }) => theme.colors.error[600]};
        transform: translateY(-1px);
        box-shadow: ${({ theme }) => theme.boxShadow.md};
      }
      
      &:active:not(:disabled) {
        background-color: ${({ theme }) => theme.colors.error[700]};
        transform: translateY(0);
      }
    `,
  };
  
  return variants[variant];
};

// Size styles
const getSizeStyles = (size: ButtonSize) => {
  const sizes = {
    sm: css`
      height: ${({ theme }) => theme.components.button.height.sm};
      padding: ${({ theme }) => theme.components.button.padding.sm};
      font-size: ${({ theme }) => theme.typography.fontSize.sm};
      font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
      border-radius: ${({ theme }) => theme.borderRadius.md};
    `,
    
    md: css`
      height: ${({ theme }) => theme.components.button.height.md};
      padding: ${({ theme }) => theme.components.button.padding.md};
      font-size: ${({ theme }) => theme.typography.fontSize.base};
      font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
      border-radius: ${({ theme }) => theme.borderRadius.lg};
    `,
    
    lg: css`
      height: ${({ theme }) => theme.components.button.height.lg};
      padding: ${({ theme }) => theme.components.button.padding.lg};
      font-size: ${({ theme }) => theme.typography.fontSize.lg};
      font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
      border-radius: ${({ theme }) => theme.borderRadius.xl};
    `,
  };
  
  return sizes[size];
};

const StyledButton = styled.button<{
  variant: ButtonVariant;
  size: ButtonSize;
  fullWidth: boolean;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing[2]};
  font-family: ${({ theme }) => theme.typography.fontFamily.sans.join(', ')};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transition.duration.normal} ${({ theme }) => theme.transition.timing.ease};
  white-space: nowrap;
  user-select: none;
  position: relative;
  
  ${({ variant }) => getVariantStyles(variant)}
  ${({ size }) => getSizeStyles(size)}
  
  ${({ fullWidth }) => fullWidth && css`
    width: 100%;
  `}
  
  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary[500]};
    outline-offset: 2px;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none !important;
    box-shadow: none !important;
  }
`;

const IconWrapper = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LoadingSpinner = styled.div<{ size: ButtonSize }>`
  width: ${({ size }) => size === 'sm' ? '16px' : size === 'lg' ? '24px' : '20px'};
  height: ${({ size }) => size === 'sm' ? '16px' : size === 'lg' ? '24px' : '20px'};
  border: 2px solid transparent;
  border-top: 2px solid currentColor;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

export default Button;