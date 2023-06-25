let queryId = null;

export const setQueryId = (newId) => {
  queryId = newId;
  console.log(`Query ID: ${queryId}`);
};



export const getQueryId = () => {
  console.log(`Query ID: ${queryId}`);
  return queryId;
};
