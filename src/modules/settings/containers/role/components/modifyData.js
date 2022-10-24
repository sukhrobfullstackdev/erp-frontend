const modifyData = (data) => {
  let { description, name, roleType, modules } = data;

  const val = (obj, index = 0) => Object.values(obj)[index];
  const key = (obj, index = 0) =>
    Object.keys(obj)
      .find((item) => item.startsWith("id"))
      ?.slice(2);

  modules = modules
    .filter((m) => m)
    .map((m) => ({
      id: +key(m),
      departments: val(m)
        .departments.filter((d) => d)
        .map((d) => ({
          id: +key(d),
          pages: val(d)
            .pages.filter((p) => p && Object.keys(p).length > 1)
            .map((p) => {
              const obj = p["id" + key(p)];

              return {
                id: +key(p),
                permissions:
                  obj?.permissions
                    .filter((permission) => permission)
                    .map((permission) => ({
                      id: +key(permission),
                      checked: val(permission).checked,
                    })) || [],
                checked: p.checked,
              };
            }),
        })),
    }));

  // modules = modules.filter((m) => !m.departments.every((d) => d.pages.length == 0));

  data = { description, name, roleType, modules };

  return data;
};

export default modifyData;
