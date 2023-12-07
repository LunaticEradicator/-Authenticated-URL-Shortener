import "../../sass/components/reusable/container.scss";
interface propContainer {
  children: string[] | string | JSX.Element | JSX.Element[];
}

export default function Container({ children }: propContainer) {
  return <div className="container">{children}</div>;
}
