export const getHeight = (innerHtml) => {
    const container = document.createElement('canvas');

    let height = 0;
    let context = container.getContext('2d');

    context.font = '10pt Georgia';
    context.innerHtml = innerHtml;
    height = context.height;

    return height;
};