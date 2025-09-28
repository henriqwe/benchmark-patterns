import type { ComponentType } from "react";

function withLogger<P>(Component: ComponentType<P>): ComponentType<P> {
  return function Wrapped(props: P) {
    console.log("Rendering with props:", props);
    return <Component {...props} />;
  };
}
export const LoggedButton = withLogger((props) => (
  <button {...props}>test</button>
));
