import { h } from "preact";
import style from "./style";
import SnippetForm from "../../components/snippetform";

const Home = () => (
  <div class={style.home}>
    <h1>Home</h1>
    <SnippetForm />
  </div>
);

export default Home;
