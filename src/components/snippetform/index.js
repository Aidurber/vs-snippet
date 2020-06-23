import { h } from "preact";
import { useState, useMemo, useCallback, useEffect } from "preact/hooks";
import style from "./style.css";
import useSessionStorage from "../../hooks/use-session-storage";

const buildVsCodeSnippet = ({ title, code, prefix, description }) => {
  return {
    [title]: {
      prefix,
      description,
      body: code.split("\n"),
    },
  };
};

const SnippetForm = () => {
  const [storedValue, setStoredValue] = useSessionStorage("temp-snippet", {
    title: "",
    prefix: "",
    description: "",
    code: "",
  });
  const [title, setTitle] = useState(storedValue.title);
  const [prefix, setPrefix] = useState(storedValue.prefix);
  const [description, setDescription] = useState(storedValue.description);
  const [code, setCode] = useState(storedValue.code);

  const output = useMemo(() => {
    return buildVsCodeSnippet({ title, prefix, code, description });
  }, [title, prefix, description, code]);

  useEffect(() => {
    setStoredValue({ title, prefix, description, code });
  }, [title, prefix, description, code]);

  const handleCopy = useCallback(() => {
    const content = document.getElementById("output");
    content.select();
    content.setSelectionRange(0, 99999); /*For mobile devices*/
    document.execCommand("copy");
    content.setSelectionRange(0, 0);
    alert("copied");
  }, []);
  return (
    <div>
      <div class={style.formControl}>
        <label for="title" class={style.formLabel}>
          Snippet name
        </label>
        <input
          id="title"
          name="title"
          type="text"
          class={style.formInput}
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
      </div>
      <div class={style.formControl}>
        <label for="prefix" class={style.formLabel}>
          Prefix
        </label>
        <input
          id="prefix"
          name="prefix"
          type="text"
          class={style.formInput}
          onChange={(e) => setPrefix(e.target.value)}
          value={prefix}
        />
      </div>
      <div class={style.formControl}>
        <label for="description" class={style.formLabel}>
          Description
        </label>
        <textarea
          id="description"
          name="description"
          class={style.formInput}
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        />
      </div>
      <div class={style.formControl}>
        <label for="code" class={style.formLabel}>
          Code
        </label>
        <textarea
          id="code"
          name="code"
          class={style.formInput}
          onChange={(e) => setCode(e.target.value)}
          value={code}
        />
      </div>

      <div class={style.formControl}>
        <label for="output">Snippet</label>
        <textarea id="output" rows="10" class={style.formInput}>
          {JSON.stringify(output, null, 2)}
        </textarea>
        <button type="button" onClick={handleCopy}>
          Copy to clipboard
        </button>
      </div>
    </div>
  );
};

export default SnippetForm;
