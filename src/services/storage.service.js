export const addListToStorage = (list) => {
  const listsResponse = localStorage.getItem("lists");

  if (!listsResponse) {
    const allLists = [list];
    localStorage.setItem("lists", JSON.stringify(allLists));
  } else {
    const lists = JSON.parse(listsResponse);
    lists.push(list);
    localStorage.setItem("lists", JSON.stringify(lists));
  }
};

export const editListInStorage = (list) => {
  const listsResponse = localStorage.getItem("lists");

  if (listsResponse) {
    const lists = JSON.parse(listsResponse);
    const listToEditIndex = lists.findIndex((l) => l.id === list.id);
    lists[listToEditIndex] = list;

    localStorage.setItem("lists", JSON.stringify(lists));
  } else {
    console.error("editListInStorage error", listsResponse);
  }
};

export const removeListInStorage = (id) => {
  const listsResponse = localStorage.getItem("lists");

  if (listsResponse) {
    const lists = JSON.parse(listsResponse);
    const listToEditIndex = lists.findIndex((l) => l.id === id);
    lists.splice(listToEditIndex, 1);

    localStorage.setItem("lists", JSON.stringify(lists));
  } else {
    console.error("removeListInStorage error", listsResponse);
  }
};

export const getLists = () => {
  const listsResponse = localStorage.getItem("lists");

  if (listsResponse) {
    const lists = JSON.parse(listsResponse);
    return lists;
  } else {
    return undefined;
  }
};

export const getListById = (id) => {
  const listsResponse = localStorage.getItem("lists");

  if (listsResponse) {
    const lists = JSON.parse(listsResponse);
    return lists.find((list) => list.id === id);
  } else {
    return undefined;
  }
};
