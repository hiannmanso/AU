/* eslint-disable @next/next/no-img-element */
import loader from "../../assets/loading.gif";

interface LoaderProps {
  width: number;
  height: number;
}
export default function Loader({ width, height }: LoaderProps) {
  return (
    <img
      src="https://cdn.pixabay.com/animation/2022/07/29/03/42/03-42-22-68_512.gif"
      alt="loader"
      width={width}
      height={height}
    />
  );
}
