import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { axiosUser } from '../api/auth/userApi';
import { User } from '../types/auth';

const LookUpProfile: React.FC = () => {
    //! 더미데이터 지우기
    const dummyKeyword = [
    { keyword: '롤', status: '검토중' },
    { keyword: '오버워치', status: '승인' },
    { keyword: '하스스톤', status: '거절' },
    ];
    const dummyNews = [
        { title: '개그는 유재광 개발은 유재석!', url: 'naver.com' },
        { title: '저 도마뱀 밥주러 가야하는데요?', url: 'google.com' },
        { title: '협업에 No!를 외치는 개발자', url: 'chatgpt.com/' },
    ];

    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        axiosUser().then(setUser).catch(console.error);
    }, []);

    const joinedDate = dayjs('2025-12-26'); // TODO: 백엔드에서 가입일 받아오면 교체
    const today = dayjs();
    const daysTogether = -today.diff(joinedDate, 'day');

    return (
    <Container>
    <Title>
        <Highlight>{user?.nickname || '개그는유재광'}</Highlight>님과 함께한 지 {daysTogether}일이 되었어요💌
    </Title>

    <CardRow>
        <InfoCard>
            <CardTitle>📌나의 키워드</CardTitle>
            <CardContent>이것, 저것, 요것</CardContent>
        </InfoCard>
        <InfoCard>
            <CardTitle>📰최근 메일</CardTitle>
            <CardContent>AI가 세계를 지배했지만, 유재광은 지배할 수 없었다</CardContent>
        </InfoCard>
        <InfoCard>
            <CardTitle>🔖키워드 신청 내역</CardTitle>
            <CardContent>
                {dummyKeyword.map((item, index) => (
                    <KeywordItem key={index}>
                    <span>{item.keyword}</span>
                    <StatusBadge status={item.status}>{item.status}</StatusBadge>
                    </KeywordItem>
                ))}
            </CardContent>
        </InfoCard>
        </CardRow>
        <CardRow>
        <FullWidthCard>
        <CardTitle>❤️ 좋아요 누른 기사</CardTitle>
        <CardContent>
            {dummyNews.map((news, index) => (
                <NewsItem key={index} href={`https://${news.url}`} target="_blank" rel="noopener noreferrer">
                {news.title}
                </NewsItem>
            ))}
        </CardContent>
        </FullWidthCard>
        </CardRow>
    </Container>
);
};

export default LookUpProfile;

const Container = styled.div`
    width: 100%;
    padding: 40px;
    box-sizing: border-box;
`;

const Title = styled.h3`
    font-size: 27px;
    margin-bottom: 50px;
`;

const Highlight = styled.span`
    font-weight: bold;
    background: linear-gradient(
        270deg,
        #ff6ec4,
        #7873f5,
        #4ade80,
        #facc15,
        #f87171,
        #ff6ec4
        );
    background-size: 1200% 1200%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: rainbowText 6s ease infinite;
    
    @keyframes rainbowText {
        0% {
        background-position: 0% 50%;
        }
        50% {
        background-position: 100% 50%;
        }
        100% {
        background-position: 0% 50%;
        }
    }
`;
const CardRow = styled.div`
    display: flex;
    gap: 24px;
    margin-bottom: 24px;

    @media (max-width: 768px) {
        flex-direction: column;
    }
`;

const InfoCard = styled.div`
    flex: 1;
    background-color: #f5f7fa;
    border-radius: 12px;
    padding: 24px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
`;

const FullWidthCard = styled(InfoCard)`
    width: 100%;
`;

const CardTitle = styled.h4`
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 8px;
    text-align: left;
`;

const CardContent = styled.p`
    font-size: 14px;
    text-align: left;
    color: #555;
`;

const KeywordItem = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
`;

const StatusBadge = styled.span<{ status: string }>`
    padding: 4px 10px;
    border-radius: 12px;
    font-size: 12px;
    font-weight: bold;
    color: white;

    background-color: ${({ status }) =>
        status === '검토중'
        ?'#fdda6e'
        : status === '승인'
        ? '#C2D869'
        : '#f87171'}; // 빨강 (거절)

    text-align: center;
`;

const NewsItem = styled.a`
    display: block;
    margin-bottom: 10px;
    font-size: 14px;
    color: #333;
    text-decoration: none;
    transition: all 0.2s;

    &:hover {
        text-decoration: underline;
        color: #000;
    }
`;