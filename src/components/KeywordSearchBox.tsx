// src/components/KeywordSearchBox.tsx
import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { api } from "../api/axiosInstance";

/* ── debounce hook ───────────────────── */
function useDebounce<T>(value: T, delay = 300) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return debounced;
}

/* ── 메인 컴포넌트 ─────────────────────── */
export default function KeywordSearchBox() {
  const [input, setInput] = useState("");
  const debounced = useDebounce(input, 300);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const qc = useQueryClient();

  /* 1) 키워드 검색 */
  const { data, isFetching } = useQuery({
    queryKey: ["keywords", debounced],
    queryFn: () =>
      api
        .get("/api/v1/keywords/search", { params: { keyword: debounced } })
        .then((r) => r.data), // { keywords: [...], total: ... } 형태라고 가정
    enabled: !!debounced,
    staleTime: 5 * 60 * 1000,
  });

  /* 2) 키워드 등록 요청 */
  const requestMutation = useMutation({
    mutationFn: () => axios.post("/api/v1/keywords/request", { name: debounced }),
    onSuccess: () => {
      alert(`"${debounced}" 키워드 요청이 등록되었습니다.`);
      qc.invalidateQueries({ queryKey: ["keywords"] }); // ← filters 객체
    },
  });

  /* 3) 외부 클릭 시 드롭다운 닫기 */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!dropdownRef.current?.contains(e.target as Node)) {
        qc.removeQueries({ queryKey: ["keywords", debounced], exact: true });
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [debounced, qc]);

  const keywords: { id: number; name: string }[] = data?.keywords || [];
  const showRegister = debounced && keywords.length === 0 && !isFetching;

  return (
    <BoxWrapper>
      <StyledInput
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="키워드를 입력하세요…"
      />
      {isFetching && <Loading>⏳</Loading>}

      {/* 드롭다운 */}
      {(keywords.length > 0 || showRegister) && (
        <DropDown ref={dropdownRef}>
          {keywords.map((k) => (
            <Item key={k.id} onClick={() => setInput(k.name)}>
              {k.name}
            </Item>
          ))}

          {showRegister && (
            <>
              <NoResult>일치하는 키워드가 없습니다.</NoResult>
              <Divider />
              <RegisterRow onClick={() => requestMutation.mutate()}>
                ❓ <span>{`"${debounced}"`}(으)로 직접 등록하기</span>
              </RegisterRow>
            </>
          )}
        </DropDown>
      )}
    </BoxWrapper>
  );
}

/* ── styled-components ───────────────── */
const BoxWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const StyledInput = styled.input`
  width: 100%;
  border: none;
  outline: none;
  font-size: 16px;
  padding: 10px 40px; /* 돋보기·왼쪽 여백 고려 */
  background: transparent;
`;

const Loading = styled.span`
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 14px;
`;

const DropDown = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background: #fff;
  border: 1px solid #eee;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  margin-top: 6px;
  z-index: 10;
  max-height: 320px;
  overflow-y: auto;
`;

const Item = styled.div`
  padding: 12px 16px;
  cursor: pointer;
  &:hover {
    background: rgba(66, 133, 244, 0.08);
  }
`;

const NoResult = styled.div`
  padding: 16px;
  color: #777;
  font-size: 0.9rem;
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid #eee;
  margin: 4px 0;
`;

const RegisterRow = styled.div`
  padding: 14px 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  &:hover {
    background: rgba(66, 133, 244, 0.08);
  }
`;
