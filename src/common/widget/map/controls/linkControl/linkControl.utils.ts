import type { CopyToClipboardFunction } from './linkControl.interface';

export const copyToClipboard: CopyToClipboardFunction = (message, options) => {
  navigator.clipboard
    .writeText(message)
    .then(options?.onSuccess)
    .catch(options?.onError);
};
