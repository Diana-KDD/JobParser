import { use } from "react";
import style from "./Select.module.css";

export default function Select({
  promise,
  whatToChoose,
  nameValue,
  nameDisplay,
}) {
  const list = use(promise);
  return (
    <select className={style.select}>
      <option className={style.option} value={null}>
        --- Выберите {whatToChoose} ---
      </option>
      {list.map((item) => (
        <option
          className={style.option}
          key={item[nameValue]}
          value={item[nameValue]}
        >
          {item[nameDisplay]}
        </option>
      ))}
    </select>
  );
}
