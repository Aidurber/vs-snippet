import { h } from "preact";
import style from "./style";
import SnippetForm from "../../components/snippetform";
import { useState } from "preact/hooks";
import SnippetResult from "../../components/snippetform/SnippetResult";

const Home = () => {
  const [value, setValue] = useState({
    title: "",
    prefix: "",
    description: "",
    code: "",
  });

  return (
    <div class={style.home}>
      <div class={style.row}>
        <div class={style.col}>
          <SnippetForm value={value} onChange={setValue} />
        </div>
        <div class={style.col}>
          <SnippetResult value={value} />
        </div>
      </div>
    </div>
  );
};

export default Home;
