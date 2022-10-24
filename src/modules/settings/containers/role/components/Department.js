import StickyTable from "components/sticky-table";
import Field from "containers/Form/field";
import { get } from "lodash";
import React, { useEffect, useState } from "react";

const Department = ({ department, module, setValues }) => {
  const [pages, setPages] = useState([]);

  const data = React.useMemo(
    () =>
      get(department, "pages", []).map((page) => ({
        name: page,
        all: { ...page, title: "All" },
        ...page.permissions.map((p) => ({ ...p, pageId: page.id })),
      })),
    [department]
  );

  useEffect(() => {
    setPages([...data]);
  }, [data]);

  const columns = React.useMemo(() => {
    const cols = [
      {
        Header: "Column 1",
        accessor: "name",
        sticky: "left",
        className: "sticky-data",
        width: 260,
        Cell: ({ value: page, row }) =>
          page ? (
            <Field
              type={"checkbox"}
              name={`modules[${module.id}].id${module.id}.departments[${department.id}].id${department.id}.pages[${page.id}].checked`}
              label={page.title}
              defaultValue={get(page, "checked", false)}
              onChange={(v) => {
                const datas = [{ name: `pages.checkbox${page.id}`, value: v }];
                page.permissions.map((permission) => {
                  const name = `modules[${module.id}].id${module.id}.departments[${department.id}].id${department.id}.pages[${page.id}].id${page.id}.permissions[${permission.id}].id${permission.id}.checked`;
                  datas.push({ name, value: v });
                });
                setValues(datas);
              }}
            />
          ) : (
            ""
          ),
      },
      {
        Header: "Column 2",
        accessor: "all",
        sticky: "left",
        className: "sticky-data",
        width: 80,
        Cell: ({ value, row }) => {
          return (
            <Field
              type={"checkbox"}
              name={"pages.checkbox" + value.id}
              label={value.title}
              defaultValue={get(value, "permissions", []).length && value.permissions.every((permission) => permission.checked)}
              onChange={(v) => {
                const datas = [];
                value.permissions.map((permission) => {
                  const name = `modules[${module.id}].id${module.id}.departments[${department.id}].id${department.id}.pages[${value.id}].id${value.id}.permissions[${permission.id}].id${permission.id}.checked`;
                  datas.push({ name, value: v });
                });
                setValues(datas);
              }}
            />
          );
        },
      },
    ];

    const maxColsSize = Object.keys(data.sort((a, b) => Object.keys(b).length - Object.keys(a).length)[0] || {}).length;

    for (let i = 0; i < maxColsSize - 2; i++)
      cols.push({
        accessor: `${i}`,
        width: 220,
        Cell: ({ value: permission, row }) => {
          return permission ? (
            <Field
              type={"checkbox"}
              name={`modules[${module.id}].id${module.id}.departments[${department.id}].id${department.id}.pages[${permission.pageId}].id${permission.pageId}.permissions[${permission.id}].id${permission.id}.checked`}
              label={permission.title}
              disabled={pages.length && !pages[row.index]?.checked}
              defaultValue={get(permission, "checked", false)}
            />
          ) : (
            ""
          );
        },
      });

    return cols;
  }, [data]);

  const onCheckedDepartment = (v) => {
    const datas = [];
    data.map((page, index) => {
      datas.push(
        {
          name: `modules[${module.id}].id${module.id}.departments[${department.id}].id${department.id}.pages[${page.name.id}].checked`,
          value: v,
        },
        { name: `pages.checkbox${page.name.id}`, value: v }
      );
      page.name.permissions?.map((permission) => {
        const name = `modules[${module.id}].id${module.id}.departments[${department.id}].id${department.id}.pages[${page.name.id}].id${page.name.id}.permissions[${permission.id}].id${permission.id}.checked`;
        datas.push({ name, value: v });
      });
    });
    setValues(datas);
  };

  return (
    <div className={`mb-24 departmentBox box table-border`}>
      <div className="main-form-table-head">
        <Field type={"checkbox"} name={get(department, "name")} onChange={onCheckedDepartment} />
        {get(department, "title")}
      </div>
      <StickyTable className="stickyTable" data={data} columns={columns} />
    </div>
  );
};

export default Department;
