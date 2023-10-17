/**
 * Code from:
 * https://svelte.dev/repl/6db375be880441299f7721b54434068f?version=3.38.1
 */
let intersectionObserver: IntersectionObserver;

function ensureIntersectionObserver(element: HTMLElement) {
	if (intersectionObserver) return;

  intersectionObserver = new IntersectionObserver(
		(entries) => {
			entries.forEach(entry => {
				const eventName = entry.isIntersecting ? 
                    'viewportEnter' : 'viewportExit';
				entry.target.dispatchEvent(new CustomEvent(eventName));
			});
		}
	);
}

export default function viewport(element: HTMLElement) {
	ensureIntersectionObserver(element);

	intersectionObserver.observe(element);

	return {
		destroy() {
			intersectionObserver.unobserve(element);
		}
	}
}