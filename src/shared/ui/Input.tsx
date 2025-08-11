import React from 'react';
import styled, { css } from 'styled-components';

export type InputSize = 'sm' | 'md' | 'lg';
export type InputState = 'default' | 'error' | 'success';

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  size?: InputSize;
  state?: InputState;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  label?: string;
  helperText?: string;
  errorText?: string;
  fullWidth?: boolean;
  multiline?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ 
    size = 'md', 
    state = 'default',
    leftIcon, 
    rightIcon, 
    label,
    helperText,
    errorText,
    fullWidth = false,
    multiline = false,
    className,
    ...props 
  }, ref) => {
    const finalState = errorText ? 'error' : state;
    const displayHelperText = errorText || helperText;

    return (
      <InputContainer className={className} fullWidth={fullWidth}>
        {label && <Label htmlFor={props.id}>{label}</Label>}
        <InputWrapper>
          {leftIcon && <IconWrapper position="left">{leftIcon}</IconWrapper>}
          {multiline ? (
            <StyledTextarea
              ref={ref as any}
              size={size}
              state={finalState}
              hasLeftIcon={!!leftIcon}
              hasRightIcon={!!rightIcon}
              {...props as any}
            />
          ) : (
            <StyledInput
              ref={ref}
              size={size}
              state={finalState}
              hasLeftIcon={!!leftIcon}
              hasRightIcon={!!rightIcon}
              {...props}
            />
          )}
          {rightIcon && <IconWrapper position="right">{rightIcon}</IconWrapper>}
        </InputWrapper>
        {displayHelperText && (
          <HelperText state={finalState}>
            {displayHelperText}
          </HelperText>
        )}
      </InputContainer>
    );
  }
);

Input.displayName = 'Input';

// Size styles
const getSizeStyles = (size: InputSize) => {
  const sizes = {
    sm: css`
      height: ${({ theme }) => theme.components.input.height.sm};
      padding: 0 ${({ theme }) => theme.spacing[3]};
      font-size: ${({ theme }) => theme.typography.fontSize.sm};
      border-radius: ${({ theme }) => theme.borderRadius.md};
    `,
    
    md: css`
      height: ${({ theme }) => theme.components.input.height.md};
      padding: 0 ${({ theme }) => theme.spacing[3]};
      font-size: ${({ theme }) => theme.typography.fontSize.base};
      border-radius: ${({ theme }) => theme.borderRadius.lg};
    `,
    
    lg: css`
      height: ${({ theme }) => theme.components.input.height.lg};
      padding: 0 ${({ theme }) => theme.spacing[4]};
      font-size: ${({ theme }) => theme.typography.fontSize.lg};
      border-radius: ${({ theme }) => theme.borderRadius.xl};
    `,
  };
  
  return sizes[size];
};

// State styles
const getStateStyles = (state: InputState) => {
  const states = {
    default: css`
      border-color: ${({ theme }) => theme.colors.border.default};
      
      &:focus {
        border-color: ${({ theme }) => theme.colors.primary[500]};
        box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary[100]};
      }
      
      &:hover:not(:focus) {
        border-color: ${({ theme }) => theme.colors.border.strong};
      }
    `,
    
    error: css`
      border-color: ${({ theme }) => theme.colors.error[500]};
      
      &:focus {
        border-color: ${({ theme }) => theme.colors.error[500]};
        box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.error[100]};
      }
    `,
    
    success: css`
      border-color: ${({ theme }) => theme.colors.success[500]};
      
      &:focus {
        border-color: ${({ theme }) => theme.colors.success[500]};
        box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.success[100]};
      }
    `,
  };
  
  return states[state];
};

const InputContainer = styled.div<{ fullWidth: boolean }>`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[1]};
  
  ${({ fullWidth }) => fullWidth && css`
    width: 100%;
  `}
`;

