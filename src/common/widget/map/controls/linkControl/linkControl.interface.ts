interface CopyToClipboardProps {
  onSuccess?: () => void;
  onError?: () => void;
}

export type CopyToClipboardFunction = (
  message: string,
  options?: CopyToClipboardProps,
) => void;
