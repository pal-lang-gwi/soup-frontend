import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { FiMenu, FiX, FiHome, FiFileText as FiNewspaper, FiUser, FiSettings } from 'react-icons/fi';
import { useAuth } from '../../features/auth';
import Button from './Button';

interface NavigationProps {
  className?: string;
}

const Navigation: React.FC<NavigationProps> = ({ className }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated, userInfo, logout } = useAuth();
  const location = useLocation();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    closeMobileMenu();
  };

  const isActivePath = (path: string) => location.pathname === path;

  return (
    <NavigationContainer className={className}>
      <Nav>
        <Container>
          {/* Brand */}
          <BrandSection>
            <BrandLink to="/">
              <BrandText>SOUP</BrandText>
              <BrandSubtext>뉴스 큐레이션</BrandSubtext>
            </BrandLink>
          </BrandSection>

          {/* Desktop Navigation */}
          {isAuthenticated && (
            <DesktopNavItems>
              <NavLink to="/home" active={isActivePath('/home')}>
                <FiHome size={18} />
                <span>홈</span>
              </NavLink>
              <NavLink to="/news" active={isActivePath('/news')}>
                <FiNewspaper size={18} />
                <span>뉴스</span>
              </NavLink>
              <NavLink to="/mypage" active={isActivePath('/mypage')}>
                <FiUser size={18} />
                <span>마이페이지</span>
              </NavLink>
              {userInfo?.role === 'ADMIN' && (
                <NavLink to="/admin" active={isActivePath('/admin')}>
                  <FiSettings size={18} />
                  <span>관리자</span>
                </NavLink>
              )}
            </DesktopNavItems>
          )}

          {/* Desktop User Section */}
          <DesktopUserSection>
            {isAuthenticated ? (
              <UserMenu>
                <UserInfo>
                  <UserAvatar>
                    {userInfo?.profileImageUrl ? (
                      <img src={userInfo.profileImageUrl} alt="Profile" />
                    ) : (
                      <span>{userInfo?.nickname?.charAt(0)?.toUpperCase() || 'U'}</span>
                    )}
                  </UserAvatar>
                  <UserDetails>
                    <UserName>{userInfo?.nickname}</UserName>
                    <UserEmail>{userInfo?.email}</UserEmail>
                  </UserDetails>
                </UserInfo>
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  로그아웃
                </Button>
              </UserMenu>
            ) : (
              <Button variant="primary" size="md" as={Link} to="/">
                시작하기
              </Button>
            )}
          </DesktopUserSection>

          {/* Mobile Menu Toggle */}
          <MobileMenuToggle onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </MobileMenuToggle>
        </Container>
      </Nav>

      {/* Mobile Menu */}
      <MobileMenu isOpen={isMobileMenuOpen}>
        <MobileMenuContent>
          {isAuthenticated && (
            <MobileNavItems>
              <MobileNavLink 
                to="/home" 
                active={isActivePath('/home')}
                onClick={closeMobileMenu}
              >
                <FiHome size={20} />
                <span>홈</span>
              </MobileNavLink>
              <MobileNavLink 
                to="/news" 
                active={isActivePath('/news')}
                onClick={closeMobileMenu}
              >
                <FiNewspaper size={20} />
                <span>뉴스</span>
              </MobileNavLink>
              <MobileNavLink 
                to="/mypage" 
                active={isActivePath('/mypage')}
                onClick={closeMobileMenu}
              >
                <FiUser size={20} />
                <span>마이페이지</span>
              </MobileNavLink>
              {userInfo?.role === 'ADMIN' && (
                <MobileNavLink 
                  to="/admin" 
                  active={isActivePath('/admin')}
                  onClick={closeMobileMenu}
                >
                  <FiSettings size={20} />
                  <span>관리자</span>
                </MobileNavLink>
              )}
            </MobileNavItems>
          )}
          
          <MobileUserSection>
            {isAuthenticated ? (
              <>
                <MobileUserInfo>
                  <UserAvatar>
                    {userInfo?.profileImageUrl ? (
                      <img src={userInfo.profileImageUrl} alt="Profile" />
                    ) : (
                      <span>{userInfo?.nickname?.charAt(0)?.toUpperCase() || 'U'}</span>
                    )}
                  </UserAvatar>
                  <div>
                    <UserName>{userInfo?.nickname}</UserName>
                    <UserEmail>{userInfo?.email}</UserEmail>
                  </div>
                </MobileUserInfo>
                <Button 
                  variant="outline" 
                  size="md" 
                  fullWidth 
                  onClick={handleLogout}
                >
                  로그아웃
                </Button>
              </>
            ) : (
              <Button 
                variant="primary" 
                size="lg" 
                fullWidth 
                as={Link} 
                to="/"
                onClick={closeMobileMenu}
              >
                시작하기
              </Button>
            )}
          </MobileUserSection>
        </MobileMenuContent>
      </MobileMenu>
    </NavigationContainer>
  );
};

