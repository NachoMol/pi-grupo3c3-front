/**
 * Dispatches an action to the context.
 * 
 * @param {function} dispacth - The dispatch function provided by the context.
 * @param {string} type - The type of the action to be dispatched.
 * @param {any} data - The payload data to be associated with the action.
 * @returns {void}
 */
export const dispacthAction = (dispacth, type, data) => {
    dispacth({
        type: type,
        payload: data
    });
};
