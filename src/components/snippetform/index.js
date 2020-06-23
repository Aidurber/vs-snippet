import { h } from "preact";
import { useMemo, useCallback, useEffect } from "preact/hooks";
import style from "./style.css";

const SnippetForm = ({ value, onChange }) => {
  const hasValues = useMemo(() => {
    return Object.values(value)
      .map((v) => v.trim())
      .filter((v) => v.length > 0)
      .some(Boolean);
  }, [value]);

  const handleInputChange = (name) => (e) => {
    onChange({
      ...value,
      [name]: e.target.value,
    });
  };

  const handleBeforeUnload = useCallback(
    (e) => {
      if (hasValues) {
        e.returnValue = "Your changes will be lost.";
      }
    },
    [hasValues]
  );
  useEffect(() => {
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [handleBeforeUnload]);

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
          onInput={handleInputChange("title")}
          value={value.title}
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
          onInput={handleInputChange("prefix")}
          value={value.prefix}
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
          onInput={handleInputChange("description")}
          value={value.description}
        />
      </div>
      <div class={style.formControl}>
        <label for="code" class={style.formLabel}>
          Code
        </label>
        <textarea
          id="code"
          rows="20"
          name="code"
          class={style.formInput}
          onInput={handleInputChange("code")}
          value={value.code}
        />
      </div>
    </div>
  );
};

export default SnippetForm;