const NavigationContainer = styled.header`
  position: sticky;
  top: 0;
  z-index: ${({ theme }) => theme.zIndex.sticky};
  background: rgba(255, 255, 255, 0.95);
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.light};
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
`;

const Nav = styled.nav`
  height: 72px;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    height: 64px;
  }
`;

const Container = styled.div`
  max-width: ${({ theme }) => theme.layout.container.maxWidth};
  margin: 0 auto;
  padding: ${({ theme }) => theme.layout.container.padding};
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const BrandSection = styled.div`
  flex-shrink: 0;
`;

const BrandLink = styled(Link)`
  text-decoration: none;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  transition: transform ${({ theme }) => theme.transition.duration.normal} ${({ theme }) => theme.transition.timing.ease};
  
  &:hover {
    transform: translateY(-1px);
  }
`;

const BrandText = styled.h1`
  font-family: ${({ theme }) => theme.typography.fontFamily.display.join(', ')};
  font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.black};
  color: ${({ theme }) => theme.colors.primary[600]};
  line-height: 1;
  margin: 0;
  letter-spacing: -0.025em;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.typography.fontSize.xl};
  }
`;

const BrandSubtext = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.text.tertiary};
  letter-spacing: 0.05em;
  margin-top: -2px;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.typography.fontSize['2xs']};
  }
`;

const DesktopNavItems = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  background: ${({ theme }) => theme.colors.secondary[50]};
  padding: ${({ theme }) => theme.spacing[1]};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    display: none;
  }
`;

const NavLink = styled(Link)<{ active: boolean }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  padding: ${({ theme }) => theme.spacing[2]} ${({ theme }) => theme.spacing[4]};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  text-decoration: none;
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.text.secondary};
  transition: all ${({ theme }) => theme.transition.duration.normal} ${({ theme }) => theme.transition.timing.ease};
  white-space: nowrap;
  
  ${({ active, theme }) => active && css`
    background-color: ${theme.colors.background.elevated};
    color: ${theme.colors.primary[600]};
    box-shadow: ${theme.boxShadow.sm};
  `}
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.background.elevated};
    color: ${({ theme }) => theme.colors.text.primary};
    transform: translateY(-1px);
    box-shadow: ${({ theme }) => theme.boxShadow.sm};
  }
`;

const DesktopUserSection = styled.div`
  display: flex;
  align-items: center;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    display: none;
  }
`;

const UserMenu = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[3]};
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[3]};
  padding: ${({ theme }) => theme.spacing[2]};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  background: ${({ theme }) => theme.colors.secondary[50]};
`;

const UserAvatar = styled.div`
  width: 36px;
  height: 36px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background: linear-gradient(135deg, 
    ${({ theme }) => theme.colors.primary[500]}, 
    ${({ theme }) => theme.colors.primary[600]}
  );
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.boxShadow.sm};
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  span {
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
    color: white;
  }
`;

const UserDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const UserName = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.text.primary};
  line-height: ${({ theme }) => theme.typography.lineHeight.tight};
`;

const UserEmail = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.text.tertiary};
  line-height: ${({ theme }) => theme.typography.lineHeight.tight};
`;

const MobileMenuToggle = styled.button`
  display: none;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text.secondary};
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing[2]};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  transition: all ${({ theme }) => theme.transition.duration.normal} ${({ theme }) => theme.transition.timing.ease};
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary[100]};
    color: ${({ theme }) => theme.colors.text.primary};
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    display: flex;
  }
`;

const MobileMenu = styled.div<{ isOpen: boolean }>`
  display: none;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    display: block;
    position: fixed;
    top: ${({ theme }) => theme.layout.header.height};
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${({ theme }) => theme.colors.background.elevated};
    backdrop-filter: blur(8px);
    transform: translateX(${({ isOpen }) => isOpen ? '0' : '100%'});
    transition: transform ${({ theme }) => theme.transition.duration.slow} ${({ theme }) => theme.transition.timing.ease};
    border-top: 1px solid ${({ theme }) => theme.colors.border.light};
  }
`;

const MobileMenuContent = styled.div`
  padding: ${({ theme }) => theme.spacing[6]} ${({ theme }) => theme.spacing[4]};
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const MobileNavItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[2]};
`;

const MobileNavLink = styled(Link)<{ active: boolean }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[3]};
  padding: ${({ theme }) => theme.spacing[4]};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  text-decoration: none;
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.text.secondary};
  transition: all ${({ theme }) => theme.transition.duration.normal} ${({ theme }) => theme.transition.timing.ease};
  
  ${({ active, theme }) => active && css`
    background-color: ${theme.colors.primary[50]};
    color: ${theme.colors.primary[600]};
  `}
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary[100]};
    color: ${({ theme }) => theme.colors.text.primary};
  }
`;

const MobileUserSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[4]};
  padding-top: ${({ theme }) => theme.spacing[6]};
  border-top: 1px solid ${({ theme }) => theme.colors.border.light};
`;

const MobileUserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[3]};
`;

export default Navigation;