const Label = styled.label`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.text.primary};
  line-height: ${({ theme }) => theme.typography.lineHeight.tight};
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const StyledInput = styled.input<{
  size: InputSize;
  state: InputState;
  hasLeftIcon: boolean;
  hasRightIcon: boolean;
}>`
  width: 100%;
  border: 1px solid;
  background-color: ${({ theme }) => theme.colors.background.primary};
  color: ${({ theme }) => theme.colors.text.primary};
  font-family: ${({ theme }) => theme.typography.fontFamily.sans.join(', ')};
  font-weight: ${({ theme }) => theme.typography.fontWeight.normal};
  transition: all ${({ theme }) => theme.transition.duration.normal} ${({ theme }) => theme.transition.timing.ease};
  
  ${({ size }) => getSizeStyles(size)}
  ${({ state }) => getStateStyles(state)}
  
  ${({ hasLeftIcon, size, theme }) => hasLeftIcon && css`
    padding-left: ${size === 'lg' ? theme.spacing[12] : size === 'sm' ? theme.spacing[8] : theme.spacing[10]};
  `}
  
  ${({ hasRightIcon, size, theme }) => hasRightIcon && css`
    padding-right: ${size === 'lg' ? theme.spacing[12] : size === 'sm' ? theme.spacing[8] : theme.spacing[10]};
  `}
  
  &::placeholder {
    color: ${({ theme }) => theme.colors.text.tertiary};
  }
  
  &:disabled {
    background-color: ${({ theme }) => theme.colors.secondary[50]};
    color: ${({ theme }) => theme.colors.text.disabled};
    border-color: ${({ theme }) => theme.colors.border.light};
    cursor: not-allowed;
    
    &::placeholder {
      color: ${({ theme }) => theme.colors.text.disabled};
    }
  }
  
  &:focus {
    outline: none;
  }
`;

const StyledTextarea = styled.textarea<{
  size: InputSize;
  state: InputState;
  hasLeftIcon: boolean;
  hasRightIcon: boolean;
}>`
  width: 100%;
  min-height: 100px;
  border: 1px solid;
  background-color: ${({ theme }) => theme.colors.background.primary};
  color: ${({ theme }) => theme.colors.text.primary};
  font-family: ${({ theme }) => theme.typography.fontFamily.sans.join(', ')};
  font-weight: ${({ theme }) => theme.typography.fontWeight.normal};
  transition: all ${({ theme }) => theme.transition.duration.normal} ${({ theme }) => theme.transition.timing.ease};
  resize: vertical;
  
  ${({ size }) => getSizeStyles(size)}
  ${({ state }) => getStateStyles(state)}
  
  ${({ hasLeftIcon, size, theme }) => hasLeftIcon && css`
    padding-left: ${size === 'lg' ? theme.spacing[12] : size === 'sm' ? theme.spacing[8] : theme.spacing[10]};
  `}
  
  ${({ hasRightIcon, size, theme }) => hasRightIcon && css`
    padding-right: ${size === 'lg' ? theme.spacing[12] : size === 'sm' ? theme.spacing[8] : theme.spacing[10]};
  `}
  
  &::placeholder {
    color: ${({ theme }) => theme.colors.text.tertiary};
  }
  
  &:disabled {
    background-color: ${({ theme }) => theme.colors.secondary[50]};
    color: ${({ theme }) => theme.colors.text.disabled};
    border-color: ${({ theme }) => theme.colors.border.light};
    cursor: not-allowed;
    
    &::placeholder {
      color: ${({ theme }) => theme.colors.text.disabled};
    }
  }
  
  &:focus {
    outline: none;
  }
`;

const IconWrapper = styled.div<{ position: 'left' | 'right' }>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.text.tertiary};
  pointer-events: none;
  z-index: 1;
  
  ${({ position, theme }) => position === 'left' ? css`
    left: ${theme.spacing[3]};
  ` : css`
    right: ${theme.spacing[3]};
  `}
`;

const HelperText = styled.p<{ state: InputState }>`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  line-height: ${({ theme }) => theme.typography.lineHeight.tight};
  margin: 0;
  
  ${({ state, theme }) => {
    if (state === 'error') {
      return css`color: ${theme.colors.error[600]};`;
    }
    if (state === 'success') {
      return css`color: ${theme.colors.success[600]};`;
    }
    return css`color: ${theme.colors.text.tertiary};`;
  }}
`;

export default Input;