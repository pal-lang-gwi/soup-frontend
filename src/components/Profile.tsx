import React, { useState } from 'react';
import styled from 'styled-components';

const Profile: React.FC = () => {
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [gender, setGender] = useState('');
  const [birthYear, setBirthYear] = useState('');
  const [birthMonth, setBirthMonth] = useState('');
  const [birthDay, setBirthDay] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const birthDate = `${birthYear}-${birthMonth}-${birthDay}`;
    // TODO: API 요청
    
    alert('수정이 완료되었습니다🎉');
  };

  const handleNicknameCheck = () => {
  const trimNickname = nickname.trim();
  if (!trimNickname) {
    alert("닉네임을 입력해주세요🥲");
    return;
  }

  // TODO: 닉네임 중복 체크 API 요청
  console.log(nickname);
  };

  return (
    <Container>
      <Title>회원정보 수정</Title>
      <form onSubmit={handleSubmit}>
        <ContentWrapper>
        <Field>
        <Label>이메일</Label>
        <Input type="email" value={email} readOnly disabled />
        </Field>

        <Field>
        <Label>닉네임</Label>
        <NicknameWrapper>
        {/* //TODO: 닉네임 기존거 불러오기 */}
        <Input type="text" placeholder="닉네임" value={nickname} onChange={(e) => setNickname(e.target.value)} />
        <NicknameCheckButton type="button" onClick={handleNicknameCheck}>
            중복 확인
        </NicknameCheckButton>
        </NicknameWrapper>
        </Field>

        <Field>
        <Label>성별</Label>
        <GenderWrapper>
          <label>
            <Radio
              type="radio"
              name="gender"
              value="MALE"
              checked={gender === 'MALE'}
              onChange={(e) => setGender(e.target.value)}
            />
            남자
          </label>
          <label>
            <Radio
              type="radio"
              name="gender"
              value="FEMALE"
              checked={gender === 'FEMALE'}
              onChange={(e) => setGender(e.target.value)}
            />
            여자
          </label>
        </GenderWrapper>
        </Field>

        <Field>
        <Label>생년월일</Label>
        <BirthWrapper>
          <Select value={birthYear} onChange={(e) => setBirthYear(e.target.value)}>
            <option value="">년</option>
            {Array.from({ length: 106 }, (_, i) => 2025 - i).map((year) => (
              <option key={year} value={year}>{year}</option>
            ))}
          </Select>
          <Select value={birthMonth} onChange={(e) => setBirthMonth(e.target.value)}>
            <option value="">월</option>
            {Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0')).map((month) => (
              <option key={month} value={month}>{month}</option>
            ))}
          </Select>
          <Select value={birthDay} onChange={(e) => setBirthDay(e.target.value)}>
            <option value="">일</option>
            {Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, '0')).map((day) => (
              <option key={day} value={day}>{day}</option>
            ))}
          </Select>
        </BirthWrapper>
        </Field>
        </ContentWrapper>

        <SubmitButton type="submit">수정하기</SubmitButton>
      </form>
      
    </Container>
  );
};

export default Profile;

const Container = styled.div`
  width: 100%;
`;

const ContentWrapper =styled.div`
  display: flex;
  flex-direction: column;
`

const Title = styled.h3`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 24px;
  text-align: center;
`

const Field = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  gap: 16px;
`;

const Label = styled.label`
  width: 100px;
  font-weight: 600;
  text-align: left;
  margin-right: 20%;
`;

const Input = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.mainGreen};
  border-radius: 4px;
`;

const NicknameWrapper = styled.div`
  flex: 1;
  display: flex;
  gap: 12px;
  align-items: center;
`
const NicknameCheckButton = styled.button`
  padding: 10px 16px;
  background-color: ${({ theme }) => theme.mainGreen};
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  white-space: nowrap;
`;

const Select = styled.select`
  flex: 1;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.mainGreen};
`;

const BirthWrapper = styled.div`
  flex: 1;
  display: flex;
  gap: 12px;
`;

const GenderWrapper = styled.div`
  flex: 1;
  display: flex;
  gap: 24px;

  label {
    display: flex;
    align-items: center;
    gap: 6px;
    font-weight: 500;
  }
`;

const Radio = styled.input`
  transform: scale(1.2);

`;

const SubmitButton = styled.button`
  margin-top: 30px;
  padding: 12px 20px;
  background-color: ${({ theme }) => theme.mainGreen};
  color: black;
  border: none;
  border-radius: 20px;
  cursor: pointer;
`;
