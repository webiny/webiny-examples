export const getUpdatedTag = () => {
    const currentYear = new Date().getFullYear();
    return `Updated ${currentYear} - `;
};