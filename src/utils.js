/**
 * Crée une version "débounce" d'une fonction qui retarde son exécution jusqu'à ce qu'un certain temps se soit écoulé sans qu'elle ne soit appelée.
 * @param {Function} func La fonction à "débounced".
 * @param {number} delay Le délai en millisecondes.
 * @returns {Function} La nouvelle fonction "débounced".
 */
export const debouncing = (func, delay) => {
    let timerId;
    return (...args) => {
        clearTimeout(timerId);
        timerId = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    }
}