type searchRecord = {
  name: string;
  date?: Date;
};

const createSearchRecord = (name: string, date: Date = new Date()) => {
  const existingRecords = getSearchRecord();
  const newRecord: searchRecord = { name, date };
  const updatedRecords = [newRecord, ...existingRecords];
  localStorage.setItem("searchRecord", JSON.stringify(updatedRecords));
};

const getSearchRecord = (): searchRecord[] => {
  const searchRecord = localStorage.getItem("searchRecord");
  if (searchRecord) {
    return JSON.parse(searchRecord);
  } else {
    return [];
  }
};

const removeSearchRecord = () => {
  localStorage.removeItem("searchRecord");
};

export { createSearchRecord, getSearchRecord, removeSearchRecord };
