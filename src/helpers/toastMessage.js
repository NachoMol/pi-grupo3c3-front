import Swal from "sweetalert2";

const Toast = Swal.mixin({
    toast: true,
    position: 'center-end',
    iconColor: 'white',
    customClass: {
        popup: 'colored-toast',
        container: 'custom-toast-container',
    },
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
})

export const toastMessage = (type, titleInfo, msg) => {
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
