import bus from "../utils/bus";

export default function useFlashMessage() {

  function setFlashMessage(type, message) {
    bus.emit("flashMessage", { type, message })
  }

  return { setFlashMessage }

}