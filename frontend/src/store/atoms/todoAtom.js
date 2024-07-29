import { atom, selector } from "recoil";

export const todoListAtomGlobal = atom({
    key: "todoListAtomGlobal",
    default: [],
});

export const todoSubmittedAtom = atom({
    key: "todoSubmittedAtom",
    default: false,
});

export const todoFilterAtom = atom({
    key: "todoFilterAtom",
    default: {
        status: false,
        priority: "",
    },
});

export const userTitleAtom = atom({
    key: "userTitleAtom",
    default: "",
});

export const todoSortAtom = atom({
    key: "todoSortAtom",
    default: {
        ascending: false,
        descending: true,
    },
});

export const showCompletedAtom = selector({
    key: "showCompltedAtom",
    get: ({ get }) => {
        const status = get(todoFilterAtom).status;
        return status;
    },
});

const filterFucntion = (list) => {
    const priority = get(todoFilterAtom).priority;

    const filteredList = list.filter((todo) => todo.priority === priority);

    return filteredList;
};

export const filteredCompletedTodosSelector = selector({
    key: "filteredCompletedTodosSelector",
    get: ({ get }) => {
        const list = get(completedTodosListAtom);
        return filterFucntion(list);
    },
});

export const filteredIncompleteTodosSelector = selector({
    key: "filteredIncompleteTodosSelector",
    get: ({ get }) => {
        const list = get(incompleteTodosListAtom);
        return filterFucntion(list);
    },
});

//rather i can have a list derived from the todoGlobal. todoGlobal changes when i mark something for

export const TodoListMain = atom({
    key: "TodoListMain",
    default: selector({
        key: "filterList",
        get: ({ get }) => {
            const f = get(todoFilterAtom);
            const list = get(todoListAtomGlobal);
            const s = get(todoSortAtom);
            const sortDescending = s.descending;
            const filteredList = list.filter((todo) => {
                if (!f.priority && todo.completed === f.status) {
                    return true;
                }
                if (
                    f.priority &&
                    todo.priority === f.priority &&
                    todo.completed === f.status
                ) {
                    return true;
                }
                return false;
            });

            const sortedFilteredList = filteredList.sort((a, b) => {
                const dateCreatedA = new Date(a.dateCreated);
                const dateCreatedB = new Date(b.dateCreated);

                if (sortDescending) {
                    return dateCreatedB - dateCreatedA;
                } else return dateCreatedA - dateCreatedB;
            });
            return sortedFilteredList;
        },
    }),
});
