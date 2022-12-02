export const getTextWidth = (text, bold=false) => {
    const container = document.createElement('canvas');

    let width = 0;
    let context = container.getContext('2d');

    context.font = `${bold ? 'bold' : ''} 10pt Georgia`;
    width = context.measureText(text).width;

    return width;
};
