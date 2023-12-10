import Swal from "sweetalert2";

/**
 * A function that displays a toast message with a specified type, title, and message.
 *
 * @param {string} type - The type of toast message ('success' or 'error').
 * @param {string} titleInfo - The title of the toast message.
 * @param {string} msg - The message to be displayed in the toast.
 * @param {string} [direction='center-end'] - The direction of the toast message by default.
 */
export const toastMessage = (type, titleInfo, msg, direction = 'center-end') => {

    const Toast = Swal.mixin({
        toast: true,
        position: direction,
        iconColor: 'white',
        customClass: {
            popup: 'colored-toast',
            container: 'custom-toast-container',
        },
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
    })
    
    switch (type) {
        case 'success': {
            Toast.fire({
                icon: 'success',
                title: titleInfo,
                text: msg,
            })
        }
        break;
        case 'error': {
            Toast.fire({
                icon: 'error',
                title: titleInfo,
                text: msg,
            })
        }
        break;
        default:
            break;
    }
}
