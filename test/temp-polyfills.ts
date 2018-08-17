declare const global;

// To get rid of the warning
// Warning: React depends on requestAnimationFrame.
// Make sure that you load a polyfill in older browsers.
export const raf = (global.requestAnimationFrame = (cb: any) => setTimeout(cb, 0));
