export default function RedirectReturn(props: any) {
  window.location = props.loc;
  return (
    <section
      onLoad={() => {
        const token = new URLSearchParams(window.location.search).get("code");
        console.log("token: ", token);
        props.setAccessToken(token);
      }}
    >
      Redirecting...
    </section>
  );
}
