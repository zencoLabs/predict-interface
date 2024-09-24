export const isProduction = import.meta.env.MODE === 'production';
export const isLocalDev = location.host.startsWith('localhost') || location.host.startsWith('1');

export const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
