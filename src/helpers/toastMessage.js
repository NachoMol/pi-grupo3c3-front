import Swal from "sweetalert2";



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
