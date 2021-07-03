const formatQuery = (queries) => {
  const queryObj = { must: [], must_not: [], should: [] };

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
        queryObj.should.push({
          query_string: {
            default_field: element.field,
            query: element.value,
          },
        });
        break;
      case "not-contains":
        queryObj.should.push({
          bool: {
            must_not: {
              query_string: {
                default_field: element.field,
                query: element.value,
              },
            },
          },
        });
        break;
      case "startsWith":
        queryObj.must.push({
          match_phrase_prefix: { [element.field]: element.value + "*" },
        });
        break;
      case "notStartsWith":
        queryObj.must_not.push({
          match_phrase_prefix: { [element.field]: element.value + "*" },
        });
        break;
      case "endsWith":
        queryObj.must.push({
          match_phrase_prefix: { [element.field]: "*" + element.value },
        });
        break;
      case "notEndsWith":
        queryObj.must_not.push({
          match_phrase_prefix: { [element.field]: "*" + element.value },
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
      case "exists":
        queryObj.must.push({
          exists: { field: element.field },
        });
        break;
      case "notExists":
        queryObj.must_not.push({
          exists: { field: element.field },
        });
        break;

      default:
        break;
    }
  });

  return queryObj;
};

export default formatQuery;
