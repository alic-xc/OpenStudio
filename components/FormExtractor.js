export const formExtractor = (form) => {
    const formData = new FormData(form);
    const data = {};
    for (var pair of formData.entries()) {
      data[pair[0]] = pair[1];
    }
    return data;
  };