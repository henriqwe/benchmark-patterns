function withLogger(Component) {
  return function Wrapped(props) {
    console.log("Rendering with props:", props);
    return <Component {...props} />;
  };
}
export const LoggedButton = withLogger((props) => (
  <button {...props}>test</button>
));
