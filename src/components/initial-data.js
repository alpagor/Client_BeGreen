const initialData = {
    recipes: {
      "recipe-1": { id: "recipe-1", content: "teriaky veggie chicken" },
      "recipe-2": { id: "recipe-2", content: "veggie chicken" },
      "recipe-3": { id: "recipe-3", content: "chicken" },
      "recipe-4": { id: "recipe-4", content: "veggie" },
    },
  
    columns: {
      "column-1": {
        id: "column-1",
        title: "Recipes List",
        recipeIds: ["recipe-1", "recipe-2", "recipe-3", "recipe-4"],
      },
      "column-2": {
        id: "column-2",
        title: "Menu",
        recipeIds: [],
      },
    },
  
    columnOrder: ["column-1", "column-2"], //Order of the  columns
  };
  
  export default initialData;
  