import { mountSeatManager } from "./webApp";
import "./style.css";

/** Obtiene sessionStorage sin interrumpir la app si el navegador lo bloquea. */
function getSessionStorage(): Storage | null {
	try {
		return window.sessionStorage;
	} catch {
		return null;
	}
}

mountSeatManager(document, getSessionStorage());