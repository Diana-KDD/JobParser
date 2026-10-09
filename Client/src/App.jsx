import Form from "./components/Form/Form";
import Select from "./components/Select/Select";

const urlServer = import.meta.env.VITE_URL_SERVER;

const countriesPromise = fetch(`${urlServer}/countries`).then((r) => r.json());
const rolesPromise = fetch(`${urlServer}/roles`).then((r) => r.json());

function App() {
  return (
    <>
      <h1 className="titlePage">
        Анализ вакансий с сайта{" "}
        <a className="link" href="https://startup.jobs/">
          Startup Jobs
        </a>
      </h1>

      <Form>
        <Select
          promise={countriesPromise}
          whatToChoose="страну"
          nameValue="country_code"
          nameDisplay="name"
        />
        <Select
          promise={rolesPromise}
          nameValue="id"
          whatToChoose="роль"
          nameDisplay="title"
        />
      </Form>
    </>
  );
}

export default App;
