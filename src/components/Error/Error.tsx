interface A {
  error: string;
}
export const Error = ({ error }: A) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      <hr style={{ width: "100%" }} />
      {error}
    </div>
  );
};
