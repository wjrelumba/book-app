import { toast } from "react-toastify";

export const showErrorToast = (message) => {
    toast.error(message, {
        position: "top-left",
        autoClose: 2500, // Time in ms before the toast automatically closes
        hideProgressBar: false, 
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored", // Options: "light", "dark", "colored"
        style: {
          backgroundColor: '#1d4ea1', // Custom background color
          color: '#fff', // Custom text color
        },
        icon: "🚨", // Custom icon
    });
}

export const showSuccessToast = (message) => {
  toast.success(message, {
      position: "top-left",
      autoClose: 2500, // Time in ms before the toast automatically closes
      hideProgressBar: false, 
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored", // Options: "light", "dark", "colored"
      style: {
        backgroundColor: '#166534', // Custom background color
        color: '#fff', // Custom text color
      },
      icon: "🚨", // Custom icon
  });
}