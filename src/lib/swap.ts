// Tiny decoupled trigger so ANY button (Navbar, Hero, anywhere) can open the
// Buy/Swap modal without prop-drilling or context. The modal listens for this
// event; buttons just fire it.

export const OPEN_SWAP_EVENT = "bzc:open-swap";

export function openSwap() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(OPEN_SWAP_EVENT));
  }
}
