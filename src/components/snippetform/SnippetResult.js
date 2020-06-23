import { h } from "preact";
import style from "./style.css";
import { useMemo, useCallback } from "preact/hooks";

const buildVsCodeSnippet = ({ title, code, prefix, description }) => {
  return {
    [title]: {
      prefix,
      description,
      body: (code || "").split("\n"),
    },
  };
};

export default function SnippetResult({ value }) {
  const output = useMemo(() => {
    return buildVsCodeSnippet({ ...value });
  }, [value]);
  const handleCopy = useCallback(() => {
    const content = document.getElementById("output");
    content.select();
    content.setSelectionRange(0, 99999); /*For mobile devices*/
    document.execCommand("copy");
    content.setSelectionRange(0, 0);
    alert("copied");
  }, []);
  return (
    <div class={style.formControl}>
      <label for="output">Snippet</label>
      <textarea id="output" rows="10" class={style.formInput}>
        {JSON.stringify(output, null, 2)}
      </textarea>
      <button type="button" onClick={handleCopy} class={style.btn}>
        Copy to clipboard
      </button>
    </div>
  );
}
