/**
 * Generates a concatenated string of the first initials of the first and last names.
 *
 * @param {string} firstInitial - The first initial of the first name.
 * @param {string} lastInitial - The first initial of the last name.
 * @return {string} The concatenated initials.
 */
const getInitialStrings = (firstName, lastName) => {
    const firstInitial = firstName?.charAt(0).toUpperCase();
    const lastInitial = lastName?.charAt(0).toUpperCase();

    return firstInitial + lastInitial;
}

export default getInitialStrings