import { useWishlist } from "../../../hooks/useWishlist";

export function WithWishlist<
  T extends {
    wish: Set<string>;
    toggleWish: (id: string) => void;
    wishCount: number;
  }
>(Component: React.ComponentType<T>) {
  return function WithWishlist(
    props: Omit<T, "wish" | "toggleWish" | "wishCount">
  ) {
    const { set: wish, toggle, count } = useWishlist();
    return (
      // @ts-expect-error – inject props
      <Component {...props} wish={wish} toggleWish={toggle} wishCount={count} />
    );
  };
}
