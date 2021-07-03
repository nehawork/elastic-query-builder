const formatQuery = (queries) => {
  const queryObj = { must: [], must_not: [] };
  // {name: 'Is Equal to', value:'eq'},
  // {name: 'Not Equal to', value: 'neq'},
  // {name: 'Contains', value: 'contains'},
  // {name: 'Not Contains', value:'not-contains'},
  // {name: 'Starts with', value: 'startsWith'},
  // {name: 'Not Starts with', value:'notStartsWith'},
  // {name: 'Less than', value: 'lt'},
  // {name: 'Less than or equal', value:'lte'},
  // {name: 'Greater than', value: 'gt'},
  // {name: 'Greater than or equal', value:'gte'},
  queries.forEach((element) => {
    switch (element.operator) {
      case "eq":
        queryObj.must.push({
          match_pharase: { [element.field]: element.value },
        });
        break;
      case "neq":
        queryObj.must_not.push({
          match_pharase: { [element.field]: element.value },
        });
        break;
      case "contains":
        queryObj.must.push({
          wildcard: { [element.field]: element.value + "*" },
        });
        break;
      case "not-contains":
        queryObj.must_not.push({
          wildcard: { [element.field]: element.value + "*" },
        });
        break;
      case "startsWith":
        queryObj.must.push({
          match_phrase_prefix: { [element.field]: element.value },
        });
        break;
      case "notStartsWith":
        queryObj.must_not.push({
          match_phrase_prefix: { [element.field]: element.value },
        });
        break;
      case "lt":
        queryObj.must.push({
          range: { [element.field]: { lt: element.value } },
        });
        break;
      case "lte":
        queryObj.must.push({
          range: { [element.field]: { lte: element.value } },
        });
        break;
      case "gt":
        queryObj.must.push({
          range: { [element.field]: { gt: element.value } },
        });
        break;
      case "gte":
        queryObj.must.push({
          range: { [element.field]: { gte: element.value } },
        });
        break;

      default:
        break;
    }
  });

  return queryObj;
};

export default formatQuery;