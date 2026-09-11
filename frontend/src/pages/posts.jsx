import { useState } from "react";
import Mfilter from "../components/main-filter/main-filter";
import Search from "../components/search/search";
import Sfilter from "../components/sub-filter/sub-filter";
import Post from "../components/post/Post";

export default function Posts() {
  //습득, 분실
  const [selected, setSelected] = useState("all");
  //검색
  const [keyword, setKeyword] = useState("");
  //카테고리
  const [category, setCategory] = useState("all");
  //ㄴ장소
  const [location, setLocation] = useState("all");

  return (
    <div>
      <Mfilter
        selected={selected}
        setSelected={setSelected}
      />
      <Search setKeyword={setKeyword} />
      <Sfilter
        category={category}
        setCategory={setCategory}
        location={location}
        setLocation={setLocation}
      />
      <Post
        selected={selected}
        keyword={keyword}
        category={category}
        location={location}
      />
    </div>
  );
}
