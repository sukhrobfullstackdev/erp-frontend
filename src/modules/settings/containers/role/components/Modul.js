import Collapse from "components/elements/collapse";
import { get } from "lodash";
import Department from "./Department";

const Modul = ({ data, setValues }) => {
  return (
    <>
      {get(data, "modules", []).map((module) => (
        <Collapse key={get(module, "id")} title={get(module, "title")} active arrowRight className="roleCollapseBox">
          {module.departments?.map((department, index) => (
            <Department department={department} module={module} key={department.id} setValues={setValues} />
          ))}
        </Collapse>
      ))}
    </>
  );
};

export default Modul;
