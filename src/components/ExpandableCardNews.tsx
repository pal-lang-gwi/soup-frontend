import { useState } from "react";
import styled from "styled-components";
import { extractDateFromISO } from "../utils/dateUtils";
import { NewsDto } from "../api/news";

const ExpandableNewsCard = ({ data }: { data: NewsDto }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Card>
      <Headline onClick={() => setIsOpen((prev) => !prev)}>
        <strong>{`${data.keyword}의 새로운 소식 - ${extractDateFromISO(data.createdDate)}`}</strong>
        <span>{isOpen ? "▲" : "▼"}</span>
      </Headline>

      {isOpen && (
        <div>
          <p>{data.longSummary}</p>
          <ul>
            {data.articles.map((a, i) => (
                <ArticleItem key={i}>
                <ArticleLink
                    href={a.url}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                >
                    {a.title}
                </ArticleLink>
                </ArticleItem>
            ))}
          </ul>
        </div>
      )}
    </Card>
  );
};

export default ExpandableNewsCard;

const Card = styled.div`
  padding: 1rem;
  border: 1px solid #eee;
  border-radius: 8px;
  background: #fff;
`;

const Headline = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  font-size: 1.05rem;
  margin-bottom: 0.5rem;

  &:hover {
    text-decoration: underline;
  }

  span {
    font-size: 0.9rem;
    color: #888;
    margin-left: 0.5rem;
  }
`;

const ArticleItem = styled.li`
  margin-bottom: 0.5rem;
  text-align: left;
`;

const ArticleLink = styled.a`
  color: #0077cc;
  text-decoration: none;
  font-size: 0.95rem;

  &:hover {
    text-decoration: underline;
  }
`;
