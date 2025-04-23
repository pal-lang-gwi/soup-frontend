const SearchInput = ({ value, onChange }: { value: string; onChange: (v: string)=>void }) => (
    <input
        type="text"
        placeholder="키워드 검색"
        value={value}
        onChange={e => onChange(e.target.value)}
        />
    );
export default SearchInput;