import React from 'react';
import styled, { css } from 'styled-components';

interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'elevated' | 'outlined';
  padding?: 'sm' | 'md' | 'lg';
  hoverable?: boolean;
  className?: string;
}

const Card: React.FC<CardProps> = ({ 
  children, 
  variant = 'default', 
  padding = 'md', 
  hoverable = false,
  className 
}) => {
  return (
    <StyledCard 
      variant={variant} 
      padding={padding} 
      hoverable={hoverable}
      className={className}
    >
      {children}
    </StyledCard>
  );
};

// Variant styles
const getVariantStyles = (variant: CardProps['variant']) => {
  const variants = {
    default: css`
      background-color: ${({ theme }) => theme.colors.background.primary};
      border: 1px solid ${({ theme }) => theme.colors.border.light};
      box-shadow: ${({ theme }) => theme.boxShadow.sm};
    `,
    
    elevated: css`
      background-color: ${({ theme }) => theme.colors.background.elevated};
      border: 1px solid ${({ theme }) => theme.colors.border.light};
      box-shadow: ${({ theme }) => theme.boxShadow.md};
    `,
    
    outlined: css`
      background-color: ${({ theme }) => theme.colors.background.primary};
      border: 1px solid ${({ theme }) => theme.colors.border.default};
      box-shadow: none;
    `,
  };
  
  return variants[variant || 'default'];
};

// Padding styles
const getPaddingStyles = (padding: CardProps['padding']) => {
  const paddings = {
    sm: css`
      padding: ${({ theme }) => theme.components.card.padding.sm};
    `,
    md: css`
      padding: ${({ theme }) => theme.components.card.padding.md};
    `,
    lg: css`
      padding: ${({ theme }) => theme.components.card.padding.lg};
    `,
  };
  
  return paddings[padding || 'md'];
};

const StyledCard = styled.div<{
  variant: CardProps['variant'];
  padding: CardProps['padding'];
  hoverable: boolean;
}>`
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  transition: all ${({ theme }) => theme.transition.duration.normal} ${({ theme }) => theme.transition.timing.ease};
  
  ${({ variant }) => getVariantStyles(variant)}
  ${({ padding }) => getPaddingStyles(padding)}
  
  ${({ hoverable }) => hoverable && css`
    cursor: pointer;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: ${({ theme }) => theme.boxShadow.lg};
      border-color: ${({ theme }) => theme.colors.primary[200]};
    }
    
    &:active {
      transform: translateY(0);
      box-shadow: ${({ theme }) => theme.boxShadow.md};
    }
  `}
`;

// Card sub-components
export const CardHeader = styled.div`
  padding-bottom: ${({ theme }) => theme.spacing[4]};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.light};
  margin-bottom: ${({ theme }) => theme.spacing[4]};
`;

export const CardBody = styled.div`
  /* Card body styles can be added here if needed */
`;

export const CardFooter = styled.div`
  padding-top: ${({ theme }) => theme.spacing[4]};
  border-top: 1px solid ${({ theme }) => theme.colors.border.light};
  margin-top: ${({ theme }) => theme.spacing[4]};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
`;

export const CardTitle = styled.h3`
  font-family: ${({ theme }) => theme.typography.fontFamily.display.join(', ')};
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  line-height: ${({ theme }) => theme.typography.lineHeight.tight};
  margin: 0;
`;

export const CardDescription = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
  margin: ${({ theme }) => theme.spacing[2]} 0 0 0;
`;

export default Card;