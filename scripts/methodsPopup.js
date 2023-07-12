export function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.body.addEventListener("keydown", closePopupEsc);
}
export function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.body.removeEventListener("keydown", closePopupEsc);
}
export function closePopupEsc(evt) {
  if (evt.key === "Escape") {
    const popupOpen = document.querySelector(".popup_opened");
    closePopup(popupOpen);
  }
}
export function closePopupOverlay(evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.currentTarget);
  }
}
