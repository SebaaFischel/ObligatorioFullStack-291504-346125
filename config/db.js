export const db = {
    users: [],
    categories: [],
    userMovies: []
};

// ID autoincremental
let nextId = 1;

export const generateId = () => nextId++;