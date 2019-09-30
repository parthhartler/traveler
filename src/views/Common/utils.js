import { toast } from "react-toastify";

function NewToastAlert(
  containerId,
  error,
  successMsg,
  redirectCallBack,
  confSetting,
  showErrorToast
) {
  let config = {
    position: "top-center",
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: false,
    draggable: false,
    autoClose: false,
    containerId: containerId
  };

  if (redirectCallBack) {
    config.onClose = () => {
      redirectCallBack();
    };
  }

  if (!error) {
    config.autoClose = 4000;
  }

  if (confSetting && confSetting.autoClose) {
    config.autoClose = confSetting.autoClose;
  }

  if (confSetting && confSetting.position) {
    config.autoClose = confSetting.position;
  }

  if (showErrorToast) {
    toast.error(successMsg, config);
  } else if (!error) {
    toast.success(successMsg, config);
  } else if (error.response === undefined) {
    toast.error("Something went wrong ", config);
  } else if (
    error.response &&
    error.response.data &&
    error.response.data.error_code
  ) {
    if (
      error.response.data.error_code === "E451" ||
      error.response.data.error_code === "E406"
    ) {
      toast.info(error.response.data.errors.message, config);
    } else if (error.response.status === 500) {
      let errorMsg = error.response.statusText
        ? error.response.statusText
        : "Something went wrong";
      toast.error(errorMsg, config);
    }
  } else if (error.response === undefined) {
    let errorMsg = error.message ? error.message : "Something went wrong";
    toast.error(errorMsg, config);
  }
}

export { NewToastAlert };
