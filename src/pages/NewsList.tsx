import { useEffect, useState } from "react";
import styled from "styled-components";
import { getNewsList } from "../api/news";
import FilterInput from "../components/FilterInput";
import Navbar from "../components/Navbar";
import { NewsDtos } from "../types/news";

function NewsList(){
    //뉴스 조회 시에 필요한 데이터
    //키워드, 조회 시작일자, 종료일자, 페이지
    const [keyword, setKeyword] = useState('');
    //TODO: 나중에 초기값 넣어주기 -> 조회하는 오늘 날짜로 해도 될듯?
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [page, setPage] = useState(0);

    //가져올 것
    //뉴스 데이터, 현재페이지/총페이지
    const [data, setData] = useState<NewsDtos[]>([]);
    const [totalPage, setTotalPage] = useState(0);

    const getData = async () =>{
        console.log(keyword);
        try{
            const res = await getNewsList({keyword, startDate, endDate, page});
            setData(res.data.data.newsDtos)
            setTotalPage(res.data.data.totalPages);

        }catch(error){
            console.log("뉴스 리스트 조회 에러 :", error);
        }
    };
    useEffect(() => {
        getData();
    }, [page, keyword]);

    //다음페이지 이전페이지
    const handlePrev = () => {
        if (page > 0)
            setPage(page - 1);
        else
            alert("첫번째 페이지에요!😉");
    }
    const handleNext = () => {
        if (page + 1 < totalPage)
            setPage(page + 1);
        else
            alert("마지막 페이지에요!🥲");
    }


    return(
        <>
        <Navbar />
        <Background>
        <GradientOverlay />
        <ContentWrapper>
        여기에 메일 조회
        <FilterSection>
        {/* //TODO: 키워드로 검색 */}
        <KeywordInput>
            <FilterInput onSearch={(value) => {setKeyword(value); setPage(0);}}/>
        </KeywordInput>

        {/* //TODO: 날짜별 조회 */}
        </FilterSection>
        {/* //TODO: 페이지 조회 */}

        
        </ContentWrapper>
        </Background>
        </>
    );
}

export default NewsList;

const Background = styled.div`
    position: relative;
    background-color: white;
    height: 100vh;
    overflow: hidden;
`;

const GradientOverlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 40vh;
    background: linear-gradient(
        to bottom,
        ${({ theme }) => theme.mainColor} 0%,
        #ffffff 100%
    );
    z-index: 0;
`;

const ContentWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 20vh;
    position: relative;
    z-index: 1;
`;

const KeywordInput = styled.div`

`

const FilterSection = styled.div`

`