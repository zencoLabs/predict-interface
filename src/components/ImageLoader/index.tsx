import { useState, type ComponentProps, useEffect } from "react";

const urlMap = new Map<string, boolean>();

export const preload = (src: string) => {
  return new Promise((resolve, reject) => {
    if (urlMap.has(src)) {
      return resolve(true);
    }
    const img = new Image();
    img.src = src;
    img.onload = () => {
      urlMap.set(src, true);
      resolve(true);
    };
    img.onerror = reject;
  });
};

interface ImageLoaderProps extends ComponentProps<"img"> {
  LoadingElement?: React.ReactNode;
  ErrorElement?: React.ReactNode;
}

const ImageLoader: React.FC<ImageLoaderProps> = ({
  src,
  className,
  LoadingElement,
  ErrorElement,
  ...props
}) => {
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!src) {
      setLoading(false);
      setSuccess(false);
      return;
    }
    setLoading(true);
    preload(src)
      .then(
        () => setSuccess(true),
        () => setSuccess(false)
      )
      .finally(() => setLoading(false));
  }, [src]);
  if (loading) {
    return LoadingElement;
  }
  if (!success) {
    return ErrorElement || LoadingElement;
  }
  return <img src={src} className={className} {...props} />;
};

export default ImageLoader;
