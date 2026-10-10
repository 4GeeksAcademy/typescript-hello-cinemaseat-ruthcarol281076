import { mountSeatManager } from "./webApp";
import "./style.css";

function getSessionStorage(): Storage | null {
	try {
		return window.sessionStorage;
	} catch {
		return null;
	}
}

mountSeatManager(document, getSessionStorage());