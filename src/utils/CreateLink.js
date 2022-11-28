export const createLink = (font) => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = `https://fonts.googleapis.com/css?family=${font.split(' ').join('+')}`;
    return link;
};
