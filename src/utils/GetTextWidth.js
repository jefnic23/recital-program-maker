export const getTextWidth = (text) => {
    const container = document.createElement('canvas');

    let width = 0;
    let context = container.getContext('2d');

    context.font = window
        .getComputedStyle(document.body)
        .getPropertyValue('font');
    width = context.measureText(text).width;
    return width;
};
