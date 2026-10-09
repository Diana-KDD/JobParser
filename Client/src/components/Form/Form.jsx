import style from "./Form.module.css";
export default function Form({ children }) {
  return (
    <form className={style.form}>
      <div className={style.box_children}>{children}</div>
      <button className={style.btn}>Найти вакансии</button>
    </form>
  );
}
