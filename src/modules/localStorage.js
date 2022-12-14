/**
 * Is storage available in the browser?
 * @param { 'localStorage'|'sessionStorage'} type
 * @returns { boolean }
 */
export const storageAvailable = (type) => {
  let storage;
  try {
    storage = window[type];
    const x = '__storage_test__';
    storage.setItem(x, x);
    storage.removeItem(x);

    return true;
  } catch (e) {
    return (
      e instanceof DOMException &&
      // everything except Firefox
      (e.code === 22 ||
        // Firefox
        e.code === 1014 ||
        e.name === 'QuotaExceededError' ||
        e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
      storage &&
      storage.length !== 0
    );
  }
};

/**
 * Update local storage.
 */
export const updateStorage = (item, array) => {
  localStorage.removeItem(item);
  localStorage.setItem(item, JSON.stringify(array));
};
