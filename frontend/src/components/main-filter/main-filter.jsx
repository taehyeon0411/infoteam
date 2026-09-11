import "./main-filter.css";

export default function Mfilter({ selected, setSelected }) {
  return (
    <div className="main-filter">
      <button
        type="button"
        className={selected === "all" ? "filter active" : "filter"}
        onClick={() => setSelected("all")}
      >
        전체
      </button>

      <button
        type="button"
        className={selected === "found" ? "filter active" : "filter"}
        onClick={() => setSelected("found")}
      >
        습득물
      </button>

      <button
        type="button"
        className={selected === "lost" ? "filter active" : "filter"}
        onClick={() => setSelected("lost")}
      >
        분실물
      </button>
    </div>
  );
}
