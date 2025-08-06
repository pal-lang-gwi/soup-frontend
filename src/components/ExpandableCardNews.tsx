import { extractDateFromISO } from "../utils/dateUtils";
import { NewsDto } from "../api/news";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import styled from "styled-components";

const ExpandableNewsCard = ({ data }: { data: NewsDto }) => {
  return (
    <StyledAccordion type="single" collapsible>
      <AccordionItem value="news-content">
        <AccordionTrigger>
          <NewsHeader>
            <NewsTitle>
              {data.keyword}의 새로운 소식
            </NewsTitle>
            <NewsDate>
              {extractDateFromISO(data.createdDate)}
            </NewsDate>
          </NewsHeader>
        </AccordionTrigger>
        <AccordionContent>
          <NewsContent>
            <NewsSummary>
              {data.longSummary}
            </NewsSummary>
            <ArticleList>
              <ArticleListTitle>관련 기사</ArticleListTitle>
              {data.articles.map((article, index) => (
                <ArticleItem key={index}>
                  <ArticleLink
                    href={article.url}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {article.title}
                  </ArticleLink>
                </ArticleItem>
              ))}
            </ArticleList>
          </NewsContent>
        </AccordionContent>
      </AccordionItem>
    </StyledAccordion>
  );
};

export default ExpandableNewsCard;

const StyledAccordion = styled(Accordion)`
  width: 100%;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid #e2e8f0;
  overflow: hidden;
  transition: all 0.2s ease;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    transform: translateY(-1px);
  }
`;

const NewsHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
  width: 100%;
`;

const NewsTitle = styled.span`
  font-size: 1.1rem;
  font-weight: 600;
  color: #2d3748;
  line-height: 1.4;
`;

const NewsDate = styled.span`
  font-size: 0.9rem;
  color: #718096;
  font-weight: 500;
`;

const NewsContent = styled.div`
  padding: 1rem 0;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const NewsSummary = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: #4a5568;
  background: #f7fafc;
  padding: 1rem;
  border-radius: 8px;
  border-left: 4px solid #48bb78;
  margin: 0;
`;

const ArticleList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const ArticleListTitle = styled.h4`
  font-size: 1rem;
  font-weight: 600;
  color: #2d3748;
  margin: 0 0 0.5rem 0;
`;

const ArticleItem = styled.div`
  padding: 0.75rem;
  background: #f8f9fa;
  border-radius: 6px;
  border: 1px solid #e9ecef;
  transition: all 0.2s ease;

  &:hover {
    background: #e9ecef;
    transform: translateX(4px);
  }
`;

const ArticleLink = styled.a`
  color: #3182ce;
  text-decoration: none;
  font-size: 0.95rem;
  font-weight: 500;
  line-height: 1.4;
  display: block;

  &:hover {
    color: #2c5aa0;
    text-decoration: underline;
  }
`;
