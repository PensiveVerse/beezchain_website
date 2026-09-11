/**
 * Site-wide ambient background: drifting aurora blobs + fine film grain.
 * Rendered once behind everything (position:fixed, pointer-events:none) so
 * it never interferes with layout, scroll containers or interaction.
 */
export default function Background() {
  return (
    <>
      <div aria-hidden className="aurora" />
      <div aria-hidden className="grain" />
    </>
  );
}
