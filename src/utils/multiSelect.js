const categoryToOptions = (category) => ({
    value: category._id,
    label: category.title
});

const filterCategories = (inputValue, categories) => {
    const filteredCategories = categories.map((categoryToOptions)).filter((category) => category.label.toLowerCase().includes(inputValue.toLowerCase()));
    return filteredCategories;
}

export { categoryToOptions, filterCategories  };
